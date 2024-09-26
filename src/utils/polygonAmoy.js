import { ethers } from 'ethers'

export const amoyChainId = 80002

export const amoyNetworkParams = {
    chainId: `0x${amoyChainId.toString(16)}`,
    chainName: 'Amoy',
    nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18
    },
    rpcUrls: ['https://polygon-amoy.drpc.org'],
    blockExplorerUrls: ['https://amoy.polygonscan.com/']
}

export const switchToAmoy = async (provider) => {
    try {
        await provider.send('wallet_switchEthereumChain', [{ chainId: amoyNetworkParams.chainId }])
    } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
            try {
                await provider.send('wallet_addEthereumChain', [amoyNetworkParams])
            } catch (addError) {
                throw new Error('Failed to add Amoy network')
            }
        } else {
            throw new Error('Failed to switch to Amoy network')
        }
    }
}

export const getAmoyTokenBalance = async (provider, address) => {
    const balance = await provider.getBalance(address)
    return ethers.formatEther(balance)
}