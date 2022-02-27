// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract Counter{

    uint public counter;

    constructor(){
        counter = 0;
        console.log("constructor counter is:", counter);
    }

    function count() public{
        counter += 1;
        console.log("count() counter is:", counter);
    }

}