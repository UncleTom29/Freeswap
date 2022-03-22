require('dotenv').config();

require('@nomiclabs/hardhat-waffle');
require('hardhat-gas-reporter');
require('@nomiclabs/hardhat-etherscan');
require('hardhat-tracer');

// Macros
const showGasReporter = false;

const params = {
  solidity: {
    version: '0.8.13',
    settings: {
      optimizer: {
        enabled: showGasReporter || false,
        runs: 999999,
      },
    },
  },
  networks: {
    hardhat: {
      initialBaseFeePerGas: 0,
    },
  },
  gasReporter: {
    enabled: showGasReporter,
    currency: 'USD',
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

const { ROPSTEN_ENDPOINT, DEPLOYER_PRIVATE_KEY } = process.env;
if (ROPSTEN_ENDPOINT && DEPLOYER_PRIVATE_KEY) {
  params.networks.ropsten = {
    url: process.env.ROPSTEN_ENDPOINT,
    accounts: [DEPLOYER_PRIVATE_KEY],
  };
}

module.exports = params;
