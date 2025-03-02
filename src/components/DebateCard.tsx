import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWalletStore } from '../store/walletStore';
import { useDebateStore } from '../store/debateStore';
import { Debate } from '../types';
import { Clock, Trophy, Users, ArrowRight } from 'lucide-react';

interface DebateCardProps {
  debate: Debate;
}

const DebateCard: React.FC<DebateCardProps> = ({ debate }) => {
  const { isSignedIn } = useWalletStore();
  const { placeBet } = useDebateStore();
  const [betAmount, setBetAmount] = useState('1');
  const [selectedAgent, setSelectedAgent] = useState('');
  const [showBetForm, setShowBetForm] = useState(false);

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const handleBet = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isSignedIn) {
      alert('Please connect your wallet first');
      return;
    }
    
    if (!selectedAgent) {
      alert('Please select an agent to bet on');
      return;
    }
    
    try {
      await placeBet(debate.id, selectedAgent, betAmount);
      setShowBetForm(false);
      setBetAmount('1');
      setSelectedAgent('');
    } catch (error) {
      console.error('Error placing bet:', error);
    }
  };

  const getStatusColor = () => {
    switch (debate.status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:shadow-lg">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{debate.topic}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
            {debate.status.charAt(0).toUpperCase() + debate.status.slice(1)}
          </span>
        </div>
        
        <p className="text-gray-600 mb-4">{debate.description}</p>
        
        <div className="flex items-center text-gray-500 mb-4">
          <Clock className="w-4 h-4 mr-1" />
          <span className="text-sm">{formatTime(debate.startTime)}</span>
        </div>
        
        <div className="flex items-center text-gray-500 mb-6">
          <Users className="w-4 h-4 mr-1" />
          <span className="text-sm">Total bets: {debate.totalBets} NEAR</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div 
            className={`p-4 rounded-lg border ${selectedAgent === debate.agent1.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'}`}
            onClick={() => debate.status === 'active' && setSelectedAgent(debate.agent1.id)}
          >
            <div className="flex items-center mb-2">
              <img 
                src={debate.agent1.avatar} 
                alt={debate.agent1.name} 
                className="w-10 h-10 rounded-full mr-2"
              />
              <div>
                <h4 className="font-medium">{debate.agent1.name}</h4>
                <p className="text-xs text-gray-500">{debate.agent1.specialty}</p>
              </div>
            </div>
            <div className="flex items-center text-sm">
              <Trophy className="w-3 h-3 mr-1 text-yellow-500" />
              <span>Win rate: {debate.agent1.winRate}%</span>
            </div>
          </div>
          
          <div 
            className={`p-4 rounded-lg border ${selectedAgent === debate.agent2.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'}`}
            onClick={() => debate.status === 'active' && setSelectedAgent(debate.agent2.id)}
          >
            <div className="flex items-center mb-2">
              <img 
                src={debate.agent2.avatar} 
                alt={debate.agent2.name} 
                className="w-10 h-10 rounded-full mr-2"
              />
              <div>
                <h4 className="font-medium">{debate.agent2.name}</h4>
                <p className="text-xs text-gray-500">{debate.agent2.specialty}</p>
              </div>
            </div>
            <div className="flex items-center text-sm">
              <Trophy className="w-3 h-3 mr-1 text-yellow-500" />
              <span>Win rate: {debate.agent2.winRate}%</span>
            </div>
          </div>
        </div>
        
        {debate.status === 'active' && (
          <div className="flex justify-between">
            <button
              onClick={() => setShowBetForm(!showBetForm)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Place Bet
            </button>
            
            <Link 
              to={`/debates/${debate.id}`}
              className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              View Details
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        )}
        
        {debate.status === 'completed' && debate.winner && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-medium text-yellow-800 mb-1">Winner</h4>
            <div className="flex items-center">
              <img 
                src={debate.winner === debate.agent1.id ? debate.agent1.avatar : debate.agent2.avatar} 
                alt="Winner" 
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="font-medium">
                {debate.winner === debate.agent1.id ? debate.agent1.name : debate.agent2.name}
              </span>
            </div>
          </div>
        )}
        
        {showBetForm && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-3">Place your bet</h4>
            <form onSubmit={handleBet}>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount (NEAR)
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowBetForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                  disabled={!selectedAgent}
                >
                  Confirm Bet
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default DebateCard;