# Fortuna Governance Token and MerkleTree Airdrop Smart-Contracts

This is a repository containing a base for Fortuna Protocol governance token. The instructions below would contain a number of steps that would help a contributor to deploy, setup and manipulate the deployed smart-contracts.

# Set up local environment

1) Fork and clone
2) Open the terminal an go to the directory in which the repo was cloned and make `yarn` command.
3) Create a `.env` file with the following contains per line (as in `.env.example` file in the root of the repository):
   1) MAINNET_DEPLOY_MNEMONIC="xxx" <- Here goes a mnemonic of an admin.
   2) ALCHEMY_MAINNET_API_KEY="xxx" <- Here goes an API key for the Ethereum Mainnet node in the Alchemy (https://www.alchemy.com).
   3) ETHERSCAN_API_KEY="xxx" <- Here goes an API key for the Etherscan (https://etherscan.io).
   4) ADMIN_ADDRESS="0xB8A71e585B7f4357305a9174c0E0f6db1Db71AD1"
   5) REPORT_GAS="true"
   6) DOCGEN="false"

# Fortuna Governance Token

Deploy instructions

1) Pauser Role
2) Minter Role
3) Burner Role
4) Tax Marker Role
5) Untaxable Role
6) Banned Role

How to grant, revoke and renounce roles

How to mint tokens

How to enable trading

# Fortuna Airdrop

Deploy instructions

1) A CSV table of addresses
2) How to update the MerkleTree inside the airdrop contract
3) How to generate a third argument for `claim(...)` function of the airdrop contract.
