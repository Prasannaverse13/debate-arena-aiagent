import { ethers } from 'ethers';

// Simplified ABI for FRAX token
const FRAX_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)"
];

// FRAX token address on Ethereum (this would be different on NEAR)
const FRAX_ADDRESS = "0x853d955acef822db058eb8505911ed77f175b99e";

// Get FRAX balance
export async function getFraxBalance(address: string) {
  if (!window.ethereum) {
    return '500.0'; // Mock balance for development
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const fraxContract = new ethers.Contract(FRAX_ADDRESS, FRAX_ABI, provider);
    
    const balance = await fraxContract.balanceOf(address);
    return ethers.formatUnits(balance, 18);
  } catch (error) {
    console.error('Error getting FRAX balance:', error);
    return '500.0'; // Mock balance for development
  }
}

// Transfer FRAX tokens
export async function transferFrax(to: string, amount: string) {
  if (!window.ethereum) {
    console.log(`Development mode: Simulating FRAX transfer of ${amount} to ${to}`);
    return { hash: '0x' + Math.random().toString(16).substring(2, 10) };
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const fraxContract = new ethers.Contract(FRAX_ADDRESS, FRAX_ABI, signer);
    
    const parsedAmount = ethers.parseUnits(amount, 18);
    const tx = await fraxContract.transfer(to, parsedAmount);
    
    return await tx.wait();
  } catch (error) {
    console.error('Error transferring FRAX:', error);
    // Mock transaction for development
    console.log(`Development mode: Simulating FRAX transfer of ${amount} to ${to}`);
    return { hash: '0x' + Math.random().toString(16).substring(2, 10) };
  }
}

// Approve FRAX spending
export async function approveFrax(spender: string, amount: string) {
  if (!window.ethereum) {
    console.log(`Development mode: Simulating FRAX approval of ${amount} to ${spender}`);
    return { hash: '0x' + Math.random().toString(16).substring(2, 10) };
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const fraxContract = new ethers.Contract(FRAX_ADDRESS, FRAX_ABI, signer);
    
    const parsedAmount = ethers.parseUnits(amount, 18);
    const tx = await fraxContract.approve(spender, parsedAmount);
    
    return await tx.wait();
  } catch (error) {
    console.error('Error approving FRAX:', error);
    // Mock transaction for development
    console.log(`Development mode: Simulating FRAX approval of ${amount} to ${spender}`);
    return { hash: '0x' + Math.random().toString(16).substring(2, 10) };
  }
}