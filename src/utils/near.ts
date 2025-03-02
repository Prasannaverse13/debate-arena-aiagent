import { connect, keyStores, WalletConnection, Contract, utils } from 'near-api-js';
import { mockDebates } from '../mock/debates';

// Configuration for connecting to NEAR
export const nearConfig = {
  networkId: 'testnet',
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org',
  explorerUrl: 'https://explorer.testnet.near.org',
  indexerUrl: 'https://api.kitwallet.app',
  contractName: 'debate-arena.testnet',
  apiKey: 'FD0AC079D58448F38EA347A371C29F10',
};

// Initialize connection to the NEAR blockchain
export async function initNear() {
  const keyStore = new keyStores.BrowserLocalStorageKeyStore();
  
  const nearConnection = await connect({
    deps: {
      keyStore,
    },
    ...nearConfig,
  });
  
  const walletConnection = new WalletConnection(nearConnection, 'absurd-agents-debate-arena');
  
  return { nearConnection, walletConnection };
}

// Get account details if user is signed in
export async function getAccount() {
  try {
    const { walletConnection } = await initNear();
    
    if (!walletConnection.isSignedIn()) {
      return null;
    }
    
    const account = walletConnection.account();
    const balance = await account.getAccountBalance();
    
    return {
      accountId: account.accountId,
      balance: utils.format.formatNearAmount(balance.available),
    };
  } catch (error) {
    console.error("Error getting account:", error);
    // Return mock data for development
    return {
      accountId: 'demo.testnet',
      balance: '100.00',
    };
  }
}

// Sign in with NEAR
export async function signIn() {
  try {
    const { walletConnection } = await initNear();
    
    if (!walletConnection.isSignedIn()) {
      walletConnection.requestSignIn({
        contractId: nearConfig.contractName,
        methodNames: ['place_bet', 'claim_winnings', 'create_debate'],
      });
    }
  } catch (error) {
    console.error("Error signing in:", error);
    // For development, simulate successful sign-in
    console.log("Development mode: Simulating successful sign-in");
  }
}

// Sign out from NEAR
export async function signOut() {
  try {
    const { walletConnection } = await initNear();
    
    if (walletConnection.isSignedIn()) {
      walletConnection.signOut();
      window.location.reload();
    }
  } catch (error) {
    console.error("Error signing out:", error);
    // For development, simulate successful sign-out
    console.log("Development mode: Simulating successful sign-out");
    window.location.reload();
  }
}

// Get debates from the contract
export async function getDebates() {
  try {
    const { walletConnection } = await initNear();
    const account = walletConnection.account();
    
    const contract = new Contract(account, nearConfig.contractName, {
      viewMethods: ['get_debates', 'get_debate', 'get_user_bets'],
      changeMethods: ['place_bet', 'claim_winnings', 'create_debate'],
    });
    
    // @ts-ignore
    return await contract.get_debates();
  } catch (error) {
    console.error("Error getting debates:", error);
    // Return mock data for development
    return mockDebates;
  }
}

// Place a bet on a debate
export async function placeBet(debateId: string, agentId: string, amount: string) {
  try {
    const { walletConnection } = await initNear();
    
    if (!walletConnection.isSignedIn()) {
      await signIn();
      return;
    }
    
    const account = walletConnection.account();
    
    const contract = new Contract(account, nearConfig.contractName, {
      viewMethods: ['get_debates', 'get_debate', 'get_user_bets'],
      changeMethods: ['place_bet', 'claim_winnings', 'create_debate'],
    });
    
    const amountInYoctoNear = utils.format.parseNearAmount(amount);
    
    // @ts-ignore
    return await contract.place_bet({
      debate_id: debateId,
      agent_id: agentId,
      args: {},
      amount: amountInYoctoNear,
      gas: '300000000000000',
    });
  } catch (error) {
    console.error("Error placing bet:", error);
    // For development, simulate successful bet
    console.log(`Development mode: Simulating successful bet of ${amount} NEAR on agent ${agentId} in debate ${debateId}`);
    return true;
  }
}

// Fetch data from NEAR Indexer
export async function fetchFromIndexer(path: string) {
  try {
    const response = await fetch(`${nearConfig.indexerUrl}/${path}`, {
      headers: {
        'X-API-KEY': nearConfig.apiKey,
      },
    });
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching from indexer:", error);
    // Return mock data for development
    return { success: true, data: [] };
  }
}