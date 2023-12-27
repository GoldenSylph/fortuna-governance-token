module.exports = (task) =>
  task(
    "markers",
    "Marking multiple entities to be a tax triggers.",
  )
    .addOptionalParam("addresses", "The addresses of the tax markers separated by comma.", '<A1>,<A2>', types.string)
    .setAction(async ({addresses}, hre) => {
      const signers = await hre.ethers.getSigners();
      const deployer = signers[0].address;
      const addressesList = addresses.split(",");
      await hre.deployments.execute(
        "FortunaGovernanceToken",
        { from: deployer, log: true },
        'setTaxMarkers',
        addressesList
    );
      console.log(`FortunaGovernanceToken: the tax markers has been added: ${JSON.stringify(addressesList)}.`);
    });
