'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { switchToNetwork } from '../utils/networks';

const Web3Context = createContext();


export const DEFAULT_CHAIN_ID = 11155111; 

// Use this guide to configure chainId for your dApp
// 1: Ethereum Main Network (Mainnet)
// 137: Polygon Main Network
// 56: Binance Smart Chain Main Network
// 42161: Arbitrum One
// 10: Optimism
// 80002: Polygon Amoy Test Network
// 11155111: Sepolia Testnet




export const BrowserProvider = ({ children }) => {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [address, setAddress] = useState(null);
    const [chainId, setChainId] = useState(null);

    useEffect(() => {
        const initializeWallet = async () => {
            if (typeof window !== 'undefined' && window.ethereum) {
                const provider = new ethers.BrowserProvider(window.ethereum);
                setProvider(provider);

                const storedAddress = localStorage.getItem('walletAddress');
                if (storedAddress) {
                    try {
                        await provider.send('eth_requestAccounts', []);
                        const signer = await provider.getSigner();
                        const address = await signer.getAddress();
                        const network = await provider.getNetwork();

                        setSigner(signer);
                        setAddress(address);
                        setChainId(network.chainId.toString());
                        localStorage.setItem('walletAddress', address);
                    } catch (error) {
                        console.error('Failed to reconnect the wallet:', error);
                    }
                }
                // Listen to events when accounts or chain change
                window.ethereum.on('accountsChanged', handleAccountsChanged);
                window.ethereum.on('chainChanged', handleChainChanged);

                return () => {
                    window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
                    window.ethereum.removeListener('chainChanged', handleChainChanged);
                };
            }

        };

        initializeWallet();
    }, []);

    const handleAccountsChanged = async (accounts) => {
        if (accounts.length > 0) {
            const signer = await provider.getSigner();
            setSigner(signer);
            setAddress(accounts[0]);
            localStorage.setItem('walletAddress', accounts[0]); // Persist address
        } else {
            setSigner(null);
            setAddress(null);
        }
    };

    const handleChainChanged = (chainId) => {
        setChainId(parseInt(chainId, 16));
    };

    const connectWallet = async () => {
        if (provider) {
            try {
                await provider.send('eth_requestAccounts', []);
                const signer = await provider.getSigner();
                const address = await signer.getAddress();
                const network = await provider.getNetwork();

                setSigner(signer);
                setAddress(address);
                setChainId(network.chainId);
                localStorage.setItem('walletAddress', address); // Persist address
            } catch (error) {
                console.error('Failed to connect wallet:', error);
            }
        }
    };

    const disconnectWallet = () => {
        setSigner(null);
        setAddress(null);
        setChainId(null);
        localStorage.removeItem('walletAddress'); // Clear the persisted address
    };

    const ensureCorrectNetwork = async () => {
        if (provider && chainId !== DEFAULT_CHAIN_ID) {
            try {
                await switchToNetwork(provider, DEFAULT_CHAIN_ID);
                return true;
            } catch (error) {
                console.error('Failed to switch network:', error);
                return false;
            }
        }
        return chainId === DEFAULT_CHAIN_ID;
    };

    return (
        <Web3Context.Provider
            value={{ provider, signer, address, chainId, connectWallet, disconnectWallet, ensureCorrectNetwork }}
        >
            {children}
        </Web3Context.Provider>
    );
};

export const useWeb3 = () => {
    const context = useContext(Web3Context);
    if (!context) {
        throw new Error('useWeb3 must be used within a BrowserProvider');
    }
    return context;
};
