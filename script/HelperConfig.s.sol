//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

//   address entryticketAddress,
//         address pricefeed,
//         address vrfcoordinator,
//         bytes32 gaslane,
//         uint256 subsID,
//         uint32 gaslimit,

import {EntryTicket} from "../src/EntryTicket.sol";
import {Script} from "forge-std/Script.sol";

contract HelperConfig is Script {
    struct NetworkConfig {
        address pricefeed;
        address vrfcoordinator;
        bytes32 gaslane;
        uint256 subsID;
        uint32 gaslimit;
        address link;
    }

    NetworkConfig public activeNetworkConfig;

    function getSepoliaConfig() public pure returns (NetworkConfig memory) {
        NetworkConfig memory sepolia = NetworkConfig({
            pricefeed: 0x694AA1769357215DE4FAC081bf1f309aDC325306,
            vrfcoordinator: 0x9DdfaCa8183c41ad55329BdeeD9F6A8d53168B1B,
            gaslane: 0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae,
            subsID: 42812130556749764451086777975008904308447926834473351062411167083716403120909,
            gaslimit: 500000,
            link: 0x779877A7B0D9E8603169DdbD7836e478b4624789
        });
        return sepolia;
    }

    function getETHMainnetConfig() public pure returns (NetworkConfig memory) {
        NetworkConfig memory ethMainnet = NetworkConfig({
            pricefeed: 0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419,
            vrfcoordinator: 0xD7f86b4b8Cae7D942340FF628F82735b7a20893a,
            gaslane: 0x8077df514608a09f83e4e8d300645594e5d7234665448ba83f51a50f842bd3d9,
            subsID: 0,
            gaslimit: 500000,
            link: 0x514910771AF9Ca656af840dff83E8264EcF986CA
        });
        return ethMainnet;
    }

    // function transferTokenOwnership(address ownership) public {
    //     entryticket.transferOwnership(ownership);
    // }

    constructor() {
        if (block.chainid == 11155111) {
            // Sepolia
            activeNetworkConfig = getSepoliaConfig();
        } else if (block.chainid == 1) {
            // Ethereum Mainnet
            activeNetworkConfig = getETHMainnetConfig();
        } else {
            revert("Network not supported, Must use ETH Sepolia");
        }
    }
}
