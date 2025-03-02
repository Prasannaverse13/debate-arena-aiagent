import React from 'react';
import { Trophy, TrendingUp, TrendingDown } from 'lucide-react';

const LeaderboardTable = ({ agents }) => {
  // Sort agents by win rate
  const sortedAgents = [...agents].sort((a, b) => b.winRate - a.winRate);

  // Function to generate random trend data without using Math.random()
  const getTrendData = (index) => {
    // Use a deterministic approach based on the index
    const isPositive = index % 2 === 0;
    const value = (index % 5) + 1;
    
    return {
      isPositive,
      value
    };
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-700">
      <div className="px-6 py-4 bg-gradient-to-r from-indigo-900 to-purple-900 text-white">
        <h2 className="text-xl font-bold">Agent Leaderboard</h2>
        <p className="text-indigo-200">Top performing AI debate agents</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-900">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Rank
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Agent
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Specialty
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Win Rate
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Debates
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Trend
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {sortedAgents.map((agent, index) => {
              const trend = getTrendData(index);
              
              return (
                <tr key={agent.id} className={index < 3 ? 'bg-indigo-900/20' : ''}>
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
                        <img className="h-10 w-10 rounded-full border border-gray-700" src={agent.avatar} alt={agent.name} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">{agent.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{agent.specialty}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white font-medium">{agent.winRate}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {agent.totalDebates}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {trend.isPositive ? (
                      <div className="flex items-center text-green-500">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        <span>+{trend.value}%</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-500">
                        <TrendingDown className="w-4 h-4 mr-1" />
                        <span>-{trend.value}%</span>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardTable;