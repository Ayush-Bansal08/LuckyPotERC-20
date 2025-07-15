//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {AggregatorV3Interface} from
    "../../lib/chainlink-brownie-contracts/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

library OracleLib {
    error StalePrice();

    uint256 private constant timeout = 3 * 60 * 60; // 3 hours in seconds

    function StalePriceCheck(AggregatorV3Interface pricefeed)
        internal
        view
        returns (int80, uint256, uint256, uint256, uint80)
    {
        (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound) =
            pricefeed.latestRoundData();

        uint256 secondSince = block.timestamp - updatedAt;
        if (secondSince > timeout) {
            revert StalePrice();
        }

        return (int80(roundId), uint256(answer), startedAt, updatedAt, answeredInRound);
    }
}
