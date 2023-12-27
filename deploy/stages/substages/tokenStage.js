const hre = require('hardhat');
const { 
  skipIfAlreadyDeployed, 
} = require('../../helpers');

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
      deployer
    ]
  });
}
module.exports.tags = ["tokenStage", "token"];
