const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Greeter.deploy("Hello, Counter!");
    await counter.deployed();

    expect(await counter.count()).to.equal(1);

  });
});
