import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ignition";

require("@chainlink/env-enc").config()
// require("dotenv").config()

// task
require("./tasks")

require("@nomicfoundation/hardhat-ethers");
require("hardhat-deploy");
require("hardhat-deploy-ethers");



const { ProxyAgent, setGlobalDispatcher } = require("undici");
const proxyAgent = new ProxyAgent("http://127.0.0.1:29290");
setGlobalDispatcher(proxyAgent);

const privateKey1 = process.env.PRIVATE_KEY_1 as string
const privateKey2 = process.env.PRIVATE_KEY_2 as string
const url1 = process.env.SEPOLIA_URL//免费第三方服务商：Alchemy，Infura，QuickNode
const etherToekn1:any = process.env.ETHERSCAN_API_KEY//以太坊浏览器token

const config = {
  solidity: "0.8.28",
  defaultNetwork: "hardhat",
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
  },
  namedAccounts: {
    firstAccount: {
      default: 0
    },
    secondAccount: {
      default: 1
    },
  },
};

export default config;
