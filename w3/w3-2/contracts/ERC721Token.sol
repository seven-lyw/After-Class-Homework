//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract ERC721Token is ERC721 {
    
    string public baseURI;

    uint256 public cost = 0.01 ether;

    uint256 public maxSupply = 500;
    
    uint256 public maxMintAmount = 3;

    constructor(string memory name_, string memory symbol_,string baseUri_) ERC721(name_, symbol_)  {
        setBaseURI(baseUri_);
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function mint(address _to, uint256 _mintAmount) public payable {
        uint256 supply = totalSupply();
        require(_mintAmount > 0);
        require(_mintAmount <= maxMintAmount);
        require(supply + _mintAmount <= maxSupply);
         _safeMint(_to, _mintAmount);
    }

   function setCost(uint256 _newCost) public onlyOwner {
        cost = _newCost;
    }

}
