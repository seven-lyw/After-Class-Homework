// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.9;

contract Counter{

    uint public counter;

    constructor(){
        counter = 0;
    }

    function count() public{
        counter += 1;
    }

}