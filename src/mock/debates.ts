import { Debate } from '../types';

// Mock data for debates
export const mockDebates: Debate[] = [
  {
    id: 'debate1',
    topic: 'Should DeFi protocols implement KYC requirements?',
    description: 'Decentralized Finance has grown exponentially, but regulatory concerns are mounting. Should DeFi protocols implement Know Your Customer requirements, or would this undermine the core principles of decentralization?',
    agent1: {
      id: 'agent1',
      name: 'LogicMaster',
      avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      specialty: 'Logical Reasoning',
      winRate: 78,
      totalDebates: 45,
    },
    agent2: {
      id: 'agent2',
      name: 'EthicsGuardian',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      specialty: 'Ethical Dilemmas',
      winRate: 82,
      totalDebates: 37,
    },
    startTime: Date.now() - 3600000, // 1 hour ago
    endTime: Date.now() + 3600000, // 1 hour from now
    status: 'active',
    totalBets: '245.75',
  },
  {
    id: 'debate2',
    topic: 'Are DAOs more effective than traditional organizations?',
    description: 'Decentralized Autonomous Organizations represent a new paradigm in organizational structure. But are they truly more effective than traditional hierarchical organizations for achieving complex goals?',
    agent1: {
      id: 'agent3',
      name: 'DataSage',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      specialty: 'Data Analysis',
      winRate: 75,
      totalDebates: 52,
    },
    agent2: {
      id: 'agent4',
      name: 'PhilosophAI',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      specialty: 'Philosophy',
      winRate: 68,
      totalDebates: 41,
    },
    startTime: Date.now() + 86400000, // 1 day from now
    endTime: Date.now() + 90000000, // 25 hours from now
    status: 'upcoming',
    totalBets: '120.50',
  },
  {
    id: 'debate3',
    topic: 'Will NFTs revolutionize digital ownership?',
    description: 'Non-Fungible Tokens have created new possibilities for digital ownership and provenance. Are they a passing fad or will they fundamentally change how we think about ownership in the digital realm?',
    agent1: {
      id: 'agent5',
      name: 'ScienceExpert',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      specialty: 'Scientific Research',
      winRate: 85,
      totalDebates: 33,
    },
    agent2: {
      id: 'agent6',
      name: 'EconomicsGuru',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      specialty: 'Economics',
      winRate: 72,
      totalDebates: 39,
    },
    startTime: Date.now() - 172800000, // 2 days ago
    endTime: Date.now() - 86400000, // 1 day ago
    status: 'completed',
    totalBets: '350.25',
    winner: 'agent5',
  },
  {
    id: 'debate4',
    topic: 'Is proof-of-stake more sustainable than proof-of-work?',
    description: 'Blockchain consensus mechanisms have significant environmental implications. Does proof-of-stake truly solve the energy consumption issues of proof-of-work, or does it introduce new problems?',
    agent1: {
      id: 'agent7',
      name: 'LegalEagle',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      specialty: 'Legal Arguments',
      winRate: 79,
      totalDebates: 28,
    },
    agent2: {
      id: 'agent8',
      name: 'HistoryBuff',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      specialty: 'Historical Context',
      winRate: 71,
      totalDebates: 35,
    },
    startTime: Date.now() + 259200000, // 3 days from now
    endTime: Date.now() + 345600000, // 4 days from now
    status: 'upcoming',
    totalBets: '0',
  },
  {
    id: 'debate5',
    topic: 'Should algorithmic stablecoins be regulated?',
    description: 'After the collapse of several algorithmic stablecoin projects, the debate about regulation has intensified. Is regulation necessary to protect users, or would it stifle innovation in this emerging field?',
    agent1: {
      id: 'agent1',
      name: 'LogicMaster',
      avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      specialty: 'Logical Reasoning',
      winRate: 78,
      totalDebates: 45,
    },
    agent2: {
      id: 'agent6',
      name: 'EconomicsGuru',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      specialty: 'Economics',
      winRate: 72,
      totalDebates: 39,
    },
    startTime: Date.now() - 7200000, // 2 hours ago
    endTime: Date.now() + 7200000, // 2 hours from now
    status: 'active',
    totalBets: '178.50',
  },
  {
    id: 'debate6',
    topic: 'Will Web3 replace Web2?',
    description: 'The vision of a decentralized internet powered by blockchain technology has gained significant attention. Is Web3 poised to replace the current centralized Web2 paradigm, or will they coexist?',
    agent1: {
      id: 'agent4',
      name: 'PhilosophAI',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      specialty: 'Philosophy',
      winRate: 68,
      totalDebates: 41,
    },
    agent2: {
      id: 'agent3',
      name: 'DataSage',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      specialty: 'Data Analysis',
      winRate: 75,
      totalDebates: 52,
    },
    startTime: Date.now() - 259200000, // 3 days ago
    endTime: Date.now() - 172800000, // 2 days ago
    status: 'completed',
    totalBets: '420.75',
    winner: 'agent3',
  }
];