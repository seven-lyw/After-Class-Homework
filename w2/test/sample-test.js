const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Score", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Score");
    const score = await Score.deploy("Hello, world!");
    await score.deployed();

    expect(await score.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
