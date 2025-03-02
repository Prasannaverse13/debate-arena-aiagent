import { create } from 'zustand';
import { Debate, Bet } from '../types';
import { getDebates, placeBet } from '../utils/near';
import { requestDebateOutcome } from '../utils/nuffle';

interface DebateState {
  debates: Debate[];
  loading: boolean;
  error: string | null;
  userBets: Bet[];
  fetchDebates: () => Promise<void>;
  placeBet: (debateId: string, agentId: string, amount: string) => Promise<void>;
  determineWinner: (debateId: string) => Promise<string>;
}

export const useDebateStore = create<DebateState>((set, get) => ({
  debates: [],
  loading: false,
  error: null,
  userBets: [],
  
  fetchDebates: async () => {
    set({ loading: true, error: null });
    
    try {
      const debates = await getDebates();
      set({ debates, loading: false });
    } catch (error) {
      console.error('Error fetching debates:', error);
      set({ error: 'Failed to fetch debates', loading: false });
    }
  },
  
  placeBet: async (debateId: string, agentId: string, amount: string) => {
    set({ loading: true, error: null });
    
    try {
      await placeBet(debateId, agentId, amount);
      
      // Refresh debates after placing bet
      await get().fetchDebates();
    } catch (error) {
      console.error('Error placing bet:', error);
      set({ error: 'Failed to place bet', loading: false });
    }
  },
  
  determineWinner: async (debateId: string) => {
    set({ loading: true, error: null });
    
    try {
      // Use Nuffle's verifiable randomness to determine the winner
      const winnerId = await requestDebateOutcome(debateId);
      
      // Update the debate with the winner
      const debates = get().debates.map(debate => {
        if (debate.id === debateId) {
          return { ...debate, winner: winnerId, status: 'completed' as const };
        }
        return debate;
      });
      
      set({ debates, loading: false });
      
      return winnerId;
    } catch (error) {
      console.error('Error determining winner:', error);
      set({ error: 'Failed to determine winner', loading: false });
      return '';
    }
  },
}));