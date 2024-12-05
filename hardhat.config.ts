import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
};

// export default config;

module.exports = {
  solidity: "0.8.28",
  networks: {
    development: {
      url: `http://127.0.0.1:8545`,
      chainId: 31337
    }
  }
};
