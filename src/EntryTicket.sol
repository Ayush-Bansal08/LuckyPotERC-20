//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {ERC20} from "../lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";

contract EntryTicket is ERC20, Ownable(msg.sender) {
    constructor() ERC20("Entry Ticket", "ET") {}

    function mintToken(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function burnToken(address from, uint256 amount) external onlyOwner {
        _burn(from, amount);
    }
    // so here our token is ready to be used as an entry ticket for the lottery
}
