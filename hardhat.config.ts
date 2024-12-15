import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ignition";

// task
require("./tasks")


require("@chainlink/env-enc").config()
// require("dotenv").config()

const { ProxyAgent, setGlobalDispatcher } = require("undici");
const proxyAgent = new ProxyAgent("http://127.0.0.1:29290");
setGlobalDispatcher(proxyAgent);

const privateKey1 = process.env.PRIVATE_KEY_1 as string
const privateKey2 = process.env.PRIVATE_KEY_2 as string
const url1 = process.env.SEPOLIA_URL//免费第三方服务商：Alchemy，Infura，QuickNode
const etherToekn1:any = process.env.ETHERSCAN_API_KEY//以太坊浏览器token

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  // defaultNetwork: "rinkeby",
  networks: {
    hardhat: {},
    sepolia: {
      url: url1,//from-quickNode https://dashboard.quicknode.com/endpoints/411428
      accounts: [privateKey1,privateKey2],//from 钱包秘钥
      chainId:11155111 
    },
  },
  etherscan: {
    apiKey: {
      sepolia: etherToekn1//from-以太坊浏览器 https://etherscan.io/myapikey
    }
  }
};

export default config;
