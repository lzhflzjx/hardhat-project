module.exports = async ({ getNamedAccounts, deployments }) => {
    const { firstAccount } = await getNamedAccounts()
    const { deploy } = deployments
    console.log('this is deploy function',firstAccount)

    const fundMe = await deploy("FundMe", {
        from: firstAccount,
        args: [180],
        log: true,
        // waitConfirmations: confirmations
    })
}

module.exports.tags = ["all", "fundme"]