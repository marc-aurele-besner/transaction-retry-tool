module.exports = {
    figlet: `
     _                                  _   _                            _                     _              _ 
    | |                                | | (_)                          | |                   | |            | |
    | |_ _ __ __ _ _ __  ___  __ _  ___| |_ _  ___  _ __ ______ _ __ ___| |_ _ __ _   _ ______| |_ ___   ___ | |
    | __| '__/ _' | '_ \\/ __|/ _' |/ __| __| |/ _ \\| '_ \\______| '__/ _ \\ __| '__| | | |______| __/ _ \\ / _ \\| |
    | |_| | | (_| | | | \\__ \\ (_| | (__| |_| | (_) | | | |     | | |  __/ |_| |  | |_| |      | || (_) | (_) | |
     \\__|_|  \\__,_|_| |_|___/\\__,_|\\___|\\__|_|\\___/|_| |_|     |_|  \\___|\\__|_|   \\__, |       \\__\\___/ \\___/|_|
                                                                                   __/ |                        
                                                                                  |___/                         `,
    root_license: `[![npm version](https://badge.fury.io/js/awesome-readme.svg)](https://badge.fury.io/js/awesome-readme)`,
    root_header: `
This Hardhat plugin add 2 tasks and 2 functions to retry transaction and get the current gas cost

## Install transaction-retry-tool

\`\`\`
npm i transaction-retry-tool
\`\`\`
`,
    root_body: `
    

## Tasks

\`\`\`
npx hardhat retry
\`\`\`

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

\`\`\`
const { transactionRetry } = require('hardhat');

transactionRetry.retry(
    txHash: string,
    signerKey: string,
    gasPrice?: string
)
transactionRetry.gasCost()
\`\`\`
`,
    root_footer: `## Don't hesitate to contribute to this project.`,
    ignore_gitFiles: true,
    ignore_gitIgnoreFiles: true,
    ignore_files: ['.prettierignore']
}