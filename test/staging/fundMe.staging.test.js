const { ethers, deployments, getNamedAccounts, network } = require("hardhat")
const { assert, expect } = require("chai")
const helpers = require("@nomicfoundation/hardhat-network-helpers")

describe("test fundme contract", async function () {
    let fundMe
    let firstAccount
    beforeEach(async function() {
        await deployments.fixture(["all"])
        firstAccount = (await getNamedAccounts()).firstAccount
        const fundMeDeployment = await deployments.get("FundMe")
        fundMe = await ethers.getContractAt("FundMe", fundMeDeployment.address)
    })
    
})

// ethers.parseEther 转换成wei为单位的值
// expect 预期关键字--（如预期失败 写法 .to.be.revertedWith("window is closed")