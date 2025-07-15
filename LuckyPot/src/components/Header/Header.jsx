import {React} from "react"
import { Link, NavLink } from "react-router-dom";
import {ethers} from "ethers";


function Header() {
const walletAddress = "0xab9e1101C771518a310dCB210A4e36feE24D122b";

 const walletABI = [{"type":"constructor","inputs":[{"name":"pricefeed","type":"address","internalType":"address"},{"name":"vrfcoordinator","type":"address","internalType":"address"},{"name":"gaslane","type":"bytes32","internalType":"bytes32"},{"name":"subsID","type":"uint256","internalType":"uint256"},{"name":"gaslimit","type":"uint32","internalType":"uint32"}],"stateMutability":"nonpayable"},{"type":"function","name":"AddressToName","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"IsParticipant","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"NameToAddress","inputs":[{"name":"","type":"string","internalType":"string"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"Participants","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"acceptOwnership","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"buyEntryTicket","inputs":[{"name":"name","type":"string","internalType":"string"}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"checkUpkeep","inputs":[{"name":"","type":"bytes","internalType":"bytes"}],"outputs":[{"name":"UpKeepNeeded","type":"bool","internalType":"bool"},{"name":"","type":"bytes","internalType":"bytes"}],"stateMutability":"view"},{"type":"function","name":"entryticket","inputs":[],"outputs":[{"name":"","type":"address","internalType":"contract EntryTicket"}],"stateMutability":"view"},{"type":"function","name":"getContractBalance","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getETHUSDPrice","inputs":[{"name":"ETHAmount","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getEntryTicketPriceInETH","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getInterval","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"pure"},{"type":"function","name":"getLastTimeStamp","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getLotteryState","inputs":[],"outputs":[{"name":"","type":"uint8","internalType":"enum LuckyPotERC20.LotteryState"}],"stateMutability":"view"},{"type":"function","name":"getParticipantsLength","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getUSDETHPrice","inputs":[{"name":"USDAmount","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getWinner","inputs":[],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"i_callbackGasLimit","inputs":[],"outputs":[{"name":"","type":"uint32","internalType":"uint32"}],"stateMutability":"view"},{"type":"function","name":"owner","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"performUpkeep","inputs":[{"name":"","type":"bytes","internalType":"bytes"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"rawFulfillRandomWords","inputs":[{"name":"requestId","type":"uint256","internalType":"uint256"},{"name":"randomWords","type":"uint256[]","internalType":"uint256[]"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"s_LastTimeStamp","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"s_lotterystate","inputs":[],"outputs":[{"name":"","type":"uint8","internalType":"enum LuckyPotERC20.LotteryState"}],"stateMutability":"view"},{"type":"function","name":"s_pricefeed","inputs":[],"outputs":[{"name":"","type":"address","internalType":"contract AggregatorV3Interface"}],"stateMutability":"view"},{"type":"function","name":"s_vrfCoordinator","inputs":[],"outputs":[{"name":"","type":"address","internalType":"contract IVRFCoordinatorV2Plus"}],"stateMutability":"view"},{"type":"function","name":"setCoordinator","inputs":[{"name":"_vrfCoordinator","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"transferOwnership","inputs":[{"name":"to","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"winnerName","inputs":[],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"event","name":"CoordinatorSet","inputs":[{"name":"vrfCoordinator","type":"address","indexed":false,"internalType":"address"}],"anonymous":false},{"type":"event","name":"Debug","inputs":[{"name":"message","type":"string","indexed":false,"internalType":"string"}],"anonymous":false},{"type":"event","name":"LotteryWinner","inputs":[{"name":"winner","type":"string","indexed":false,"internalType":"string"},{"name":"amountWon","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"OwnershipTransferRequested","inputs":[{"name":"from","type":"address","indexed":true,"internalType":"address"},{"name":"to","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"name":"from","type":"address","indexed":true,"internalType":"address"},{"name":"to","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"RequestIdGenerated","inputs":[{"name":"requestId","type":"uint256","indexed":true,"internalType":"uint256"}],"anonymous":false},{"type":"error","name":"AnotherLotteryInProgress","inputs":[]},{"type":"error","name":"OnlyCoordinatorCanFulfill","inputs":[{"name":"have","type":"address","internalType":"address"},{"name":"want","type":"address","internalType":"address"}]},{"type":"error","name":"OnlyOwnerOrCoordinator","inputs":[{"name":"have","type":"address","internalType":"address"},{"name":"owner","type":"address","internalType":"address"},{"name":"coordinator","type":"address","internalType":"address"}]},{"type":"error","name":"PayTheExactAmount","inputs":[]},{"type":"error","name":"RepeatedParticipant","inputs":[]},{"type":"error","name":"RequestDenied","inputs":[{"name":"balance","type":"uint256","internalType":"uint256"}]},{"type":"error","name":"RewardTransferFailed","inputs":[{"name":"balanceContract","type":"uint256","internalType":"uint256"}]},{"type":"error","name":"StalePrice","inputs":[]},{"type":"error","name":"UpkeepNeededFalse","inputs":[]},{"type":"error","name":"ZeroAddress","inputs":[]}] // A function to connect our metamask wallet to the contract
const ConnectWallet = async()=>{
    if(!window.ethereum){
        alert("Please install MetaMask to proceed further");
        return; // Exit the function if MetaMask is not installed
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    
    await provider.send("eth_requestAccounts",[]);
}



    return(
    <>
      <div className="bg-black h-20 flex items-center justify-between px-6 py-4">
              
        <ul className="flex space-x-6">
          <li>
            <NavLink to="/" className="text-white text-lg hover:text-red-800 underline">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/BuyTicket"
              className="text-white text-lg hover:text-red-800 underline"
            >
              Buy Ticket
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Winner"
              className="text-white text-lg hover:text-red-800 underline"
            >
              Winner
            </NavLink>
          </li>
          
          
          <li>
            <button
              onClick={ConnectWallet}
              className="text-black bg-red-700 font-bold ml-170  rounded-full p-1 animate-pulse text-lg hover:text-white "
            >
              Connect Wallet
           </button>
          </li>
        </ul>
      </div>
    </>
    )
  
}




export default Header;