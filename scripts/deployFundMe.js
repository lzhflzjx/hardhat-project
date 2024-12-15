// import ethers.js
// create main function
// execute main function

const { ethers } = require("hardhat")

async function main() {
    console.log('23333', 23333)
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