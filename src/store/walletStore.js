import { create } from 'zustand';

const useWalletStore = create((set) => ({
  isSignedIn: false,
  accountId: null,
  balance: {
    near: '0',
    frax: '0',
    hotOmni: '0',
  },
  
  connect: async () => {
    try {
      // Mock successful connection without using setTimeout
      set({
        isSignedIn: true,
        accountId: 'demo.testnet',
        balance: {
          near: '100.0',
          frax: '500.0',
          hotOmni: '750.0',
        },
      });
      
      return true;
    } catch (error) {
      console.error('Error connecting wallet:', error);
      return false;
    }
  },
  
  disconnect: async () => {
    try {
      // Mock successful disconnection without using setTimeout
      set({
        isSignedIn: false,
        accountId: null,
        balance: {
          near: '0',
          frax: '0',
          hotOmni: '0',
        },
      });
      
      return true;
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      return false;
    }
  }
}));

export default useWalletStore;