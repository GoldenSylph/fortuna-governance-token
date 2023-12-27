module.exports = (task) =>
  task(
    "unpause",
    "Enables free transfers for everyone once and for all.",
  )
    .setAction(async (_, hre) => {
      const signers = await hre.ethers.getSigners();
      const deployer = signers[0].address;
      await hre.deployments.execute(
        "FortunaGovernanceToken",
        { from: deployer, log: true },
        'unpause'
      );
      console.log(`FortunaGovernanceToken: the transfers has been unpaused.`);
    });
