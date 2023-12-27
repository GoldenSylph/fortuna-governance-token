const csvParser = require("csv-parser");
const fsExtra = require("fs-extra");
const { StandardMerkleTree } = require("@openzeppelin/merkle-tree");

////////////////////////////////////////////
// Constants Starts
////////////////////////////////////////////

const DEAD_ADDRESS = "0x000000000000000000000000000000000000dEaD";
const skipIfAlreadyDeployed = true;
const HOUR = 3600;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 4 * WEEK;

////////////////////////////////////////////
// Constants Ends
////////////////////////////////////////////

const mintNativeTokens = async (signer, amountHex) => {
  await hre.network.provider.send("hardhat_setBalance", [
    signer.address || signer,
    amountHex
  ]);
}

const getFakeDeployment = async (address, name, save) => {
  await save(name, {address});
}

const withImpersonatedSigner = async (signerAddress, action) => {
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [signerAddress],
  });

  const impersonatedSigner = await hre.ethers.getSigner(signerAddress);
  await action(impersonatedSigner);

  await hre.network.provider.request({
    method: "hardhat_stopImpersonatingAccount",
    params: [signerAddress],
  });
}

const getEventBody = async (eventName, contractInstance, resultIndex=-1) => {
  const filter = contractInstance.filters[eventName]();
  const filterQueryResult = await contractInstance.queryFilter(filter);
  const lastIndex = filterQueryResult.length == 0 ? 0 : filterQueryResult.length - 1;
  return filterQueryResult[resultIndex == -1 ? lastIndex : resultIndex].args;
}

const emptyStage = (message) => 
  async ({deployments}) => {
      const {log} = deployments;
      log(message);
  };

const getMockTree = (user1, user2) => StandardMerkleTree.of(
  [
    [user1, "10000000000000000000000000"],
    [user2, "20000000000000000000000000"],
  ],
  ["address", "uint256"]
);

const getMerkleTree = (usersToBalances) => StandardMerkleTree.of(
  usersToBalances,
  ["address", "uint256"]
);

const parseCSV = (keys, fileName) => {
  let result = [];
  return new Promise((resolve, reject) => {
    fsExtra.createReadStream(fileName)
      .on("error", error => {
        reject(error);
      })
      .pipe(csvParser())
      .on("data", data => {
        const entry = {};
        for (const key of keys) {
          entry[key] = data[key];
        }
        result.push(entry);
      })
      .on("end", () => {
        resolve(result);
      });
  });
}

module.exports = {
  skipIfAlreadyDeployed,
  withImpersonatedSigner,
  mintNativeTokens,
  getFakeDeployment,
  DEAD_ADDRESS,
  getEventBody,
  emptyStage,
  getMockTree,
  getMerkleTree,
  parseCSV,
  HOUR, 
  DAY,
  WEEK,
  MONTH
};
