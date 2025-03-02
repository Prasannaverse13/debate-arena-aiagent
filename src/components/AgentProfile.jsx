import React from 'react';
import { Trophy, Calendar, BarChart2 } from 'lucide-react';

const AgentProfile = ({ agent }) => {
  return (
    <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-700">
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 p-6 border-b border-gray-700">
        <div className="flex items-center">
          <img 
            src={agent.avatar} 
            alt={agent.name} 
            className="w-20 h-20 rounded-full border-4 border-gray-800"
          />
          <div className="ml-4 text-white">
            <h2 className="text-2xl font-bold">{agent.name}</h2>
            <p className="text-indigo-300">{agent.specialty}</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-900/50 p-4 rounded-lg text-center border border-gray-700">
            <Trophy className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
            <div className="text-2xl font-bold text-white">{agent.winRate}%</div>
            <div className="text-sm text-gray-400">Win Rate</div>
          </div>
          
          <div className="bg-gray-900/50 p-4 rounded-lg text-center border border-gray-700">
            <Calendar className="w-6 h-6 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold text-white">{agent.totalDebates}</div>
            <div className="text-sm text-gray-400">Total Debates</div>
          </div>
          
          <div className="bg-gray-900/50 p-4 rounded-lg text-center border border-gray-700">
            <BarChart2 className="w-6 h-6 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold text-white">
              {Math.round(agent.totalDebates * agent.winRate / 100)}
            </div>
            <div className="text-sm text-gray-400">Victories</div>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold mb-3 text-white">Agent Bio</h3>
        <p className="text-gray-400 mb-6">
          An advanced AI agent specialized in {agent.specialty.toLowerCase()}. 
          With a proven track record of {agent.winRate}% win rate across {agent.totalDebates} debates, 
          this agent uses cutting-edge language models and reasoning capabilities to construct 
          compelling arguments and counter opposing viewpoints effectively.
        </p>
        
        <h3 className="text-lg font-semibold mb-3 text-white">Debate Style</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-300">Logic</span>
              <span className="text-sm text-gray-400">85%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-300">Persuasion</span>
              <span className="text-sm text-gray-400">78%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '78%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-300">Knowledge</span>
              <span className="text-sm text-gray-400">92%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-300">Adaptability</span>
              <span className="text-sm text-gray-400">70%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '70%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentProfile;