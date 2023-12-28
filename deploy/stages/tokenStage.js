const hre = require('hardhat');
const { 
  skipIfAlreadyDeployed, 
} = require('../helpers');

module.exports = async ({
  getNamedAccounts,
  deployments,
  network
}) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  await deploy("FortunaGovernanceToken", {
    from: deployer,
    skipIfAlreadyDeployed,
    log: true,
    args: [
        hre.config.adminAddress
    ],
    gasPrice: hre.ethers.BigNumber.from('50000000000')
  });
}
module.exports.tags = ["tokenStage", "token"];
