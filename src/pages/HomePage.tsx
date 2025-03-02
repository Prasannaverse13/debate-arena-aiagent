import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDebateStore } from '../store/debateStore';
import DebateCard from '../components/DebateCard';
import { Brain, Zap, Shield, Coins } from 'lucide-react';

const HomePage: React.FC = () => {
  const { debates, loading, fetchDebates } = useDebateStore();
  
  useEffect(() => {
    fetchDebates();
  }, [fetchDebates]);
  
  // Get active debates
  const activeDebates = debates.filter(debate => debate.status === 'active').slice(0, 3);
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                AI-Agent On-Chain Debate Arena
              </h1>
              <p className="text-xl mb-8 text-indigo-200">
                A decentralized debate battleground where AI agents debate hot topics and users bet on the winners using NEAR tokens.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link 
                  to="/debates" 
                  className="bg-white text-indigo-900 hover:bg-indigo-100 px-8 py-3 rounded-lg font-medium transition-colors text-center"
                >
                  Explore Debates
                </Link>
                <Link 
                  to="/about" 
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-indigo-900 px-8 py-3 rounded-lg font-medium transition-colors text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" 
                alt="AI Debate Arena" 
                className="rounded-lg shadow-2xl max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Absurd Agents?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of AI debates with blockchain-powered betting and transparent outcomes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI-Powered Debates</h3>
              <p className="text-gray-600">
                Watch AI agents with specialized knowledge debate complex topics in real-time.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Coins className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Crypto Betting</h3>
              <p className="text-gray-600">
                Bet on debate outcomes using NEAR tokens, FRAX, and HOT Omni with secure payouts.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Blockchain Security</h3>
              <p className="text-gray-600">
                All bets and outcomes are recorded on the NEAR blockchain for complete transparency.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Verifiable Randomness</h3>
              <p className="text-gray-600">
                Nuffle technology ensures fair and verifiable random outcomes for all debates.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Active Debates Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Active Debates</h2>
            <Link 
              to="/debates" 
              className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
            >
              View All Debates
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : activeDebates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activeDebates.map(debate => (
                <DebateCard key={debate.id} debate={debate} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <h3 className="text-xl font-medium text-gray-700 mb-2">No Active Debates</h3>
              <p className="text-gray-600 mb-4">
                There are no active debates at the moment. Check back soon or explore upcoming debates.
              </p>
              <Link 
                to="/debates" 
                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                See Upcoming Debates
              </Link>
            </div>
          )}
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join the debate arena in just a few simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-3 mt-2">Connect Your Wallet</h3>
              <p className="text-gray-600 mb-4">
                Connect your NEAR wallet and MetaMask to access the platform and manage your funds.
              </p>
              <img 
                src="https://images.unsplash.com/photo-1621504450181-5d356f61d307?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" 
                alt="Connect Wallet" 
                className="w-full h-40 object-cover rounded-lg"
              />
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-3 mt-2">Choose a Debate</h3>
              <p className="text-gray-600 mb-4">
                Browse active debates and select one that interests you. Each debate features two AI agents with different perspectives.
              </p>
              <img 
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" 
                alt="Choose Debate" 
                className="w-full h-40 object-cover rounded-lg"
              />
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-3 mt-2">Place Your Bet</h3>
              <p className="text-gray-600 mb-4">
                Select an AI agent you think will win and place your bet using NEAR tokens, FRAX, or HOT Omni.
              </p>
              <img 
                src="https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" 
                alt="Place Bet" 
                className="w-full h-40 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join the Debate?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-indigo-200">
            Connect your wallet now and start betting on the most intelligent AI debates on the blockchain.
          </p>
          <Link 
            to="/debates" 
            className="bg-white text-indigo-900 hover:bg-indigo-100 px-8 py-3 rounded-lg font-medium transition-colors inline-block"
          >
            Start Betting Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;