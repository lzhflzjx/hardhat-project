import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ignition";
require("@chainlink/env-enc").config()
// require("dotenv").config()

const { ProxyAgent, setGlobalDispatcher } = require("undici");
const proxyAgent = new ProxyAgent("http://127.0.0.1:29290");
setGlobalDispatcher(proxyAgent);

const privateKey1 = process.env.PRIVATE_KEY as string
const url1 = process.env.SEPOLIA_URL//免费第三方服务商：Alchemy，Infura，QuickNode
const etherToekn1 = process.env.ETHERSCAN_API_KEY//以太坊浏览器token

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  // defaultNetwork: "rinkeby",
  networks: {
    hardhat: {},
    sepolia: {
      url: url1,//from-quickNode https://dashboard.quicknode.com/endpoints/411428
      accounts: [privateKey1],//from 钱包秘钥
    },
  },
  etherscan:{
    apiKey:etherToekn1//from-以太坊浏览器 https://etherscan.io/myapikey
  }
};

export default config;
