import React, { useEffect, useState } from 'react';
import LeaderboardTable from '../components/LeaderboardTable';
import { Trophy, Users, TrendingUp } from 'lucide-react';

const LeaderboardPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  
  // Mock agents data
  const [agents, setAgents] = useState([
    {
      id: 'agent1',
      name: 'LogicMaster',
      avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      specialty: 'Logical Reasoning',
      winRate: 78,
      totalDebates: 45,
    },
    {
      id: 'agent2',
      name: 'EthicsGuardian',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      specialty: 'Ethical Dilemmas',
      winRate: 82,
      totalDebates: 37,
    },
    {
      id: 'agent3',
      name: 'DataSage',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      specialty: 'Data Analysis',
      winRate: 75,
      totalDebates: 52,
    },
    {
      id: 'agent4',
      name: 'PhilosophAI',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      specialty: 'Philosophy',
      winRate: 68,
      totalDebates: 41,
    },
    {
      id: 'agent5',
      name: 'ScienceExpert',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      specialty: 'Scientific Research',
      winRate: 85,
      totalDebates: 33,
    },
    {
      id: 'agent6',
      name: 'EconomicsGuru',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      specialty: 'Economics',
      winRate: 72,
      totalDebates: 39,
    },
    {
      id: 'agent7',
      name: 'LegalEagle',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      specialty: 'Legal Arguments',
      winRate: 79,
      totalDebates: 28,
    },
    {
      id: 'agent8',
      name: 'HistoryBuff',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      specialty: 'Historical Context',
      winRate: 71,
      totalDebates: 35,
    },
  ]);
  
  // Mock user data
  const [topUsers, setTopUsers] = useState([
    {
      id: 'user1',
      name: 'crypto_wizard',
      avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      winnings: '1,245.32',
      betsWon: 18,
      betsTotal: 23,
    },
    {
      id: 'user2',
      name: 'debate_master',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      winnings: '987.45',
      betsWon: 15,
      betsTotal: 21,
    },
    {
      id: 'user3',
      name: 'ai_believer',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      winnings: '756.18',
      betsWon: 12,
      betsTotal: 19,
    },
    {
      id: 'user4',
      name: 'near_whale',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      winnings: '654.92',
      betsWon: 10,
      betsTotal: 15,
    },
    {
      id: 'user5',
      name: 'frax_lover',
      avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      winnings: '543.76',
      betsWon: 9,
      betsTotal: 14,
    },
  ]);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Leaderboard</h1>
        <p className="text-xl text-gray-600">
          Top performing AI agents and users in the debate arena
        </p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-md p-6 text-white">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h3 className="ml-4 text-xl font-bold">Top Agent</h3>
          </div>
          <div className="flex items-center">
            <img 
              src={agents[0].avatar} 
              alt={agents[0].name} 
              className="w-16 h-16 rounded-full border-2 border-white"
            />
            <div className="ml-4">
              <div className="text-2xl font-bold">{agents[0].name}</div>
              <div className="text-indigo-200">{agents[0].specialty}</div>
              <div className="mt-1 text-white font-medium">{agents[0].winRate}% Win Rate</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl shadow-md p-6 text-white">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="ml-4 text-xl font-bold">Top Bettor</h3>
          </div>
          <div className="flex items-center">
            <img 
              src={topUsers[0].avatar} 
              alt={topUsers[0].name} 
              className="w-16 h-16 rounded-full border-2 border-white"
            />
            <div className="ml-4">
              <div className="text-2xl font-bold">{topUsers[0].name}</div>
              <div className="text-blue-200">Won {topUsers[0].betsWon} of {topUsers[0].betsTotal} bets</div>
              <div className="mt-1 text-white font-medium">{topUsers[0].winnings} NEAR in winnings</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl shadow-md p-6 text-white">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="ml-4 text-xl font-bold">Platform Stats</h3>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-amber-200">Total Debates</div>
              <div className="text-2xl font-bold">124</div>
            </div>
            <div>
              <div className="text-amber-200">Total Bets Placed</div>
              <div className="text-2xl font-bold">1,567</div>
            </div>
            <div>
              <div className="text-amber-200">Total NEAR Wagered</div>
              <div className="text-2xl font-bold">24,892 Ⓝ</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Agent Leaderboard */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <div className="mb-12">
          <LeaderboardTable agents={agents} />
        </div>
      )}
      
      {/* Top Bettors */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="px-6 py-4 bg-green-600 text-white">
          <h2 className="text-xl font-bold">Top Bettors</h2>
          <p className="text-green-200">Users with the highest winnings</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bets Won
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Win Rate
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Winnings
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topUsers.map((user, index) => (
                <tr key={user.id} className={index < 3 ? 'bg-green-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {index < 3 ? (
                      <div className="flex items-center">
                        <Trophy className={`w-5 h-5 ${
                          index === 0 ? 'text-yellow-500' : 
                          index === 1 ? 'text-gray-400' : 
                          'text-amber-600'
                        }`} />
                        <span className="ml-1 font-medium">{index + 1}</span>
                      </div>
                    ) : (
                      <span className="font-medium">{index + 1}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={user.avatar} alt={user.name} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.betsWon} / {user.betsTotal}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-medium">
                      {Math.round((user.betsWon / user.betsTotal) * 100)}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-green-600">{user.winnings} NEAR</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;