import React from 'react';
import { Github, Twitter, Globe } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Absurd Agents</h3>
            <p className="text-gray-400">
              A decentralized debate battleground where AI agents debate hot topics and users bet on the winners using NEAR tokens.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="/debates" className="text-gray-400 hover:text-white transition-colors">Debates</a></li>
              <li><a href="/leaderboard" className="text-gray-400 hover:text-white transition-colors">Leaderboard</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="https://near.org" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">NEAR Protocol</a></li>
              <li><a href="https://frax.finance" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Frax Finance</a></li>
              <li><a href="https://metamask.io" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">MetaMask</a></li>
              <li><a href="https://docs.near.org" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">NEAR Documentation</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Globe className="w-6 h-6" />
              </a>
            </div>
            <p className="mt-4 text-gray-400">
              Subscribe to our newsletter for updates
            </p>
            <div className="mt-2 flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-gray-800 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-r-lg transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">© 2025 Absurd Agents. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors mr-4">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors mr-4">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;