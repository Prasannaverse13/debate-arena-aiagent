import { ethers } from 'ethers';

// Connect to MetaMask
export async function connectMetaMask() {
  if (!window.ethereum) {
    console.log("MetaMask not installed - using mock data for development");
    return {
      address: '0x1234567890abcdef1234567890abcdef12345678',
      provider: null,
      signer: null
    };
  }

  try {
    // Request account access
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    
    return {
      address: accounts[0],
      provider,
      signer
    };
  } catch (error) {
    console.error('Error connecting to MetaMask:', error);
    // Return mock data for development
    return {
      address: '0x1234567890abcdef1234567890abcdef12345678',
      provider: null,
      signer: null
    };
  }
}

// Get ETH balance
export async function getEthBalance(address: string) {
  if (!window.ethereum) {
    return '10.0'; // Mock balance for development
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const balance = await provider.getBalance(address);
    
    return ethers.formatEther(balance);
  } catch (error) {
    console.error('Error getting ETH balance:', error);
    return '10.0'; // Mock balance for development
  }
}

// Check if MetaMask is installed
export function isMetaMaskInstalled() {
  return typeof window.ethereum !== 'undefined';
}

// Listen for account changes
export function listenForAccountChanges(callback: (accounts: string[]) => void) {
  if (window.ethereum) {
    window.ethereum.on('accountsChanged', callback);
  }
}

// Listen for chain changes
export function listenForChainChanges(callback: (chainId: string) => void) {
  if (window.ethereum) {
    window.ethereum.on('chainChanged', callback);
  }
}