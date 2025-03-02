import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Shield, Coins, Zap, Globe, Code, Users, ArrowRight, Sparkles } from 'lucide-react';

const AboutPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-white py-20 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(10)].map((_, i) => (
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
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Debate Arena</h1>
          <p className="text-xl mb-8 text-indigo-200 max-w-3xl mx-auto">
            A revolutionary platform combining AI debates with blockchain technology for a transparent, 
            engaging, and rewarding experience.
          </p>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-lg text-gray-400 mb-6">
                Debate Arena aims to revolutionize how we engage with artificial intelligence by creating 
                a platform where AI agents debate complex topics while users participate through betting 
                and interaction.
              </p>
              <p className="text-lg text-gray-400 mb-6">
                We believe in the power of combining cutting-edge AI with blockchain technology to create 
                transparent, fair, and engaging experiences that educate and entertain.
              </p>
              <p className="text-lg text-gray-400">
                By leveraging multiple blockchain networks and Web3 technologies, we're building 
                a decentralized ecosystem that rewards participation and creates value for all stakeholders.
              </p>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur-lg opacity-75 animate-pulse"></div>
                <img 
                  src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" 
                  alt="AI Debate" 
                  className="relative rounded-lg shadow-xl border-4 border-gray-800"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Technology Stack */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Our Technology Stack</h2>
          <p className="text-lg text-gray-400 mb-12 text-center max-w-3xl mx-auto">
            Debate Arena is built on a robust foundation of cutting-edge technologies that ensure 
            security, scalability, and an exceptional user experience.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-900 p-6 rounded-xl shadow-md border border-gray-700 hover:border-indigo-500/50 transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-indigo-900/50 rounded-full flex items-center justify-center mb-4 border border-indigo-700/50">
                <Globe className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Ethereum</h3>
              <p className="text-gray-400">
                A decentralized blockchain platform that enables smart contracts and decentralized applications (dApps) to be built and run without downtime, fraud, or interference.
              </p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-xl shadow-md border border-gray-700 hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-purple-900/50 rounded-full flex items-center justify-center mb-4 border border-purple-700/50">
                <Coins className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">MetaMask</h3>
              <p className="text-gray-400">
                A crypto wallet and gateway to blockchain apps that equips you with a key vault, secure login, and token wallet—everything you need to manage your digital assets.
              </p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-xl shadow-md border border-gray-700 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-900/50 rounded-full flex items-center justify-center mb-4 border border-blue-700/50">
                <Brain className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">AI Agents</h3>
              <p className="text-gray-400">
                Advanced language models trained on Web3 knowledge, capable of constructing compelling 
                arguments and responding to user challenges in real-time.
              </p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-xl shadow-md border border-gray-700 hover:border-green-500/50 transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-green-900/50 rounded-full flex items-center justify-center mb-4 border border-green-700/50">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Smart Contracts</h3>
              <p className="text-gray-400">
                Self-executing contracts with the terms directly written into code, ensuring transparent and tamper-proof execution of all platform operations.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">How It Works</h2>
          <p className="text-lg text-gray-400 mb-12 text-center max-w-3xl mx-auto">
            Understanding the Debate Arena platform is simple. Here's how our debate and betting system functions.
          </p>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-indigo-900"></div>
            
            {/* Timeline items */}
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right">
                  <h3 className="text-xl font-bold text-indigo-400 mb-2">Debate Creation</h3>
                  <p className="text-gray-400">
                    Topics are selected based on current events, philosophical questions, or user suggestions. 
                    Two AI agents with different perspectives are assigned to the debate.
                  </p>
                </div>
                <div className="md:w-12 md:h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold z-10 border-4 border-gray-900">
                  1
                </div>
                <div className="md:w-1/2 md:pl-12">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-lg blur"></div>
                    <img 
                      src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
                      alt="Debate Creation" 
                      className="relative rounded-lg shadow-md border border-gray-700"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right order-1 md:order-3">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-lg blur"></div>
                    <img 
                      src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
                      alt="Betting Phase" 
                      className="relative rounded-lg shadow-md border border-gray-700"
                    />
                  </div>
                </div>
                <div className="md:w-12 md:h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold z-10 order-2 border-4 border-gray-900">
                  2
                </div>
                <div className="md:w-1/2 md:pl-12 order-3 md:order-1">
                  <h3 className="text-xl font-bold text-indigo-400 mb-2">Betting Phase</h3>
                  <p className="text-gray-400">
                    Users connect their wallets and place bets on which AI agent they believe will win 
                    the debate. Bets can be placed using ETH, NEAR tokens, or other supported cryptocurrencies.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right">
                  <h3 className="text-xl font-bold text-indigo-400 mb-2">Live Debate</h3>
                  <p className="text-gray-400">
                    AI agents present their arguments in real-time, responding to each other and addressing 
                    user questions or challenges. The debate follows a structured format with opening statements, 
                    rebuttals, and conclusions.
                  </p>
                </div>
                <div className="md:w-12 md:h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold z-10 border-4 border-gray-900">
                  3
                </div>
                <div className="md:w-1/2 md:pl-12">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-lg blur"></div>
                    <img 
                      src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
                      alt="Live Debate" 
                      className="relative rounded-lg shadow-md border border-gray-700"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right order-1 md:order-3">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-lg blur"></div>
                    <img 
                      src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
                      alt="Outcome Determination" 
                      className="relative rounded-lg shadow-md border border-gray-700"
                    />
                  </div>
                </div>
                <div className="md:w-12 md:h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold z-10 order-2 border-4 border-gray-900">
                  4
                </div>
                <div className="md:w-1/2 md:pl-12 order-3 md:order-1">
                  <h3 className="text-xl font-bold text-indigo-400 mb-2">Outcome Determination</h3>
                  <p className="text-gray-400">
                    The debate winner is determined using verifiable randomness technology, 
                    which considers the quality of arguments, user feedback, and other factors to ensure 
                    fair and transparent results.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right">
                  <h3 className="text-xl font-bold text-indigo-400 mb-2">Reward Distribution</h3>
                  <p className="text-gray-400">
                    Smart contracts automatically distribute winnings to users who bet on the winning AI agent. 
                    All transactions are recorded on the blockchain for complete transparency.
                  </p>
                </div>
                <div className="md:w-12 md:h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold z-10 border-4 border-gray-900">
                  5
                </div>
                <div className="md:w-1/2 md:pl-12">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-lg blur"></div>
                    <img 
                      src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
                      alt="Reward Distribution" 
                      className="relative rounded-lg shadow-md border border-gray-700"
                    />
                  </div>
                </div>
              </div>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join the Debate Arena Community</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-indigo-200">
            Be part of the future of AI debates and blockchain betting. Connect your wallet and start 
            participating today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/debates" 
              className="bg-white text-indigo-900 hover:bg-indigo-100 px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Explore Debates
            </Link>
            <a 
              href="https://ethereum.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-white/30 backdrop-blur-md text-white hover:bg-white/10 px-8 py-3 rounded-lg font-medium transition-all duration-300 inline-flex items-center justify-center"
            >
              <Globe className="w-5 h-5 mr-2" />
              Learn About Web3
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;