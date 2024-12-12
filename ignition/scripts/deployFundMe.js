// import ethers.js
// create main function
// execute main function

const { ethers } = require("hardhat")

async function main() {
    console.log('23333', 23333)
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile 
    // manually to make sure everything is compiled
    // await hre.run('compile');

    // We get the contract to deploy
    const Greeter = await hre.ethers.getContractFactory("FundMe");
    const greeter = await Greeter.deploy("Hello, Hardhat!");

    await greeter.waitForDeployment();

    console.log("Greeter deployed to:", greeter.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });