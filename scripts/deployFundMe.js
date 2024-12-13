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
}
// 执行部署脚本
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });