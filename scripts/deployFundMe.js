// import ethers.js
// create main function
// execute main function

const { ethers } = require("hardhat")

async function main() {
    // create factory
    const fundMeFactory = await ethers.getContractFactory("FundMe");
    console.log('contract deploying')
    // deploy contract from factory
    const fundMe = await fundMeFactory.deploy(1000);

    await fundMe.waitForDeployment();//这个证明合约部署完成

    console.log("fundMe deployed to:", fundMe.target);

    // verify fundme
    if (hre.network.config.chainId == 11155111 && process.env.ETHERSCAN_API_KEY) {
        console.log('wait for 5 confirmations')
        await fundMe.deploymentTransaction().wait(5)
        await verifyFundMe(fundMe.target, [1000])//验证合约
    } else {
        console.log("verification skipped..")
    }

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
}

async function verifyFundMe(fundMeAddr, args) {
    // hre hardhat运行时环境
    await hre.run("verify:verify", {
        address: fundMeAddr,
        constructorArguments: args,
    });
}

// 执行部署脚本
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });