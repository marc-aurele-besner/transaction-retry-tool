
[![license](https://img.shields.io/github/license/jamesisaac/react-native-background-task.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/transaction-retry-tool.svg)](https://badge.fury.io/js/transaction-retry-tool)

# transaction-retry-tool

```

     _                                  _   _                            _                     _              _ 
    | |                                | | (_)                          | |                   | |            | |
    | |_ _ __ __ _ _ __  ___  __ _  ___| |_ _  ___  _ __ ______ _ __ ___| |_ _ __ _   _ ______| |_ ___   ___ | |
    | __| '__/ _' | '_ \/ __|/ _' |/ __| __| |/ _ \| '_ \______| '__/ _ \ __| '__| | | |______| __/ _ \ / _ \| |
    | |_| | | (_| | | | \__ \ (_| | (__| |_| | (_) | | | |     | | |  __/ |_| |  | |_| |      | || (_) | (_) | |
     \__|_|  \__,_|_| |_|___/\__,_|\___|\__|_|\___/|_| |_|     |_|  \___|\__|_|   \__, |       \__\___/ \___/|_|
                                                                                   __/ |                        
                                                                                  |___/                         
```

This Hardhat plugin add 2 tasks and 2 functions to retry transaction and get the current gas cost

## Install Transaction-Retry-Tool

```
npm i transaction-retry-tool
```

## Directories
 - [src/](./src/)

 - [.eslintrc.js](./.eslintrc.js)
 - [.npmignore](./.npmignore)
 - [.prettierrc](./.prettierrc)
 - [awesome-readme.config.js](./awesome-readme.config.js)
 - [CONTRIBUTING.md](./CONTRIBUTING.md)
 - [LICENSE](./LICENSE)
 - [package-lock.json](./package-lock.json)
 - [package.json](./package.json)
 - [README.md](./README.md)
 - [tsconfig.json](./tsconfig.json)
 - [tsconfig.prod.json](./tsconfig.prod.json)
 - [tslint.json](./tslint.json)


    

## Tasks

```
npx hardhat retry
```

### Task: retry

Usage: hardhat [GLOBAL OPTIONS] retry --tx-hash <STRING> --signer-key <STRING> [--gas-price <STRING>]

OPTIONS:

- --tx-hash             The transaction hash of the transaction to retry
- --signer-key          The signer private key (or type hardhat to use hardhat.config private key)
- --gas-price           Specify a gas price to retry the transaction with (default: current network gas price) (default: "")

retry: Retry a transaction with the current gas price or specify one

### Task: gas-cost

Usage: hardhat [GLOBAL OPTIONS] gas-cost

gas-cost: Get the current gas price on the selected network in wei

## Functions

Function allow you to use the transaction retry tool OR get the current gas cost.

```
const { transactionRetry } = require('hardhat');

transactionRetry.retry(
    txHash: string,
    signerKey: string,
    gasPrice?: string
)
transactionRetry.gasCost()
```

## Directory Tree
```
transaction-retry-tool/
│   .eslintrc.js
│   .npmignore
│   .prettierrc
│   awesome-readme.config.js
│   CONTRIBUTING.md
│   LICENSE
│   package-lock.json
│   package.json
│   README.md
│   tsconfig.json
│   tsconfig.prod.json
│   tslint.json
└─── src/
   │   getGasCost.ts
   │   index.ts
   │   README.md
   │   retryTransaction.ts
   │   serveTasks.ts
   │   TransactionRetry.ts
   │   type-extensions.ts
```
## Don't hesitate to contribute to this project.
