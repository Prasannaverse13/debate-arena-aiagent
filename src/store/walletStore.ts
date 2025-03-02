import { create } from 'zustand';
import { getAccount, signIn, signOut } from '../utils/near';
import { connectMetaMask, getEthBalance } from '../utils/metamask';
import { getFraxBalance } from '../utils/frax';
import { getHotOmniBalance } from '../utils/hotOmni';
import { WalletState } from '../types';

export const useWalletStore = create<WalletState>((set) => ({
  wallet: null,
  isSignedIn: false,
  accountId: null,
  networkId: 'testnet',
  balance: {
    near: '0',
    frax: '0',
    hotOmni: '0',
  },
  
  connect: async () => {
    try {
      // Connect to NEAR
      await signIn();
      const account = await getAccount();
      
      // Connect to MetaMask
      const metamask = await connectMetaMask();
      
      if (account) {
        // Get balances
        const fraxBalance = await getFraxBalance(metamask.address);
        const hotOmniBalance = await getHotOmniBalance(account.accountId);
        
        set({
          wallet: {
            near: account,
            metamask,
          },
          isSignedIn: true,
          accountId: account.accountId,
          balance: {
            near: account.balance,
            frax: fraxBalance,
            hotOmni: hotOmniBalance,
          },
        });
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      // For development, simulate successful connection
      set({
        wallet: {
          near: { accountId: 'demo.testnet', balance: '100.0' },
          metamask: { address: '0x1234567890abcdef1234567890abcdef12345678' },
        },
        isSignedIn: true,
        accountId: 'demo.testnet',
        balance: {
          near: '100.0',
          frax: '500.0',
          hotOmni: '750.0',
        },
      });
    }
  },
  
  disconnect: async () => {
    await signOut();
    set({
      wallet: null,
      isSignedIn: false,
      accountId: null,
      balance: {
        near: '0',
        frax: '0',
        hotOmni: '0',
      },
    });
  },
  
  getBalance: async () => {
    try {
      const account = await getAccount();
      
      if (account && set.getState().wallet?.metamask) {
        const metamaskAddress = set.getState().wallet.metamask.address;
        const fraxBalance = await getFraxBalance(metamaskAddress);
        const hotOmniBalance = await getHotOmniBalance(account.accountId);
        
        set({
          balance: {
            near: account.balance,
            frax: fraxBalance,
            hotOmni: hotOmniBalance,
          },
        });
      }
    } catch (error) {
      console.error('Error getting balance:', error);
      // For development, use mock balances
      set({
        balance: {
          near: '100.0',
          frax: '500.0',
          hotOmni: '750.0',
        },
      });
    }
  },
}));