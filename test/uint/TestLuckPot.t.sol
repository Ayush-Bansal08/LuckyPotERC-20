//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {EntryTicket} from "../../src/EntryTicket.sol";
import {LuckyPotERC20} from "../../src/LuckyPotERC-20.sol";
import {HelperConfig} from "../../script/HelperConfig.s.sol";
import {Test} from "forge-std/Test.sol";
import {console} from "forge-std/console.sol";
import {DeployLuckyPot} from "../../script/DeployLuckyPot.s.sol";

contract TestLuckyPot is Test {
    DeployLuckyPot public deployLuckyPot;
    LuckyPotERC20 public luckyPot;
    EntryTicket public entryTicket;

    function setUp() external {
        deployLuckyPot = new DeployLuckyPot();
        (luckyPot, entryTicket) = deployLuckyPot.run(); // so now i have both of them deployed
    }

    function testPriceConversionHappening() public view {
        uint256 amountToBeConverted = 1 ether;
        uint256 priceInUSD = luckyPot.getETHUSDPrice(amountToBeConverted);
        console.log(priceInUSD);
        assert(priceInUSD > 0);
    }

    function testEntryPossibleAndTokenIsTranferredToParticipant() public {
        address USER = makeAddr("USER");
        vm.deal(USER, 10 ether);
        vm.prank(USER);
        luckyPot.buyEntryTicket{value: 1 ether}("Raj"); // so raj entered the lottery
        assert(entryTicket.balanceOf(USER) == 1e18); // so raj has 1 entry ticket which is equal to 1 token
        assert(luckyPot.NameToAddress("Raj") == USER); // so raj is in the lottery
        assert(luckyPot.Participants(0) == USER);
        console.log(luckyPot.getETHUSDPrice(1 ether)); // so we are checking the price of 1 ether in USD
        console.log(luckyPot.getUSDETHPrice(50));
    }

    function testWinnerIsPicked() public {
        address USER1 = makeAddr("USER1");
        vm.deal(USER1, 10 ether);
        vm.prank(USER1);
        luckyPot.buyEntryTicket{value: 1 ether}("Raj");

        address USER2 = makeAddr("USER2");
        vm.deal(USER2, 10 ether);
        vm.prank(USER2);
        luckyPot.buyEntryTicket{value: 1 ether}("Ayush");

        address USER3 = makeAddr("USER3");
        vm.deal(USER3, 10 ether);
        vm.prank(USER3);
        luckyPot.buyEntryTicket{value: 1 ether}("Ankit");
        console.log(luckyPot.getParticipantsLength());

        assert(luckyPot.getParticipantsLength() == 3); // so there are 3 participants in the lottery
        vm.warp(block.timestamp + luckyPot.getInterval()); // so we are moving the time forward by 10 hours
        vm.roll(block.number + 1); // so we are moving the block number forward by
        (bool upkeepneeded,) = luckyPot.checkUpkeep(""); // so we are checking if upkeep is needed
        assert(upkeepneeded == true); // so upkeep is needed
        console.log(uint256(luckyPot.getLotteryState()));
        luckyPot.performUpkeep("");
        console.log(uint256(luckyPot.getLotteryState()));
    }

    function testTicketrevertsWWhenNotEnoughETH() public {
        address USER = makeAddr("USER");
        vm.deal(USER, 10 ether);
        vm.prank(USER);
        console.log(luckyPot.getETHUSDPrice(0.02 ether)); // so we are checking the price of 0.02 ether in USD
        luckyPot.buyEntryTicket{value: 0.02 ether}("Raj"); // so raj entered the lottery with less than 1 ether
        console.log(entryTicket.owner());
        console.log(address(luckyPot));
    }
}
