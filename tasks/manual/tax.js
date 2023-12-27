module.exports = (task) =>
  task(
    "tax",
    "Setting up a tax value for the token trades.",
  )
    .addOptionalParam("amount", "The amoun in BPS.", '9800', types.string)
    .setAction(async ({amount}, hre) => {
      const signers = await hre.ethers.getSigners();
      const deployer = signers[0].address;
      await hre.deployments.execute(
        "FortunaGovernanceToken",
        { from: deployer, log: true },
        'setTaxForDexTrading',
        amount
    );
      console.log(`FortunaGovernanceToken: the tax has been set up to ${10000 - parseInt(amount)}%.`);
    });
