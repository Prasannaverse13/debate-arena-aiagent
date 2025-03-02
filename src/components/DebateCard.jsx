import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useWalletStore from '../store/walletStore';
import useDebateStore from '../store/debateStore';
import { Clock, Trophy, Users, ArrowRight, Sparkles } from 'lucide-react';

const DebateCard = ({ debate }) => {
  const { isSignedIn } = useWalletStore();
  const { placeBet } = useDebateStore();
  const [betAmount, setBetAmount] = useState('1');
  const [selectedAgent, setSelectedAgent] = useState('');
  const [showBetForm, setShowBetForm] = useState(false);
  const [isPlacingBet, setIsPlacingBet] = useState(false);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const handleBet = async (e) => {
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
      setIsPlacingBet(true);
      await placeBet(debate.id, selectedAgent, betAmount);
      setShowBetForm(false);
      setBetAmount('1');
      setSelectedAgent('');
    } catch (error) {
      console.error('Error placing bet:', error);
    } finally {
      setIsPlacingBet(false);
    }
  };

  const getStatusColor = () => {
    switch (debate.status) {
      case 'upcoming':
        return 'bg-blue-900/50 text-blue-300 border border-blue-700/50';
      case 'active':
        return 'bg-green-900/50 text-green-300 border border-green-700/50';
      case 'completed':
        return 'bg-gray-800/50 text-gray-300 border border-gray-700/50';
      default:
        return 'bg-gray-800/50 text-gray-300 border border-gray-700/50';
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-indigo-500/20 border border-gray-700 hover:border-indigo-500/50 group">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">{debate.topic}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md ${getStatusColor()}`}>
            {debate.status.charAt(0).toUpperCase() + debate.status.slice(1)}
          </span>
        </div>
        
        <p className="text-gray-400 mb-4">{debate.description}</p>
        
        <div className="flex items-center text-gray-500 mb-4">
          <Clock className="w-4 h-4 mr-1 text-indigo-400" />
          <span className="text-sm text-gray-400">{formatTime(debate.startTime)}</span>
        </div>
        
        <div className="flex items-center text-gray-500 mb-6">
          <Users className="w-4 h-4 mr-1 text-indigo-400" />
          <span className="text-sm text-gray-400">Total bets: <span className="text-white font-medium">{debate.totalBets} NEAR</span></span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div 
            className={`p-4 rounded-lg border ${selectedAgent === debate.agent1.id ? 'border-indigo-500 bg-indigo-900/30' : 'border-gray-700 hover:border-gray-600'} transition-colors cursor-pointer`}
            onClick={() => debate.status === 'active' && setSelectedAgent(debate.agent1.id)}
          >
            <div className="flex items-center mb-2">
              <img 
                src={debate.agent1.avatar} 
                alt={debate.agent1.name} 
                className="w-10 h-10 rounded-full mr-2 border border-gray-700"
              />
              <div>
                <h4 className="font-medium text-white">{debate.agent1.name}</h4>
                <p className="text-xs text-gray-400">{debate.agent1.specialty}</p>
              </div>
            </div>
            <div className="flex items-center text-sm">
              <Trophy className="w-3 h-3 mr-1 text-yellow-500" />
              <span className="text-gray-400">Win rate: <span className="text-white font-medium">{debate.agent1.winRate}%</span></span>
            </div>
          </div>
          
          <div 
            className={`p-4 rounded-lg border ${selectedAgent === debate.agent2.id ? 'border-indigo-500 bg-indigo-900/30' : 'border-gray-700 hover:border-gray-600'} transition-colors cursor-pointer`}
            onClick={() => debate.status === 'active' && setSelectedAgent(debate.agent2.id)}
          >
            <div className="flex items-center mb-2">
              <img 
                src={debate.agent2.avatar} 
                alt={debate.agent2.name} 
                className="w-10 h-10 rounded-full mr-2 border border-gray-700"
              />
              <div>
                <h4 className="font-medium text-white">{debate.agent2.name}</h4>
                <p className="text-xs text-gray-400">{debate.agent2.specialty}</p>
              </div>
            </div>
            <div className="flex items-center text-sm">
              <Trophy className="w-3 h-3 mr-1 text-yellow-500" />
              <span className="text-gray-400">Win rate: <span className="text-white font-medium">{debate.agent2.winRate}%</span></span>
            </div>
          </div>
        </div>
        
        {debate.status === 'active' && (
          <div className="flex justify-between">
            <button
              onClick={() => setShowBetForm(!showBetForm)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Place Bet
            </button>
            
            <Link 
              to={`/debates/${debate.id}`}
              className="flex items-center text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              View Details
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        )}
        
        {debate.status === 'completed' && debate.winner && (
          <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-700/50 rounded-lg">
            <h4 className="font-medium text-yellow-300 mb-1">Winner</h4>
            <div className="flex items-center">
              <img 
                src={debate.winner === debate.agent1.id ? debate.agent1.avatar : debate.agent2.avatar} 
                alt="Winner" 
                className="w-8 h-8 rounded-full mr-2 border border-yellow-600"
              />
              <span className="font-medium text-white">
                {debate.winner === debate.agent1.id ? debate.agent1.name : debate.agent2.name}
              </span>
            </div>
          </div>
        )}
        
        {showBetForm && (
          <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <h4 className="font-medium mb-3 text-white">Place your bet</h4>
            <form onSubmit={handleBet}>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Amount (NEAR)
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowBetForm(false)}
                  className="px-4 py-2 border border-gray-700 rounded-md text-gray-300 hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center"
                  disabled={!selectedAgent || isPlacingBet}
                >
                  {isPlacingBet ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    'Confirm Bet'
                  )}
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