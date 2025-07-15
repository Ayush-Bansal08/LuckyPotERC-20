//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Script} from "forge-std/Script.sol";
import {HelperConfig} from "./HelperConfig.s.sol";
import {LuckyPotERC20} from "../src/LuckyPotERC-20.sol";
import {EntryTicket} from "../src/EntryTicket.sol";

contract DeployLuckyPot is Script {
    HelperConfig public helperConfig;
    LuckyPotERC20 public luckyPot;

    function run() public returns (LuckyPotERC20, EntryTicket) {
        helperConfig = new HelperConfig();
        (address pricefeed, address vrfcoordinator, bytes32 gaslane, uint256 subsID, uint32 gaslimit, address link) =
            helperConfig.activeNetworkConfig();
        vm.startBroadcast();
        luckyPot = new LuckyPotERC20(pricefeed, vrfcoordinator, gaslane, subsID, gaslimit);

        vm.stopBroadcast();

        return (luckyPot, luckyPot.entryticket());
    }
}
