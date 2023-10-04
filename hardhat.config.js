// require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require('@openzeppelin/hardhat-upgrades');

const PRIVATE_KEY = process.env.PRIVATE_KEY;

const GOERLI_API_KEY = process.env.ETHEREUM_API_KEY;
const SEPOLIA_API_KEY = process.env.SEPOLIA_API_KEY;  
const POLYGON_API_KEY = process.env.POLYGON_API_KEY; 
const AVALANCHE_API_KEY = process.env.AVALANCHE_API_KEY;  
const BSC_API_KEY = process.env.BSC_API_KEY;   
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.18",
  },

  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},

    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/BEY-5Fx39Rc1Yzubmu-y2n9VMa4CuPxr`,
      accounts: [process.env.PRIVATE_KEY]
    },
    bscT: {
      url: `https://data-seed-prebsc-2-s3.binance.org:8545`,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 97,
      gasPrice: 20000,
    },
    avalancheT: {
      url: `https://rpc.ankr.com/avalanche_fuji`,
      accounts: [process.env.PRIVATE_KEY],
    },
    goerli: {
      url: `https://rpc.ankr.com/eth_goerli`,
      accounts: [process.env.PRIVATE_KEY],
      gasLimit: 10000,
    },
    sepolia:{
      url:`https://rpc.sepolia.org`,
      accounts: [process.env.PRIVATE_KEY],
      chainId:11155111,
    },
  },

   etherscan: {
    apiKey:{
      // goerli: GOERLI_API_KEY,
      //bscTestnet: BSC_API_KEY,PRIVATE_KEY,
      polygonMumbai: POLYGON_API_KEY,
      // avalancheFujiTestnet: AVALANCHE_API_KEY,
      // sepolia:SEPOLIA_API_KEY
    },      
     networks: [ 
      
     ]
    },
  
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },

  mocha: {
    timeout: 4000000,
  },
};
