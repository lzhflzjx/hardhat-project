const { task } = require("hardhat/config")

/**
 * 部署和验证fundMe合约
 */
task("deploy-fundme", "deploy and verify fundme conract").setAction(async(taskArgs, hre) => {
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
} )

async function verifyFundMe(fundMeAddr, args) {
    await hre.run("verify:verify", {
        address: fundMeAddr,
        constructorArguments: args,
      });
}

module.exports = {}