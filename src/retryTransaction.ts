const retryTransaction = async (env: any, txHash: string, signerKey: string, gasPrice?: string) => {
    const GET_ORIGINAL_TX_MAX_TRIES = 5
    const REPLACEMENT_TX_MAX_TRIES_SIGN_SEND = 5
    try {
        let replacementTransactionSent = false
        let replacementTransactionHash = ''
        // Get signer account from mnemonic OR private key
        let signer: any
        if (signerKey === 'hardhat') {
            if (env.network.config.accounts.mnemonic !== undefined)
                signer = new env.ethers.Wallet(env.network.config.accounts.mnemonic, env.ethers.provider)
            else signer = new env.ethers.Wallet(env.network.config.accounts[0], env.ethers.provider)
        } else signer = new env.ethers.Wallet(signerKey, env.ethers.provider)

        // Get transaction
        let tx = await signer.provider.getTransaction(txHash)
        let tryCount = 0
        while (tx === null && tryCount <= GET_ORIGINAL_TX_MAX_TRIES) {
            tryCount++
            console.log(
                '\x1b[33m%s\x1b[0m',
                `Transaction ${txHash} not found, attempt: ${tryCount}/${GET_ORIGINAL_TX_MAX_TRIES}, ${
                    tryCount < GET_ORIGINAL_TX_MAX_TRIES && 'retrying...'
                }`
            )
            // wait for 3 seconds and retry
            await new Promise((resolve) => setTimeout(resolve, 3000))
            // get transaction again
            tx = await signer.provider.getTransaction(txHash)
        }
        if (tx === null) return null

        // Check if transaction is mined
        if (tx.blockNumber)
            console.log('\x1b[32m%s\x1b[0m', `Transaction ${txHash} was mined, in block ${tx.blockNumber}`)
        else if (tx.from === signer.address && tx.gasPrice !== undefined && tx.gasLimit !== undefined) {
            const { gasPrice: originalGasPrice, gasLimit: originalGasLimit } = tx

            // Log detail of the transaction
            console.log('\x1b[34m%s\x1b[0m', `Transaction ${txHash} is not mined`)
            console.log(
                '\x1b[0m\x1b[0m',
                `This transaction was sent with ${originalGasLimit} gas limit and ${originalGasPrice} wei in gas price`
            )
            console.log('\x1b[0m\x1b[0m', `Gas price: ${originalGasPrice} wei per gas used`)
            console.log('\x1b[0m\x1b[0m', `Gas limit: ${originalGasLimit}`)

            // Use the gas price provided by the user OR the current gas price
            const gasPriceToUse =
                gasPrice !== undefined && gasPrice !== ''
                    ? env.ethers.BigNumber.from(gasPrice)
                    : await signer.provider.getGasPrice()

            // If no gas price provided by the user, console log the current gas price
            if (gasPrice === undefined || gasPrice === '')
                console.log('\x1b[34m%s\x1b[0m', `Current gas price: ${await signer.provider.getGasPrice()}`)

            if (originalGasPrice > gasPriceToUse)
                console.log(
                    '\x1b[33m%s\x1b[0m',
                    `Gas price is higher than current gas price, the transaction should be minted shortly`
                )
            else {
                console.log(
                    '\x1b[33m%s\x1b[0m',
                    `Gas price is lower than current gas price, the transaction will be retried with gas price of ${gasPriceToUse} wei`
                )
                let replacementTransactionTryCount = 0
                while (
                    !replacementTransactionSent &&
                    replacementTransactionTryCount < REPLACEMENT_TX_MAX_TRIES_SIGN_SEND
                ) {
                    replacementTransactionTryCount++
                    const replacementRawTx = {
                        nonce: env.ethers.utils.hexlify(tx.nonce),
                        to: tx.to,
                        value: env.ethers.utils.hexlify(tx.value),
                        gasLimit: env.ethers.utils.hexlify(tx.gasLimit),
                        gasPrice: env.ethers.utils.hexlify(gasPriceToUse),
                        data: tx.data
                    }
                    const replacementRawTransactionHex = await signer.signTransaction(replacementRawTx)
                    const { hash: replacementTxHash } = await env.ethers.provider.sendTransaction(
                        replacementRawTransactionHex
                    )
                    replacementTransactionSent = true
                    replacementTransactionHash = replacementTxHash
                    console.log(
                        '\x1b[34m%s\x1b[0m',
                        `The replacement transaction has been sent, the new transaction hash is: `,
                        '\x1b[0m\x1b[0m',
                        replacementTxHash
                    )
                    const replacementTxReceipt = await env.ethers.provider.waitForTransaction(replacementTxHash)
                    console.log(
                        '\x1b[32m%s\x1b[0m',
                        `The replacement transaction has been mined on block:`,
                        '\x1b[0m\x1b[0m',
                        replacementTxReceipt.blockNumber
                    )
                    return replacementTxHash
                }
            }
        } else
            console.log(
                '\x1b[33m%s\x1b[0m',
                `${
                    tx.from === signer.address
                        ? `Error: tx.gasPrice or tx.gasLimit is undefined`
                        : `Transaction ${txHash} is not from the same sender, original sender: ${tx.from}, current sender: ${signer.address}`
                }`
            )
    } catch (err) {
        console.log('\x1b[33m%s\x1b[0m', `Error: ${err}`)
    }
}

export default retryTransaction
