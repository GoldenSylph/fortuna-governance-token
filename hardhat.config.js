require("dotenv").config();
require("hardhat-deploy");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("hardhat-docgen");
require("hardhat-abi-exporter");
require("hardhat-tracer");
require("@nomicfoundation/hardhat-chai-matchers");
require("hardhat-contract-sizer");

require("./tasks/utils/accounts")(task);
require("./tasks/utils/getAllArtifacts")(task);
require("./tasks/manual/getMerkleTreeInfo")(task);
require("./tasks/manual/updateMerkleTree")(task);
require("./tasks/manual/generateJsonOfMerkleTreeBody")(task);
require("./tasks/manual/grantRole")(task);
require("./tasks/manual/revokeRole")(task);
require("./tasks/manual/renounceRole")(task);
require("./tasks/manual/mint")(task);
require("./tasks/manual/tax")(task);
require("./tasks/manual/unpause")(task);
require("./tasks/manual/setUpMultipleTaxMarkers")(task);

const mainnetUrl = `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_MAINNET_API_KEY}`;
const mainnetChainId = 1;

const optimizer = {
  enabled: true,
  runs: 1,
};

const compilers = [
  {
    version: "0.8.23",
    settings: {
      viaIR: true,
      optimizer,
    },
  },
];

const etherscan = {
  apiKey: {
    mainnet: process.env.ETHERSCAN_API_KEY,
  }
};

module.exports = {
  adminAddress: process.env.ADMIN_ADDRESS,
  solidity: {
    compilers,
  },
  mocha: {
    timeout: "100000",
  },
  networks: {
    hardhat: {
      forking: {
        url: mainnetUrl,
        chainId: mainnetChainId,
      },
      saveDeployments: true,
    },
    mainnet: {
      url: mainnetUrl,
      chainId: mainnetChainId,
      accounts: { mnemonic: process.env.MAINNET_DEPLOY_MNEMONIC },
      saveDeployments: true,
    }
  },
  namedAccounts: {
    deployer: 0
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS === "true" ? true : false,
    currency: "USD",
  },
  etherscan,
  verify: {
    etherscan
  },
  docgen: {
    path: "./docs",
    clear: true,
    runOnCompile: process.env.DOCGEN === "true" ? true : false,
  },
  abiExporter: {
    path: "./abis",
    flat: false,
    format: "json",
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
  },
};
