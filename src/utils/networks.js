import { ethers } from 'ethers';

// Network configuration for multiple networks
export const networkParams = {
    1: {
        chainId: '0x1',
        chainName: 'Ethereum Main Network (Mainnet)',
        nativeCurrency: {
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18
        },
        rpcUrls: ['https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID'],
        blockExplorerUrls: ['https://etherscan.io']
    },
    137: {
        chainId: '0x89',
        chainName: 'Polygon Main Network',
        nativeCurrency: {
            name: 'MATIC',
            symbol: 'MATIC',
            decimals: 18
        },
        rpcUrls: ['https://polygon-rpc.com'],
        blockExplorerUrls: ['https://polygonscan.com']
    },
    56: {
        chainId: '0x38',
        chainName: 'Binance Smart Chain Main Network',
        nativeCurrency: {
            name: 'Binance Coin',
            symbol: 'BNB',
            decimals: 18
        },
        rpcUrls: ['https://bsc-dataseed.binance.org'],
        blockExplorerUrls: ['https://bscscan.com']
    },
    42161: {
        chainId: '0xA4B1',
        chainName: 'Arbitrum One',
        nativeCurrency: {
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18
        },
        rpcUrls: ['https://arb1.arbitrum.io/rpc'],
        blockExplorerUrls: ['https://arbiscan.io']
    },
    10: {
        chainId: '0xA',
        chainName: 'Optimism',
        nativeCurrency: {
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18
        },
        rpcUrls: ['https://mainnet.optimism.io'],
        blockExplorerUrls: ['https://optimistic.etherscan.io']
    },
    80002: {
        chainId: '0x13882',
        chainName: 'Amoy',
        nativeCurrency: {
            name: 'MATIC',
            symbol: 'MATIC',
            decimals: 18
        },
        rpcUrls: ['https://polygon-amoy.drpc.org'],
        blockExplorerUrls: ['https://amoy.polygonscan.com/']
    },
    11155111: {
        chainId: '0xaa36a7',
        chainName: 'Sepolia Testnet',
        nativeCurrency: {
            name: 'SepoliaETH',
            symbol: 'SEPETH',
            decimals: 18
        },
        rpcUrls: ['https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID'],
        blockExplorerUrls: ['https://sepolia.etherscan.io/']
    }
};


// Switch to specified network
export const switchToNetwork = async (provider, chainId) => {
    const network = networkParams[chainId];
    if (!network) {
        throw new Error('Unsupported network');
    }

    try {
        await provider.send('wallet_switchEthereumChain', [{ chainId: network.chainId }]);
    } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
            try {
                await provider.send('wallet_addEthereumChain', [network]);
            } catch (addError) {
                throw new Error(`Failed to add ${network.chainName} network`);
            }
        } else {
            throw new Error(`Failed to switch to ${network.chainName} network`);
        }
    }
};

// Get token balance for a given address on the current network
export const getTokenBalance = async (provider, address) => {
    const balance = await provider.getBalance(address);
    return ethers.formatEther(balance);
};
