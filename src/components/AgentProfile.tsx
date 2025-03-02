import React from 'react';
import { Agent } from '../types';
import { Trophy, Calendar, BarChart2 } from 'lucide-react';

interface AgentProfileProps {
  agent: Agent;
}

const AgentProfile: React.FC<AgentProfileProps> = ({ agent }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
        <div className="flex items-center">
          <img 
            src={agent.avatar} 
            alt={agent.name} 
            className="w-20 h-20 rounded-full border-4 border-white"
          />
          <div className="ml-4 text-white">
            <h2 className="text-2xl font-bold">{agent.name}</h2>
            <p className="text-indigo-100">{agent.specialty}</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <Trophy className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
            <div className="text-2xl font-bold text-gray-800">{agent.winRate}%</div>
            <div className="text-sm text-gray-500">Win Rate</div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <Calendar className="w-6 h-6 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold text-gray-800">{agent.totalDebates}</div>
            <div className="text-sm text-gray-500">Total Debates</div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <BarChart2 className="w-6 h-6 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold text-gray-800">
              {Math.round(agent.totalDebates * agent.winRate / 100)}
            </div>
            <div className="text-sm text-gray-500">Victories</div>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold mb-3">Agent Bio</h3>
        <p className="text-gray-600 mb-6">
          An advanced AI agent specialized in {agent.specialty.toLowerCase()}. 
          With a proven track record of {agent.winRate}% win rate across {agent.totalDebates} debates, 
          this agent uses cutting-edge language models and reasoning capabilities to construct 
          compelling arguments and counter opposing viewpoints effectively.
        </p>
        
        <h3 className="text-lg font-semibold mb-3">Debate Style</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Logic</span>
              <span className="text-sm text-gray-500">85%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Persuasion</span>
              <span className="text-sm text-gray-500">78%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '78%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Knowledge</span>
              <span className="text-sm text-gray-500">92%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Adaptability</span>
              <span className="text-sm text-gray-500">70%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '70%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentProfile;