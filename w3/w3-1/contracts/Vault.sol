
   
//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";


contract Vault{

    mapping(address=>uint) public balanceOf;

    uint public totalSupply;
    
    address public immutable token;

    constructor(address _token) {
        token = _token;
    }

    function deposite(uint amount) external{
        require(IERC20(token).transferFrom(msg.sender,address(this),amount),"Transferfrom fail!");
        balanceOf[msg.sender]+=amount;
        totalSupply+=amount;
    }

    function withdraw()external{
        uint amount = balanceOf[msg.sender];
        require(IERC20(token).transferFrom(address(this),msg.sender,amount),"Transferfrom fail!");
        balanceOf[msg.sender]-=amount;
        totalSupply-=amount;
    }

}