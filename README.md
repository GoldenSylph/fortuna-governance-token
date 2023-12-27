# Fortuna Governance Token and MerkleTree Airdrop Smart-Contracts

This is a repository containing a base for Fortuna Protocol governance token. The instructions below would contain a number of steps that would help a contributor to deploy, setup and manipulate the deployed smart-contracts.

# Setting up a local environment

1) Fork and clone.
2) Open the terminal an go to the directory in which the repo was cloned and make `yarn` command.
3) Create a `.env` file in the root of the cloned repo with the following contains per line (as in `.env.example` file in the root of the repository):
   1) MAINNET_DEPLOY_MNEMONIC="xxx" <- Here goes A mnemonic of an admin.
   2) ALCHEMY_MAINNET_API_KEY="xxx" <- Here goes an API key for the Ethereum Mainnet node in the Alchemy (https://www.alchemy.com).
   3) ETHERSCAN_API_KEY="xxx" <- Here goes an API key for the Etherscan (https://etherscan.io).
   4) ADMIN_ADDRESS="0xB8A71e585B7f4357305a9174c0E0f6db1Db71AD1"
   5) REPORT_GAS="true"
   6) DOCGEN="false"
4) After points 2 and 3, the repo is considered set up and you can continue.

# Fortuna Governance Token

To deploy the token you should perform a command: `npx hardhat deploy --tags token --network mainnet`.

The token has roles that are to regulate certain aspects of the functionality.

1) Pauser role (strict name: `PAUSER_ROLE`) - the owner of the role is able to call `unpause()` function and trigger the free trading of the token once and for all.
2) Minter role (strict name: `MINTER_ROLE`) - the owner of the role is able to mint tokens up to a `CAP()` value.
3) Burner role (strict name: `BURNER_ROLE`) - the owner of the role is able to burn tokens from anyone at any rate.
4) Tax Marker role (strict name: `TAX_MARKER_ROLE`) - the owner of the role is basically considered an entity to which the token sendings are going to be taxed (up to 10%). (Ex. DEX pairs address, etc.)
5) Untaxable role (strict name: `UNTAXABLE_ROLE`) - the owner of the role is freed from any kind of fees and taxes charged in the token.
6) Banned role (strict name: `BANNED_ROLE`) - this is special role and the only role that cannot be renounced and could only be revoked by the admin. The owner of the role has their funds frozen in their address since the admin grants the role.

## How to grant, revoke and renounce roles?

## How to mint tokens?

## How to enable trading?

## How to manage sell tax?

## How to add multiple DEX pairs?

## Other interactions

Other functions (such as burn of the tokens) could be easily interacted with at this link in the block explorer: <link>

# Fortuna Airdrop

To deploy the airdrop smart-contract you should perform a command: `npx hardhat deploy --tags airdrop --network mainnet`. 

**CAUTION**: the contract should only be deployed once the Fortuna Governance token has been deployed too. Also, the CSV table of the holders **must** also be populated.

## How to update the Merkle Tree in the airdrop smart-contract?

## How to perform `claim(...)` function?

1) A CSV table of addresses
2) How to update the MerkleTree inside the airdrop contract
3) How to generate a third argument for `claim(...)` function of the airdrop contract.
