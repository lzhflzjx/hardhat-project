const { ethers, deployments, getNamedAccounts, network } = require("hardhat")
const { assert, expect } = require("chai")

describe("test fundme contract", async function () {
    it('测试owner', async function () {
        const { firstAccount } = await ethers.getSigners()
        const fundMeFactory = await ethers.getContractFactory('FundMe')

        const fundMe = await fundMeFactory.deploy(180)
        await fundMe.waitForDeployment()

        assert.equal((await fundMe.owner()), firstAccount.address)

    })
})