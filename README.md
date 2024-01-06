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

## How to grant, revoke and renounce roles?

The token has roles that are to regulate certain aspects of the functionality.

1) Pauser role (strict name: `PAUSER_ROLE`) - the owner of the role is able to call `unpause()` function and trigger the free trading of the token once and for all.
2) Minter role (strict name: `MINTER_ROLE`) - the owner of the role is able to mint tokens up to a `CAP()` value (max value of the tokens that could be minted).
3) Burner role (strict name: `BURNER_ROLE`) - the owner of the role is able to burn tokens from anyone at any rate.
4) Tax Marker role (strict name: `TAX_MARKER_ROLE`) - the owner of the role is basically considered an entity to which the token sendings are going to be taxed (up to 10%). (Ex. DEX pairs address, etc.)
5) Untaxable role (strict name: `UNTAXABLE_ROLE`) - the owner of the role is freed from any kind of fees and taxes charged in the token.
6) Banned role (strict name: `BANNED_ROLE`) - this is special role and the only role that cannot be renounced and could only be revoked by the admin. The owner of the role has their funds frozen in their address since the admin grants the role.

### Through terminal

1) To grant role to someone you should perform a command: `npx hardhat grant --address <address of the role receiver> --role <STRICT_NAME_OF_THE_ROLE> --network mainnet`. 
   1) Example: `npx hardhat grant --address 0xB8A71e585B7f4357305a9174c0E0f6db1Db71AD1 --role UNTAXABLE_ROLE --network mainnet`
2) To revoke role from someone you should perform a command: `npx hardhat revoke --address <address from whom the role would be revoked> --role <STRICT_NAME_OF_THE_ROLE> --network mainnet`.
   1) Example: `npx hardhat revoke --address 0xB8A71e585B7f4357305a9174c0E0f6db1Db71AD1 --role UNTAXABLE_ROLE --network mainnet`
3) To renounce the role you should perform a command: `npx hardhat renounce --role <STRICT_NAME_OF_THE_ROLE> --network mainnet`.
   1) Example: `npx hardhat renounce --role UNTAXABLE_ROLE --network mainnet`

### Through https://etherscan.io

1) Go to a [link](https://etherscan.io/address/0x2475181E30FcFFA7A636eDc469BE56d9080F4A8c#writeContract#F3)
2) First argument of the function is hash of a role and the second one is a role receiver address.
3) To acquire hash of a role one should address this [link](https://etherscan.io/address/0x2475181E30FcFFA7A636eDc469BE56d9080F4A8c#readContract) and copy the value of the constant which name ends with `_ROLE` postfix.
   1) Example: if an admin wants to ban some specific address he or she should acquire value of a constant with name `BANNED_ROLE` and pass it to `grantRole` function as first argument (that'll be: `0x3735310f7cbb434a4412bb30a00c71d49f056e4bfe5a28c0b8c295a228fbbbde`).


## How to mint tokens?

### Through terminal

To mint the token you should perform a command: `npx hardhat mint --address <receiver of the tokens> --amount <amount of the token in WEI>`.

Example: `npx hardhat mint --address 0xB8A71e585B7f4357305a9174c0E0f6db1Db71AD1 --amount 3300000000000000000000000`.

### Through https://etherscan.io

1) Go to a [link](https://etherscan.io/address/0x2475181E30FcFFA7A636eDc469BE56d9080F4A8c#writeContract#F4).
2) First argument would be to whom the tokens should be minted and the second one is an amount in wei with decimals 18. (ex. 1 $FTNA == 1000000000000000000)

## How to enable trading?

**CAUTION:** the sell tax has range from 0 to 10000 (base points).

### Through terminal

To enable the trading and free transfering of the tokens you should perform command: `npx hardhat unpause --network mainnet`.

### Through https://etherscan.io

Go to a [link](https://etherscan.io/address/0x2475181E30FcFFA7A636eDc469BE56d9080F4A8c#writeContract#F12) and execute the function.

## How to manage sell tax?

### Through terminal

To set up the sell tax you should perform command: `npx hardhat tax --amount <amount in BPS> --network mainned`.

Example: `npx hardhat tax --amount 9800 --network mainnet` - this would set the tax to 2% = (10000 - 9800) / 2.

### Through https://etherscan.io

Go to a [link](https://etherscan.io/address/0x2475181E30FcFFA7A636eDc469BE56d9080F4A8c#writeContract#F8) and execute the function. **WARNING:** please read the annotation in the function description at etherscan.io (it is revealed when the function is clicked on).

## How to mark multiple DEX pairs as tax markers?

### Through terminal

To mark multiple entities as tax triggers (e.g. DEX pairs) you should perform a command: `npx hardhat markers --addresses <A1>,<A2>,...<An> --network mainnets`.

Example: `npx hardhat markers --addresses 0xB8A71e585B7f4357305a9174c0E0f6db1Db71AD1,0xB8A71e585B7f4357305a9174c0E0f6db1Db71AD1 --network mainnet`

*WARNING:* the example marks some random addresses!

### Through https://etherscan.io

Go to a [link](https://etherscan.io/address/0x2475181E30FcFFA7A636eDc469BE56d9080F4A8c#writeContract#F9) and execute the function with a list of parameters that are formatted as: `[<A1>,<A2>,...<An>]`.

Example: `[0xB8A71e585B7f4357305a9174c0E0f6db1Db71AD1,0xB8A71e585B7f4357305a9174c0E0f6db1Db71AD1]`

*WARNING:* the example marks some random addresses!

## Other interactions

Other functions (such as burn of the tokens) could be easily interacted with at this link in the block explorer: [etherscan.com/FortunaGovernanceToken](https://etherscan.io/address/0x2475181E30FcFFA7A636eDc469BE56d9080F4A8c#writeContract)

# Fortuna Airdrop

To deploy the airdrop smart-contract you should perform a command: `npx hardhat deploy --tags airdrop --network mainnet`. 

**VALUABLE CONSTRAINTS:** 

1) The contract **SHOULD** only be deployed once the Fortuna Governance token has been deployed too. 
2) The CSV table of the holders in the directory `./resources/csv/holders.csv` **MUST** be populated.
3) The deployed contract **MUST** bear the `MINTER_ROLE` role.

## How to claim funds through some frontend or how to perform `claim(...)` function?

This section is dedicated to help a frontend developer to integrate the airdrop contract functionality. The claim function has three parameters: `account`, `amount`, `merkleProof`.

1) The `account` represents the claimer address and fronted should pass here a connected to the wallet address. The claimer should be specified in the `./resources/csv/holders.csv` table.  
2) The `amount` represents an amount in wei which should be claimed by the claimer and most importantly - it has to be an exact number that was specified under the specific claimer in `./resources/csv/holders.csv`.
3) `merkleProof` - This paramater is generated and returned by the hardhat task called `getMerkleTreeInfo`. If a frontend developer wants to generate this parameter manually he or she should address the implementation of the task that lies here: `./tasks/manual/getMerkleTreeInfo.js`.
   1) To call the hardhat task and receive the value of the parameter one should perform a command `npx hardhat getMerkleTreeInfo --address <address of the claimer>`.
   2) Example: `npx hardhat getMerkleTreeInfo --address 0xB8A71e585B7f4357305a9174c0E0f6db1Db71AD1`

## How to update the Merkle Tree in the airdrop smart-contract?

1) Alter the CSV table at the `./resources/csv/holders.csv`.
2) Perform a command: `npx hardhat updateMerkleTree --network mainnet`.

## Other interactions

Other functions (such as manually calling the setters) could be easily interacted with at this link in the block explorer: [etherscan.com/FortunaAirdrop](https://etherscan.io/)
