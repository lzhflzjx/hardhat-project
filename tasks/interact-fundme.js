const { task } = require("hardhat/config")
/**
 * addr 合约地址
 * fundme contract address 对addr的描述
 * 与fundMe合约交互
 */
task("interact-fundme", "interact with fundme contract")
    .addParam("addr", "fundme contract address")
    .setAction(async (taskArgs, hre) => {
        const fundMeFactory = await ethers.getContractFactory("FundMe");
        const fundMe = fundMeFactory.attach(taskArgs.addr)
        // init 2 accounts
        const [firstAccount, secondAccount] = await ethers.getSigners()
        // fund contract with first account
        const fundTx = await fundMe.fund({ value: ethers.parseEther("0.1") })//转0.5个ETH
        await fundTx.wait()

        console.log(`2 accounts address are ${firstAccount.address} and ${secondAccount.address}`)

        // check balance of contract
        const balanceOfContract = await ethers.provider.getBalance(fundMe.target)//合约的余额
        console.log(`Balance of the contract is ${balanceOfContract}`)

        // fund contract with second account
        const fundTxWithSecondAccount = await fundMe.connect(secondAccount).fund({ value: ethers.parseEther("0.2") })    // fundMe.connect(secondAccount)不写的话默认数组第一个
        await fundTxWithSecondAccount.wait()

        // check balance of contract
        const balanceOfContractAfterSecondFund = await ethers.provider.getBalance(fundMe.target)
        console.log(`Balance of the contract is ${balanceOfContractAfterSecondFund}`)

        // check mapping 
        const firstAccountbalanceInFundMe = await fundMe.funderToAmount(firstAccount.address)
        const secondAccountbalanceInFundMe = await fundMe.funderToAmount(secondAccount.address)
        console.log(`Balance of 1 account ${firstAccount.address} amount is ${firstAccountbalanceInFundMe}`)
        console.log(`Balance of 2 account ${secondAccount.address} amount is ${secondAccountbalanceInFundMe}`)
    })

module.exports = {}