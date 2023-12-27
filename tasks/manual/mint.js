const { types } = require("hardhat/config");
module.exports = (task) =>
  task(
    "mint",
    "Mint Fortuna governance tokens to some address.",
  )
    .addOptionalParam("amount", "Define amount to be minted.", '3300000000000000000000000', types.string)
    .addOptionalParam("address", "Define address to be minted to.", '0xB8A71e585B7f4357305a9174c0E0f6db1Db71AD1', types.string)
    .setAction(async ({ amount, address }, hre) => {
      const signers = await hre.ethers.getSigners();
      const deployer = signers[0].address;
      await hre.deployments.execute(
        "FortunaGovernanceToken",
        { from: deployer, log: true },
        'mint',
        address,
        amount
      );
      console.log(`Minted $FTNA' amount ${hre.ethers.utils.formatUnits(amount)} to the address - ${address}`);
    });
