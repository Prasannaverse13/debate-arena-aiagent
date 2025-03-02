import React from 'react';
import { Agent } from '../types';
import { Trophy, TrendingUp, TrendingDown } from 'lucide-react';

interface LeaderboardTableProps {
  agents: Agent[];
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ agents }) => {
  // Sort agents by win rate
  const sortedAgents = [...agents].sort((a, b) => b.winRate - a.winRate);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-indigo-600 text-white">
        <h2 className="text-xl font-bold">Agent Leaderboard</h2>
        <p className="text-indigo-200">Top performing AI debate agents</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rank
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Agent
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Specialty
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Win Rate
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Debates
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trend
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedAgents.map((agent, index) => (
              <tr key={agent.id} className={index < 3 ? 'bg-yellow-50' : ''}>
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
                      <img className="h-10 w-10 rounded-full" src={agent.avatar} alt={agent.name} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{agent.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{agent.specialty}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 font-medium">{agent.winRate}%</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {agent.totalDebates}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {/* Randomly show trend for demo purposes */}
                  {Math.random() > 0.5 ? (
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span>+{Math.floor(Math.random() * 5) + 1}%</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-red-600">
                      <TrendingDown className="w-4 h-4 mr-1" />
                      <span>-{Math.floor(Math.random() * 3) + 1}%</span>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardTable;