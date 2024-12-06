import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "@nomicfoundation/hardhat-ignition";

const privateKey1 = `0x80940bc4842265d0fcc6a86c449df7e1c4f4ff5f13a7412c3402cd1aaea65bd5`;
const config: HardhatUserConfig = {
  solidity: "0.8.28",
  defaultNetwork: "rinkeby",
  networks: {
    hardhat: {},
    rinkeby: {
      url: "https://eth-mainnet.alchemyapi.io/v2/0x6d7D8e816d9527d46765Ef3C92722B15b4EdC1b7",
      accounts: [privateKey1],
    },
  },
};

export default config;
