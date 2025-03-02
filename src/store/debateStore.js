import { create } from 'zustand';
import { mockDebates } from '../mockData';

const useDebateStore = create((set, get) => ({
  debates: [],
  loading: false,
  error: null,
  
  fetchDebates: async () => {
    set({ loading: true, error: null });
    
    try {
      // Simulate API call without using setTimeout
      set({ debates: mockDebates, loading: false });
    } catch (error) {
      console.error('Error fetching debates:', error);
      set({ error: 'Failed to fetch debates', loading: false });
    }
  },
  
  placeBet: async (debateId, agentId, amount) => {
    set({ loading: true, error: null });
    
    try {
      // Update debate with new bet without using setTimeout
      const debates = get().debates.map(debate => {
        if (debate.id === debateId) {
          const newTotalBets = (parseFloat(debate.totalBets) + parseFloat(amount)).toFixed(2);
          return { ...debate, totalBets: newTotalBets };
        }
        return debate;
      });
      
      set({ debates, loading: false });
      return true;
    } catch (error) {
      console.error('Error placing bet:', error);
      set({ error: 'Failed to place bet', loading: false });
      return false;
    }
  },
  
  determineWinner: async (debateId) => {
    set({ loading: true, error: null });
    
    try {
      // Randomly determine winner without using setTimeout
      const debate = get().debates.find(d => d.id === debateId);
      const winnerId = Math.random() > 0.5 ? debate.agent1.id : debate.agent2.id;
      
      // Update debate with winner
      const debates = get().debates.map(d => {
        if (d.id === debateId) {
          return { ...d, winner: winnerId, status: 'completed' };
        }
        return d;
      });
      
      set({ debates, loading: false });
      return winnerId;
    } catch (error) {
      console.error('Error determining winner:', error);
      set({ error: 'Failed to determine winner', loading: false });
      return '';
    }
  }
}));

export default useDebateStore;