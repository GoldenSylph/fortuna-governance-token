const keccak256 = require('keccak256');
module.exports = (task) =>
  task(
    "renounce",
    "Renounce role from myself (or configured in `.env` file first address of the mnemonic under the key `MAINNET_DEPLOY_MNEMONIC`).",
  )
    .addOptionalParam("role", "Name of the role.", 'UNTAXABLE_ROLE', types.string)
    .setAction(async ({address, role}, hre) => {
      const signers = await hre.ethers.getSigners();
      const deployer = signers[0].address;
      const roleHash = keccak256(role);
      await hre.deployments.execute(
        "FortunaGovernanceToken",
        { from: deployer, log: true },
        'renounceRole',
        roleHash,
        deployer
      );
      console.log(`FortunaGovernanceToken: the role ${role}:<${roleHash}> has been renounced from myself.`);
    });
