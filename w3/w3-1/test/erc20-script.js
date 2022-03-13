const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ERC20Token", function () {
  it("ERC20Token", async function () {
    const ERC20Token = await ethers.getContractFactory("ERC20Token");
    const erc20 = await ERC20Token.deploy();
    await erc20.deployed();

    //起始量为0
    expect(await erc20.totalSupply()).to.equal(0);

    //动态增发
    const increasTx = await erc20.increaseBalance(1000);
    await increasTx.wait();

    expect(await erc20.totalSupply()).to.equal(1000);

  });
});
