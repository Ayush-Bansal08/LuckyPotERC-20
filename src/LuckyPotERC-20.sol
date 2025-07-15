//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {EntryTicket} from "./EntryTicket.sol";
import {AggregatorV3Interface} from
    "../lib/chainlink-brownie-contracts/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";
import {VRFV2PlusClient} from
    "../lib/chainlink-brownie-contracts/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";
import {VRFConsumerBaseV2Plus} from
    "../lib/chainlink-brownie-contracts/contracts/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
import {OracleLib} from "./libraries/OracleLib.sol";
import {AutomationCompatibleInterface} from
    "../lib/chainlink-brownie-contracts/contracts/src/v0.8/automation/interfaces/AutomationCompatibleInterface.sol";

contract LuckyPotERC20 is VRFConsumerBaseV2Plus, AutomationCompatibleInterface {
    EntryTicket public entryticket;
    AggregatorV3Interface public s_pricefeed;
    uint256 constant ENTRY_TICKET_PRICE = 50 * 1e18; // dollar price
    address[] public Participants;
    uint256 public s_LastTimeStamp;
    bytes32 private immutable i_Gaslane;
    uint256 private immutable i_SubscriptionID;
    uint16 private constant REQUEST_CONFIRMATION = 3; // number of confirmations before the request is fulfilled
    uint32 public immutable i_callbackGasLimit;

    uint32 private constant NUM_WORDS = 1; // number of random words we want
    uint256 private immutable i_Interval = 10800; // 3 hours, so the lottery will be drawn every 3 hours

    //////////
    //enums///
    //////////

    enum LotteryState {
        CLOSE, // 0
        OPEN, // 1
        CALCULATING // 2
    }

    LotteryState public s_lotterystate;

    ///////////////
    //constructor//
    ///////////////

    constructor(address pricefeed, address vrfcoordinator, bytes32 gaslane, uint256 subsID, uint32 gaslimit)
        VRFConsumerBaseV2Plus(vrfcoordinator)
    {
        entryticket = new EntryTicket(); // deploying the entry ticket contract..now the owner of the contract is entryticket
        s_pricefeed = AggregatorV3Interface(pricefeed);
        s_LastTimeStamp = block.timestamp; // to keep track of the last time the lottery was drawn
        s_lotterystate = LotteryState.OPEN; // initially the lottery state is open
        i_Gaslane = gaslane; // gas lane is the key to the VRFCoordinatorV2
        i_SubscriptionID = subsID; // subscription ID is the ID of the subscription we created in the VRFCoordinatorV2
        i_callbackGasLimit = gaslimit; // callback gas limit is the gas limit for the callback function that will be called when the random number is generated
    }

    /////////////
    //oracleLib//
    /////////////
    using OracleLib for AggregatorV3Interface;

    //////////////
    //Pricefeed//
    /////////////
    function getETHUSDPrice(uint256 ETHAmount) public view returns (uint256) {
        (, uint256 price,,,) = s_pricefeed.StalePriceCheck();
        uint256 priceInUSD = (uint256(price) * ETHAmount) / 1e8; // price is in 8 decimals, so we need to adjust it
        return priceInUSD;
    }

    function getUSDETHPrice(uint256 USDAmount) public view returns (uint256) {
        (, uint256 price,,,) = s_pricefeed.StalePriceCheck();
        uint256 priceInETH = (USDAmount * 1e26) / uint256(price);
        return priceInETH;
    }

    //////////
    //errors//
    //////////
    error RepeatedParticipant();
    error PayTheExactAmount();
    error RequestDenied(uint256 balance);
    error AnotherLotteryInProgress();
    error RewardTransferFailed(uint256 balanceContract);
    error UpkeepNeededFalse();

    ////////////
    //events///
    ////////////
    event RequestIdGenerated(uint256 indexed requestId);
    event LotteryWinner(string winner,uint256 amountWon);
    event Debug(string message);

    ////////////
    //mappings//
    ////////////
    mapping(string => address) public NameToAddress;
    mapping(address => string) public AddressToName;
    mapping(address => bool) public IsParticipant;

    // #1 function for buying the entry ticket and get the ERC-20 token and the entry amount is 50 dollar
    function buyEntryTicket(string memory name) public payable {
        if (NameToAddress[name] != address(0)) {
            revert RepeatedParticipant();
        }

        if (getETHUSDPrice(msg.value) < ENTRY_TICKET_PRICE) {
            // i dont have people paying more for their lottery but i have set the consitionb for them theat this is the amount they have to spend to buuy themselves a lottery ticket
            revert PayTheExactAmount();
        }
        if (s_lotterystate == LotteryState.CLOSE) {
            revert AnotherLotteryInProgress();
        }
        if (IsParticipant[msg.sender]) {
            revert RepeatedParticipant();
        }
        if(bytes(name).length == 0) {
            revert RequestDenied(address(this).balance);
        }
        NameToAddress[name] = msg.sender; // added to our records
        entryticket.mintToken(msg.sender, 1e18); // mint itself makes sure that the token is sent to the
        IsParticipant[msg.sender] = true;
        Participants.push(msg.sender);
        AddressToName[msg.sender] = name;
    }

    // #2 function to draw the lottery winner

    // function checkUpkeepNeeded means check whether we want to get the new number or not
    function checkUpkeep(bytes memory /*checkdata*/ )
        public
        view
        override
        returns (bool UpKeepNeeded, bytes memory /* check data*/ )
    {
        bool isOpen = s_lotterystate == LotteryState.OPEN;
        bool EnoughTimePassed = block.timestamp - s_LastTimeStamp >= i_Interval;
        bool HasEnoughParticipants = Participants.length > 0; // minimum 1 participant is necessary and if there is only 1 participant then he will get back his money that he gave to us
        bool HasBalance = address(this).balance > 0; // the contract should have some balance to pay the winner
        UpKeepNeeded = isOpen && EnoughTimePassed && HasEnoughParticipants && HasBalance;
       
        return (UpKeepNeeded, "0x0");
    }

  

    // Now if the checkUpKeep says that everything is fine then lets ask out vrfcoordinator to generate a request
    function performUpkeep(bytes memory /*checkdata*/ ) external override {
        emit Debug("performupkeep ran");
        (bool UpKeepneeded,) = checkUpkeep(""); // putting bytes checkdata blank
        emit Debug("upkeepneeded checked");
        if (!UpKeepneeded) {
            bool enoughTimePassed = block.timestamp - s_LastTimeStamp >= i_Interval;

            if (enoughTimePassed) {
                s_LastTimeStamp = block.timestamp;
                emit Debug("Enough time passed, updating last timestamp");
                return; // update the last timestamp if enough time has passed
            }
            revert UpkeepNeededFalse(); // if the upkeep is not needed then we return so the s_timestamp also updates
        }
        emit Debug("performupkeep ran and upkeep is needed");
        s_lotterystate = LotteryState.CLOSE; // so now we are closing the lottery and entry denied
         emit Debug("Lottery is closed now");
        // then we requst for the request id to our chainlink vrfcoordinator which is our provider which takes up our request to generate a random number
        uint256 requestId = s_vrfCoordinator.requestRandomWords(
            VRFV2PlusClient.RandomWordsRequest(
                i_Gaslane, // gas lane is the key to the VRFCoordinatorV2
                i_SubscriptionID, // subscription ID is the ID of the subscription we created in the VRFCoordinatorV2
                REQUEST_CONFIRMATION, // number of confirmations before the request is fulfilled
                i_callbackGasLimit, // callback gas limit is the gas limit for the callback function that will be called when the random number is generated
                NUM_WORDS, // number of random words we want
                VRFV2PlusClient._argsToBytes(VRFV2PlusClient.ExtraArgsV1({nativePayment: false})) // extra args for the request
            )
        );
        emit Debug("Request sent to VRFCoordinator");
        emit RequestIdGenerated(requestId);
        emit Debug("Request ID generated");
    }

    address payable winnerAddress; // this will be the address of the winner
    // this function is internal so it gets called itself by the chainlink nodes
    string public winnerName; // this will be the name of the winner
    function fulfillRandomWords(uint256, uint256[] calldata randomWords) internal override {
        uint256 randomNumberGenerated = randomWords[0]; // as we requestd only one random number to be returned
        uint256 winnerIndex = randomNumberGenerated % Participants.length; // got the winner index
        s_lotterystate = LotteryState.CLOSE;
        winnerAddress = payable(Participants[winnerIndex]); // got the address of winner
        winnerName = AddressToName[winnerAddress]; // got the name of the winner
        s_LastTimeStamp = block.timestamp; // so the next lottery would only be beggineing in next 10 hours

        emit LotteryWinner(AddressToName[winnerAddress], address(this).balance);
        (bool success,) = winnerAddress.call{value: address(this).balance}("");
        if (!success) {
            revert RewardTransferFailed(address(this).balance);
        }
        // burn the token of everyone who participated in the lottery
        for (uint256 i = 0; i < Participants.length; i++) {
            entryticket.burnToken(Participants[i], 1e18); // burning the token
        }

        // reset everything after this
      for (uint256 i = 0; i < Participants.length; i++) {
    address participant = Participants[i];
    NameToAddress[AddressToName[participant]] = address(0);
    AddressToName[participant] = "";
    IsParticipant[participant] = false;
    }

        delete Participants; // so we are deleting the participants array so it wont count in  length of the participants array
        s_lotterystate = LotteryState.OPEN;
    }

    function getParticipantsLength() public view returns (uint256) {
        return Participants.length;
    }

    function getLotteryState() public view returns (LotteryState) {
        return s_lotterystate;
    }

    function getInterval() public pure returns (uint256) {
        return i_Interval;
    }

    function getWinner() public view returns (string memory) {
        return winnerName; // so we are returning the name of the winner
    }
    function getContractBalance() public view returns(uint256){
        return address(this).balance;
    }
    
    function getEntryTicketPriceInETH() public view returns(uint256){
         return getUSDETHPrice(ENTRY_TICKET_PRICE);// htis would return the price of 50 ollars in ETH
    }
    function getLastTimeStamp() public view returns(uint256){
        return s_LastTimeStamp; // so we are returning the last time stamp of the lottery
    }
 



}