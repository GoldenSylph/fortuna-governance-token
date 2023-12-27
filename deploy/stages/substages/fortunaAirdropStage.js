const hre = require('hardhat');
const { 
  skipIfAlreadyDeployed, 
  getMerkleTree, 
  parseCSV
} = require('../../helpers');

module.exports = async ({
  getNamedAccounts,
  deployments,
  network
}) => {
  const { deploy, get } = deployments;
  const { deployer } = await getNamedAccounts();

  const tokenAddress = '';

  const addressKey = "HolderAddress";
  const balanceKey = "Balance";

  const parsedSnapshot = await parseCSV(
    [addressKey, balanceKey], "./resources/csv/holders.csv"
  );
  const merkleTreeBody = [];
  for (const entry of parsedSnapshot) {
    merkleTreeBody.push([
      entry[addressKey],
      hre.ethers.utils.parseEther(
        entry[balanceKey].includes(",") 
          ? entry[balanceKey].replace(",", "") 
          : entry[balanceKey]
      ).toString()
    ]);
  }
  const merkleTree = getMerkleTree(merkleTreeBody);

  await deploy("FortunaAirdrop", {
    from: deployer,
    skipIfAlreadyDeployed,
    log: true,
    args: [
      tokenAddress,
      merkleTree.root,
      deployer
    ]
  });
}
module.exports.tags = ["fortunaAirdropStage", "airdrop"];
