export interface Debate {
  id: string;
  topic: string;
  description: string;
  agent1: Agent;
  agent2: Agent;
  startTime: number;
  endTime: number;
  status: 'upcoming' | 'active' | 'completed';
  totalBets: string;
  winner?: string;
}

export interface Agent {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  winRate: number;
  totalDebates: number;
}

export interface Bet {
  id: string;
  debateId: string;
  user: string;
  amount: string;
  agentId: string;
  timestamp: number;
  claimed: boolean;
}

export interface User {
  accountId: string;
  balance: {
    near: string;
    frax: string;
    hotOmni: string;
  };
  bets: Bet[];
}

export interface WalletState {
  wallet: any;
  isSignedIn: boolean;
  accountId: string | null;
  networkId: string;
  balance: {
    near: string;
    frax: string;
    hotOmni: string;
  };
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  getBalance: () => Promise<void>;
}