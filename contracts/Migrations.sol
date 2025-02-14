// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Migrations {
    address public owner;
    uint256 public lastCompletedMigration;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "This function is restricted to the contract's owner");
        _;
    }

    function setCompleted(uint256 _completed) public onlyOwner {
        lastCompletedMigration = _completed;
    }
}