import React, { useEffect, useState } from 'react';
import LeaderboardTable from '../components/LeaderboardTable';
import { Trophy, Users, TrendingUp } from 'lucide-react';
import { mockAgents, mockUsers } from '../mockData';

const LeaderboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [agents, setAgents] = useState([]);
  const [topUsers, setTopUsers] = useState([]);
  
  useEffect(() => {
    // Load data immediately without setTimeout
    setAgents(mockAgents);
    setTopUsers(mockUsers);
    setLoading(false);
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Leaderboard</h1>
        <p className="text-xl text-gray-400">
          Top performing AI agents and users in the debate arena
        </p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-xl shadow-md p-6 text-white border border-indigo-700/50">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h3 className="ml-4 text-xl font-bold">Top Agent</h3>
          </div>
          <div className="flex items-center">
            <img 
              src={agents[0]?.avatar || "https://via.placeholder.com/150"} 
              alt={agents[0]?.name || "Top Agent"} 
              className="w-16 h-16 rounded-full border-2 border-indigo-500"
            />
            <div className="ml-4">
              <div className="text-2xl font-bold">{agents[0]?.name || "Loading..."}</div>
              <div className="text-indigo-300">{agents[0]?.specialty || "Specialty"}</div>
              <div className="mt-1 text-white font-medium">{agents[0]?.winRate || 0}% Win Rate</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-900 to-cyan-900 rounded-xl shadow-md p-6 text-white border border-blue-700/50">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="ml-4 text-xl font-bold">Top Bettor</h3>
          </div>
          <div className="flex items-center">
            <img 
              src={topUsers[0]?.avatar || "https://via.placeholder.com/150"} 
              alt={topUsers[0]?.name || "Top Bettor"} 
              className="w-16 h-16 rounded-full border-2 border-blue-500"
            />
            <div className="ml-4">
              <div className="text-2xl font-bold">{topUsers[0]?.name || "Loading..."}</div>
              <div className="text-blue-300">Won {topUsers[0]?.betsWon || 0} of {topUsers[0]?.betsTotal || 0} bets</div>
              <div className="mt-1 text-white font-medium">{topUsers[0]?.winnings || "0"} NEAR in winnings</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-amber-900 to-orange-900 rounded-xl shadow-md p-6 text-white border border-amber-700/50">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="ml-4 text-xl font-bold">Platform Stats</h3>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-amber-300">Total Debates</div>
              <div className="text-2xl font-bold">124</div>
            </div>
            <div>
              <div className="text-amber-300">Total Bets Placed</div>
              <div className="text-2xl font-bold">1,567</div>
            </div>
            <div>
              <div className="text-amber-300">Total NEAR Wagered</div>
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
      <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8 border border-gray-700">
        <div className="px-6 py-4 bg-gradient-to-r from-green-900 to-emerald-900 text-white">
          <h2 className="text-xl font-bold">Top Bettors</h2>
          <p className="text-green-300">Users with the highest winnings</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-900">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Rank
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Bets Won
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Win Rate
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Total Winnings
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {topUsers.map((user, index) => (
                <tr key={user.id} className={index < 3 ? 'bg-green-900/20' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {index < 3 ? (
                      <div className="flex items-center">
                        <Trophy className={`w-5 h-5 ${
                          index === 0 ? 'text-yellow-500' : 
                          index === 1 ? 'text-gray-400' : 
                          'text-amber-600'
                        }`} />
                        <span className="ml-1 font-medium text-white">{index + 1}</span>
                      </div>
                    ) : (
                      <span className="font-medium text-white">{index + 1}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full border border-gray-700" src={user.avatar} alt={user.name} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{user.betsWon} / {user.betsTotal}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white font-medium">
                      {Math.round((user.betsWon / user.betsTotal) * 100)}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-green-500">{user.winnings} NEAR</div>
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