import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ignition";
require("@chainlink/env-enc").config()

const privateKey1 = process.env.PRIVATE_KEY as string
const url1 = process.env.SEPOLIA_URL//免费第三方服务商：Alchemy，Infura，QuickNode

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  // defaultNetwork: "rinkeby",
  networks: {
    hardhat: {},
    sepolia: {
      url: url1,
      accounts: [privateKey1],
    },
  },
};

export default config;
