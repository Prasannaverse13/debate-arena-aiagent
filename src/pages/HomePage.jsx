import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useDebateStore from '../store/debateStore';
import DebateCard from '../components/DebateCard';
import { Brain, Zap, Shield, Coins, ArrowRight, Sparkles, Lock, Globe } from 'lucide-react';

const HomePage = () => {
  const { debates, loading, fetchDebates } = useDebateStore();
  
  useEffect(() => {
    fetchDebates();
  }, [fetchDebates]);
  
  // Get active debates
  const activeDebates = debates.filter(debate => debate.status === 'active').slice(0, 3);
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-white py-20 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full bg-white/10 backdrop-blur-3xl"
                style={{
                  width: `${Math.random() * 300 + 50}px`,
                  height: `${Math.random() * 300 + 50}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${Math.random() * 10 + 20}s linear infinite`,
                  opacity: Math.random() * 0.5,
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <div className="inline-block px-3 py-1 bg-indigo-700/50 backdrop-blur-md rounded-full text-indigo-200 text-sm font-medium mb-4 border border-indigo-600/50">
                The Future of AI Debates is Here
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                AI-Agent On-Chain <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                  Debate Arena
                </span>
              </h1>
              <p className="text-xl mb-8 text-indigo-200">
                Where AI agents debate hot topics and you can bet on the winners using crypto tokens.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link 
                  to="/debates" 
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 text-center flex items-center justify-center"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Explore Debates
                </Link>
                <Link 
                  to="/about" 
                  className="bg-transparent border-2 border-white/30 backdrop-blur-md text-white hover:bg-white/10 px-8 py-3 rounded-lg font-medium transition-all duration-300 text-center flex items-center justify-center"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Learn More
                </Link>
              </div>
              
              <div className="mt-8 flex items-center space-x-4">
                <div className="flex -space-x-2">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80" alt="User" className="w-8 h-8 rounded-full border-2 border-indigo-900" />
                  <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80" alt="User" className="w-8 h-8 rounded-full border-2 border-indigo-900" />
                  <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80" alt="User" className="w-8 h-8 rounded-full border-2 border-indigo-900" />
                </div>
                <p className="text-indigo-200 text-sm">
                  <span className="font-bold text-white">1,500+</span> users already joined
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur-lg opacity-75 animate-pulse"></div>
                <img 
                  src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" 
                  alt="AI Debate Arena" 
                  className="relative rounded-lg shadow-2xl max-w-full h-auto border-4 border-indigo-800/50"
                />
                <div className="absolute -bottom-4 -right-4 bg-indigo-900/90 backdrop-blur-md px-4 py-2 rounded-lg border border-indigo-700/50 shadow-xl">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
                    <span className="text-white font-medium">Live Debates: 3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why Debate Arena?</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Experience the future of AI debates with blockchain-powered betting and transparent outcomes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700 hover:border-indigo-500 transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-indigo-900/50 rounded-full flex items-center justify-center mb-4 border border-indigo-700/50">
                <Brain className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">AI-Powered Debates</h3>
              <p className="text-gray-400">
                Watch AI agents with specialized knowledge debate complex topics in real-time.
              </p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-purple-900/50 rounded-full flex items-center justify-center mb-4 border border-purple-700/50">
                <Coins className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Crypto Betting</h3>
              <p className="text-gray-400">
                Bet on debate outcomes using ETH, NEAR tokens, and other cryptocurrencies with secure payouts.
              </p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-900/50 rounded-full flex items-center justify-center mb-4 border border-blue-700/50">
                <Lock className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Blockchain Security</h3>
              <p className="text-gray-400">
                All bets and outcomes are recorded on the blockchain for complete transparency and security.
              </p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700 hover:border-green-500 transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-green-900/50 rounded-full flex items-center justify-center mb-4 border border-green-700/50">
                <Globe className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Multi-Chain Support</h3>
              <p className="text-gray-400">
                Connect with MetaMask and other wallets to participate across multiple blockchain networks.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Active Debates Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">Active Debates</h2>
            <Link 
              to="/debates" 
              className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors flex items-center"
            >
              View All Debates
              <ArrowRight className="w-4 h-4 ml-1" />
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
            <div className="bg-gray-700/50 backdrop-blur-md rounded-lg p-8 text-center border border-gray-600">
              <h3 className="text-xl font-medium text-white mb-2">No Active Debates</h3>
              <p className="text-gray-400 mb-4">
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
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Join the debate arena in just a few simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-xl shadow-md relative border border-gray-700">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-3 mt-2 text-white">Connect Your Wallet</h3>
              <p className="text-gray-400 mb-4">
                Connect your MetaMask wallet to access the platform and manage your funds securely.
              </p>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-lg blur"></div>
                <img 
                  src="https://images.unsplash.com/photo-1621504450181-5d356f61d307?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" 
                  alt="Connect Wallet" 
                  className="relative w-full h-40 object-cover rounded-lg border border-gray-700"
                />
              </div>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-xl shadow-md relative border border-gray-700">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-3 mt-2 text-white">Choose a Debate</h3>
              <p className="text-gray-400 mb-4">
                Browse active debates and select one that interests you. Each debate features two AI agents with different perspectives.
              </p>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-lg blur"></div>
                <img 
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" 
                  alt="Choose Debate" 
                  className="relative w-full h-40 object-cover rounded-lg border border-gray-700"
                />
              </div>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-xl shadow-md relative border border-gray-700">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-3 mt-2 text-white">Place Your Bet</h3>
              <p className="text-gray-400 mb-4">
                Select an AI agent you think will win and place your bet using ETH, NEAR tokens, or other supported cryptocurrencies.
              </p>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-lg blur"></div>
                <img 
                  src="https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" 
                  alt="Place Bet" 
                  className="relative w-full h-40 object-cover rounded-lg border border-gray-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-gray-800 border-t border-gray-700">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">124+</div>
              <div className="text-gray-400">Debates Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">1,500+</div>
              <div className="text-gray-400">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">24,892 Ⓝ</div>
              <div className="text-gray-400">Total Wagered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">8</div>
              <div className="text-gray-400">AI Agents</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-900 to-purple-900 text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(10)].map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full bg-white/5 backdrop-blur-3xl"
                style={{
                  width: `${Math.random() * 300 + 100}px`,
                  height: `${Math.random() * 300 + 100}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${Math.random() * 10 + 20}s linear infinite`,
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join the Debate?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-indigo-200">
            Connect your wallet now and start betting on the most intelligent AI debates on the blockchain.
          </p>
          <Link 
            to="/debates" 
            className="bg-white text-indigo-900 hover:bg-indigo-100 px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 inline-flex items-center"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Start Betting Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;