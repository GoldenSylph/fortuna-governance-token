const keccak256 = require('keccak256');
module.exports = (task) =>
  task(
    "revoke",
    "Revoke role from a certain entity.",
  )
    .addOptionalParam("address", "Who or what (address) from whom the role would be revoked.", '0xB8A71e585B7f4357305a9174c0E0f6db1Db71AD1', types.string)
    .addOptionalParam("role", "Name of the role.", 'UNTAXABLE_ROLE', types.string)
    .setAction(async ({address, role}, hre) => {
      const signers = await hre.ethers.getSigners();
      const deployer = signers[0].address;
      const roleHash = keccak256(role);
      await hre.deployments.execute(
        "FortunaGovernanceToken",
        { from: deployer, log: true },
        'revokeRole',
        roleHash,
        address
      );
      console.log(`FortunaGovernanceToken: the role ${role}:<${roleHash}> has been revoked from ${address}.`);
    });
