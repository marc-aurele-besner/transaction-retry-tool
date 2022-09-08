[![license](https://img.shields.io/github/license/jamesisaac/react-native-background-task.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/transaction-retry-tool.svg)](https://badge.fury.io/js/transaction-retry-tool)


# Transaction-Retry Tool

This Hardhat plugin add 2 tasks and 2 functions to retry transaction and get the current gas cost

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
