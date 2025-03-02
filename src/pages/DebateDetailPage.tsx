import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDebateStore } from '../store/debateStore';
import { useWalletStore } from '../store/walletStore';
import AgentProfile from '../components/AgentProfile';
import DebateArgument from '../components/DebateArgument';
import { Clock, Users, AlertTriangle, MessageCircle } from 'lucide-react';

const DebateDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { debates, loading, fetchDebates, placeBet, determineWinner } = useDebateStore();
  const { isSignedIn } = useWalletStore();
  const [debate, setDebate] = useState<any>(null);
  const [betAmount, setBetAmount] = useState('1');
  const [selectedAgent, setSelectedAgent] = useState('');
  const [userMessage, setUserMessage] = useState('');
  
  // Mock debate arguments
  const [arguments, setArguments] = useState<any[]>([]);
  
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
        
        setArguments(mockArguments);
      }
    }
  }, [debates, id]);
  
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
      await placeBet(id!, selectedAgent, betAmount);
      setBetAmount('1');
      setSelectedAgent('');
    } catch (error) {
      console.error('Error placing bet:', error);
    }
  };
  
  const handleEndDebate = async () => {
    if (!debate) return;
    
    try {
      const winnerId = await determineWinner(debate.id);
      alert(`The debate has ended! The winner is ${winnerId === debate.agent1.id ? debate.agent1.name : debate.agent2.name}`);
    } catch (error) {
      console.error('Error ending debate:', error);
    }
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userMessage.trim()) return;
    
    alert('In a real implementation, this would send your message to the AI agents to respond to.');
    setUserMessage('');
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
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-800 mb-2">Debate Not Found</h2>
          <p className="text-red-600 mb-4">
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
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{debate.topic}</h1>
          <p className="text-gray-600">{debate.description}</p>
        </div>
        
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center text-gray-500">
            <Clock className="w-5 h-5 mr-2" />
            <div>
              <div className="text-sm">Start Time</div>
              <div className="font-medium">{formatTime(debate.startTime)}</div>
            </div>
          </div>
          
          <div className="flex items-center text-gray-500">
            <Clock className="w-5 h-5 mr-2" />
            <div>
              <div className="text-sm">End Time</div>
              <div className="font-medium">{formatTime(debate.endTime)}</div>
            </div>
          </div>
          
          <div className="flex items-center text-gray-500">
            <Users className="w-5 h-5 mr-2" />
            <div>
              <div className="text-sm">Total Bets</div>
              <div className="font-medium">{debate.totalBets} NEAR</div>
            </div>
          </div>
          
          <div className="ml-auto">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              debate.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
              debate.status === 'active' ? 'bg-green-100 text-green-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {debate.status.charAt(0).toUpperCase() + debate.status.slice(1)}
            </span>
          </div>
        </div>
        
        {debate.status === 'active' && (
          <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
            <h3 className="font-medium text-indigo-800 mb-2">Place Your Bet</h3>
            <form onSubmit={handleBet} className="flex flex-col md:flex-row md:items-end gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Agent
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div 
                    className={`p-2 border rounded-lg flex items-center cursor-pointer ${
                      selectedAgent === debate.agent1.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'
                    }`}
                    onClick={() => setSelectedAgent(debate.agent1.id)}
                  >
                    <img 
                      src={debate.agent1.avatar} 
                      alt={debate.agent1.name} 
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <span className="font-medium">{debate.agent1.name}</span>
                  </div>
                  
                  <div 
                    className={`p-2 border rounded-lg flex items-center cursor-pointer ${
                      selectedAgent === debate.agent2.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'
                    }`}
                    onClick={() => setSelectedAgent(debate.agent2.id)}
                  >
                    <img 
                      src={debate.agent2.avatar} 
                      alt={debate.agent2.name} 
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <span className="font-medium">{debate.agent2.name}</span>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/4">
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
              
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
                disabled={!selectedAgent || !isSignedIn}
              >
                Place Bet
              </button>
            </form>
          </div>
        )}
        
        {debate.status === 'completed' && debate.winner && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-medium text-yellow-800 mb-2">Debate Result</h3>
            <div className="flex items-center">
              <img 
                src={debate.winner === debate.agent1.id ? debate.agent1.avatar : debate.agent2.avatar} 
                alt="Winner" 
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <div className="font-medium text-lg">
                  {debate.winner === debate.agent1.id ? debate.agent1.name : debate.agent2.name} won the debate!
                </div>
                <p className="text-gray-600">
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
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-3">Admin Controls</h3>
              <p className="text-gray-600 mb-4">
                This is for demonstration purposes only. In a real implementation, debates would end automatically at the scheduled time.
              </p>
              <button
                onClick={handleEndDebate}
                className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                End Debate Now
              </button>
            </div>
          )}
        </div>
        
        {/* Right Content - Debate Arguments */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Debate Arguments</h2>
            
            <div className="space-y-6">
              {arguments.map(arg => (
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
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 text-indigo-600" />
                Challenge the AI
              </h3>
              <p className="text-gray-600 mb-4">
                Ask a question or challenge the AI agents with your own perspective.
              </p>
              <form onSubmit={handleSendMessage}>
                <textarea
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3"
                  rows={4}
                  required
                ></textarea>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
                    disabled={!isSignedIn}
                  >
                    Send Message
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