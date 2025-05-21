import { Networks } from '@stellar/stellar-sdk';
import { getAddress } from '@stellar/freighter-api';

// Replace with your deployed contract ID
const CONTRACT_ID = process.env.NEXT_PUBLIC_CONTRACT_ID || 'YOUR_CONTRACT_ID_HERE';
const SOROBAN_RPC_URL = 'https://soroban-testnet.stellar.org';
const NETWORK_PASSPHRASE = Networks.TESTNET;

// Mock state for development
let mockCount = 0;

export async function getContractInstance() {
  if (!CONTRACT_ID || CONTRACT_ID === 'YOUR_CONTRACT_ID_HERE') {
    throw new Error('Contract ID not configured. Please set NEXT_PUBLIC_CONTRACT_ID in your environment variables.');
  }

  return {
    contractId: CONTRACT_ID,
    networkPassphrase: NETWORK_PASSPHRASE,
  };
}

export async function connectWallet() {
  try {
    const response = await getAddress();
    return response.address;
  } catch (error) {
    console.error('Error connecting wallet:', error);
    throw error;
  }
}

export async function getCount() {
  try {
    await getContractInstance();
    // Mock implementation until we fix the SDK integration
    return mockCount;
  } catch (error) {
    if (error instanceof Error && error.message.includes('Contract ID not configured')) {
      console.warn('Contract not deployed yet. Using mock value.');
      return mockCount;
    }
    console.error('Error getting count:', error);
    throw error;
  }
}

export async function increment() {
  try {
    await getContractInstance();
    // Mock implementation until we fix the SDK integration
    mockCount += 1;
    return mockCount;
  } catch (error) {
    console.error('Error incrementing count:', error);
    throw error;
  }
}

export async function decrement() {
  try {
    await getContractInstance();
    // Mock implementation until we fix the SDK integration
    mockCount -= 1;
    return mockCount;
  } catch (error) {
    console.error('Error decrementing count:', error);
    throw error;
  }
} 