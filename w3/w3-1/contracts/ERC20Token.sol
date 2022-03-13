
   
//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";


contract ERC20Token is ERC20 {

    address public owner;

    constructor() ERC20("BiTiCi", "BTC") {
        owner = msg.sender;
    }

    function  increaseBalance(uint256 increaseAmount) external{
        require(owner==msg.sender,"msg sender!");
        _mint(owner,increaseAmount);
    }

}