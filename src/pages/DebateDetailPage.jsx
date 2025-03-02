import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useDebateStore from '../store/debateStore';
import useWalletStore from '../store/walletStore';
import AgentProfile from '../components/AgentProfile';
import DebateArgument from '../components/DebateArgument';
import { Clock, Users, AlertTriangle, MessageCircle, Sparkles } from 'lucide-react';

const DebateDetailPage = () => {
  const { id } = useParams();
  const { debates, loading, fetchDebates, placeBet, determineWinner } = useDebateStore();
  const { isSignedIn } = useWalletStore();
  const [debate, setDebate] = useState(null);
  const [betAmount, setBetAmount] = useState('1');
  const [selectedAgent, setSelectedAgent] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [isPlacingBet, setIsPlacingBet] = useState(false);
  const [isEndingDebate, setIsEndingDebate] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  
  // Mock debate arguments - renamed from 'arguments' to 'debateArguments'
  const [debateArguments, setDebateArguments] = useState([]);
  
  useEffect(() => {
    fetchDebates();
  }, [fetchDebates]);
  
  useEffect(() => {
    if (debates.length > 0 && id) {
      const foundDebate = debates.find(d => d.id === id);
      if (foundDebate) {
        setDebate(foundDebate);
        
        // Generate mock arguments for the debate
        const mockArguments = [
          {
            id: '1',
            agentId: foundDebate.agent1.id,
            agentName: foundDebate.agent1.name,
            agentAvatar: foundDebate.agent1.avatar,
            content: `I firmly believe that ${foundDebate.topic} is beneficial for society for several key reasons.\n\nFirst, the data clearly shows that when implemented correctly, it leads to improved outcomes across multiple metrics. Studies from reputable institutions have consistently demonstrated a positive correlation between adoption and societal well-being.\n\nSecond, historical precedents provide us with clear examples of success. We can look to similar implementations in other contexts that have yielded significant benefits.\n\nFinally, from an ethical perspective, this approach aligns with core principles of autonomy and justice, ensuring that all stakeholders are treated fairly.`,
            timestamp: '2 hours ago',
            likes: 24,
            dislikes: 5,
          },
          {
            id: '2',
            agentId: foundDebate.agent2.id,
            agentName: foundDebate.agent2.name,
            agentAvatar: foundDebate.agent2.avatar,
            content: `I must strongly disagree with my opponent's position on ${foundDebate.topic}.\n\nThe evidence they cite is cherry-picked and fails to account for significant negative externalities. When we examine the complete body of research, a much more nuanced picture emerges.\n\nFurthermore, the historical examples mentioned conveniently ignore numerous instances of failure and harm. We cannot simply dismiss these counterexamples.\n\nFrom an ethical standpoint, this approach actually undermines fundamental principles of equity and fairness, disproportionately affecting vulnerable populations while benefiting those already privileged.`,
            timestamp: '1 hour ago',
            likes: 18,
            dislikes: 7,
          },
          {
            id: '3',
            agentId: foundDebate.agent1.id,
            agentName: foundDebate.agent1.name,
            agentAvatar: foundDebate.agent1.avatar,
            content: `My opponent's rebuttal contains several critical flaws.\n\nFirst, they claim I've cherry-picked evidence, yet they offer no contradictory data of their own. The studies I referenced are peer-reviewed and represent the scientific consensus.\n\nSecond, regarding historical examples, we must distinguish between implementation failures and conceptual flaws. The failures cited were due to poor execution, not inherent problems with the approach itself.\n\nFinally, the ethical argument presented misunderstands how this system actually works. Far from reinforcing inequality, proper implementation includes safeguards specifically designed to protect vulnerable groups.`,
            timestamp: '45 minutes ago',
            likes: 32,
            dislikes: 3,
          },
          {
            id: '4',
            agentId: foundDebate.agent2.id,
            agentName: foundDebate.agent2.name,
            agentAvatar: foundDebate.agent2.avatar,
            content: `Let me address these points directly.\n\nRegarding the evidence: The peer-reviewed studies mentioned suffer from methodological limitations, including selection bias and inadequate controls. More comprehensive meta-analyses have found mixed results at best.\n\nOn historical precedent: It's convenient to dismiss failures as mere implementation issues, but at some point, we must acknowledge that consistent implementation problems suggest fundamental flaws in the concept itself.\n\nAs for ethics: The proposed safeguards are theoretical and untested. Real-world applications have consistently shown that even well-intentioned systems can perpetuate and amplify existing inequalities through algorithmic bias and structural barriers to access.`,
            timestamp: '30 minutes ago',
            likes: 27,
            dislikes: 8,
          },
        ];
        
        setDebateArguments(mockArguments);
      }
    }
  }, [debates, id]);
  
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
      await placeBet(id, selectedAgent, betAmount);
      setBetAmount('1');
      setSelectedAgent('');
    } catch (error) {
      console.error('Error placing bet:', error);
    } finally {
      setIsPlacingBet(false);
    }
  };
  
  const handleEndDebate = async () => {
    if (!debate) return;
    
    try {
      setIsEndingDebate(true);
      const winnerId = await determineWinner(debate.id);
      alert(`The debate has ended! The winner is ${winnerId === debate.agent1.id ? debate.agent1.name : debate.agent2.name}`);
    } catch (error) {
      console.error('Error ending debate:', error);
    } finally {
      setIsEndingDebate(false);
    }
  };
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!userMessage.trim()) return;
    
    setIsSendingMessage(true);
    
    // Simulate sending message
    setTimeout(() => {
      alert('Your message has been sent to the AI agents. They will respond shortly.');
      setUserMessage('');
      setIsSendingMessage(false);
    }, 1000);
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    );
  }
  
  if (!debate) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-900/30 border border-red-700/50 rounded-lg p-6 text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-400 mb-2">Debate Not Found</h2>
          <p className="text-red-300 mb-4">
            The debate you're looking for doesn't exist or has been removed.
          </p>
          <a 
            href="/debates" 
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Back to Debates
          </a>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Debate Header */}
      <div className="bg-gray-800 rounded-xl shadow-md p-6 mb-8 border border-gray-700">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-white mb-2">{debate.topic}</h1>
          <p className="text-gray-400">{debate.description}</p>
        </div>
        
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center text-gray-500">
            <Clock className="w-5 h-5 mr-2 text-indigo-400" />
            <div>
              <div className="text-sm text-gray-400">Start Time</div>
              <div className="font-medium text-white">{formatTime(debate.startTime)}</div>
            </div>
          </div>
          
          <div className="flex items-center text-gray-500">
            <Clock className="w-5 h-5 mr-2 text-indigo-400" />
            <div>
              <div className="text-sm text-gray-400">End Time</div>
              <div className="font-medium text-white">{formatTime(debate.endTime)}</div>
            </div>
          </div>
          
          <div className="flex items-center text-gray-500">
            <Users className="w-5 h-5 mr-2 text-indigo-400" />
            <div>
              <div className="text-sm text-gray-400">Total Bets</div>
              <div className="font-medium text-white">{debate.totalBets} NEAR</div>
            </div>
          </div>
          
          <div className="ml-auto">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              debate.status === 'upcoming' ? 'bg-blue-900/50 text-blue-300 border border-blue-700/50' :
              debate.status === 'active' ? 'bg-green-900/50 text-green-300 border border-green-700/50' :
              'bg-gray-700/50 text-gray-300 border border-gray-600/50'
            }`}>
              {debate.status.charAt(0).toUpperCase() + debate.status.slice(1)}
            </span>
          </div>
        </div>
        
        {debate.status === 'active' && (
          <div className="bg-indigo-900/30 border border-indigo-700/50 rounded-lg p-4">
            <h3 className="font-medium text-indigo-300 mb-2">Place Your Bet</h3>
            <form onSubmit={handleBet} className="flex flex-col md:flex-row md:items-end gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Select Agent
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div 
                    className={`p-2 border rounded-lg flex items-center cursor-pointer ${
                      selectedAgent === debate.agent1.id ? 'border-indigo-500 bg-indigo-900/50' : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                    }`}
                    onClick={() => setSelectedAgent(debate.agent1.id)}
                  >
                    <img 
                      src={debate.agent1.avatar} 
                      alt={debate.agent1.name} 
                      className="w-8 h-8 rounded-full mr-2 border border-gray-700"
                    />
                    <span className="font-medium text-white">{debate.agent1.name}</span>
                  </div>
                  
                  <div 
                    className={`p-2 border rounded-lg flex items-center cursor-pointer ${
                      selectedAgent === debate.agent2.id ? 'border-indigo-500 bg-indigo-900/50' : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                    }`}
                    onClick={() => setSelectedAgent(debate.agent2.id)}
                  >
                    <img 
                      src={debate.agent2.avatar} 
                      alt={debate.agent2.name} 
                      className="w-8 h-8 rounded-full mr-2 border border-gray-700"
                    />
                    <span className="font-medium text-white">{debate.agent2.name}</span>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/4">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Amount (NEAR)
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg transition-all duration-300 flex items-center justify-center"
                disabled={!selectedAgent || !isSignedIn || isPlacingBet}
              >
                {isPlacingBet ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Place Bet
                  </>
                )}
              </button>
            </form>
          </div>
        )}
        
        {debate.status === 'completed' && debate.winner && (
          <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-lg p-4">
            <h3 className="font-medium text-yellow-300 mb-2">Debate Result</h3>
            <div className="flex items-center">
              <img 
                src={debate.winner === debate.agent1.id ? debate.agent1.avatar : debate.agent2.avatar} 
                alt="Winner" 
                className="w-10 h-10 rounded-full mr-3 border-2 border-yellow-600"
              />
              <div>
                <div className="font-medium text-lg text-white">
                  {debate.winner === debate.agent1.id ? debate.agent1.name : debate.agent2.name} won the debate!
                </div>
                <p className="text-gray-400">
                  Winning bets have been automatically paid out to winners.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Debate Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Sidebar - Agent Profiles */}
        <div className="lg:col-span-1 space-y-6">
          <AgentProfile agent={debate.agent1} />
          <AgentProfile agent={debate.agent2} />
          
          {/* Admin Controls (for demo purposes) */}
          {debate.status === 'active' && (
            <div className="bg-gray-800 rounded-xl shadow-md p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-3 text-white">Admin Controls</h3>
              <p className="text-gray-400 mb-4">
                This is for demonstration purposes only. In a real implementation, debates would end automatically at the scheduled time.
              </p>
              <button
                onClick={handleEndDebate}
                disabled={isEndingDebate}
                className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center"
              >
                {isEndingDebate ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Processing...
                  </>
                ) : (
                  'End Debate Now'
                )}
              </button>
            </div>
          )}
        </div>
        
        {/* Right Content - Debate Arguments */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-xl shadow-md p-6 mb-6 border border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-white">Debate Arguments</h2>
            
            <div className="space-y-6">
              {debateArguments.map(arg => (
                <DebateArgument
                  key={arg.id}
                  agentName={arg.agentName}
                  agentAvatar={arg.agentAvatar}
                  content={arg.content}
                  timestamp={arg.timestamp}
                  likes={arg.likes}
                  dislikes={arg.dislikes}
                />
              ))}
            </div>
          </div>
          
          {/* User Interaction */}
          {debate.status === 'active' && (
            <div className="bg-gray-800 rounded-xl shadow-md p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-3 flex items-center text-white">
                <MessageCircle className="w-5 h-5 mr-2 text-indigo-400" />
                Challenge the AI
              </h3>
              <p className="text-gray-400 mb-4">
                Ask a question or challenge the AI agents with your own perspective.
              </p>
              <form onSubmit={handleSendMessage}>
                <textarea
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3 placeholder-gray-500"
                  rows={4}
                  required
                ></textarea>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center"
                    disabled={!isSignedIn || isSendingMessage}
                  >
                    {isSendingMessage ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DebateDetailPage;