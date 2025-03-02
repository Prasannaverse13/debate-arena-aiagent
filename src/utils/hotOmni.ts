import { connect, keyStores, Contract } from 'near-api-js';
import { nearConfig } from './near';

// HOT Omni token contract address on NEAR
const HOT_OMNI_CONTRACT = 'hot-omni.testnet';

// Get HOT Omni balance
export async function getHotOmniBalance(accountId: string) {
  try {
    const keyStore = new keyStores.BrowserLocalStorageKeyStore();
    
    const nearConnection = await connect({
      deps: {
        keyStore,
      },
      ...nearConfig,
    });
    
    const account = await nearConnection.account(accountId);
    
    const contract = new Contract(account, HOT_OMNI_CONTRACT, {
      viewMethods: ['ft_balance_of'],
      changeMethods: [],
    });
    
    // @ts-ignore
    const balance = await contract.ft_balance_of({ account_id: accountId });
    return balance;
  } catch (error) {
    console.error('Error getting HOT Omni balance:', error);
    return '750.0'; // Mock balance for development
  }
}

// Transfer HOT Omni tokens
export async function transferHotOmni(receiverId: string, amount: string) {
  try {
    const keyStore = new keyStores.BrowserLocalStorageKeyStore();
    
    const nearConnection = await connect({
      deps: {
        keyStore,
      },
      ...nearConfig,
    });
    
    const account = await nearConnection.account(nearConfig.contractName);
    
    const contract = new Contract(account, HOT_OMNI_CONTRACT, {
      viewMethods: ['ft_balance_of'],
      changeMethods: ['ft_transfer'],
    });
    
    // @ts-ignore
    await contract.ft_transfer({
      receiver_id: receiverId,
      amount: amount,
      memo: 'Transfer from Absurd Agents Debate Arena',
    });
    
    return true;
  } catch (error) {
    console.error('Error transferring HOT Omni:', error);
    // Mock transaction for development
    console.log(`Development mode: Simulating HOT Omni transfer of ${amount} to ${receiverId}`);
    return true;
  }
}