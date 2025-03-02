import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useWalletStore from '../store/walletStore';
import { Wallet, LogOut, Menu, ChevronDown } from 'lucide-react';

const Header = () => {
  const { isSignedIn, accountId, balance, connect, disconnect } = useWalletStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);
  const [ethAddress, setEthAddress] = useState('');
  const [ethBalance, setEthBalance] = useState('0');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await connect();
      // Connect MetaMask
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) {
          setEthAddress(accounts[0]);
          setIsMetaMaskConnected(true);
          
          // Get ETH balance
          const balance = await window.ethereum.request({
            method: 'eth_getBalance',
            params: [accounts[0], 'latest'],
          });
          
          // Convert from wei to ETH
          const ethBalance = parseInt(balance, 16) / 1e18;
          setEthBalance(ethBalance.toFixed(4));
        }
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    await disconnect();
    setIsMetaMaskConnected(false);
    setEthAddress('');
    setEthBalance('0');
  };

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setEthAddress(accounts[0]);
          // Update ETH balance
          window.ethereum.request({
            method: 'eth_getBalance',
            params: [accounts[0], 'latest'],
          }).then(balance => {
            const ethBalance = parseInt(balance, 16) / 1e18;
            setEthBalance(ethBalance.toFixed(4));
          });
        } else {
          setIsMetaMaskConnected(false);
          setEthAddress('');
          setEthBalance('0');
        }
      });
    }
  }, []);

  return (
    <header className="bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-white shadow-lg backdrop-blur-md bg-opacity-90 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <Wallet className="w-6 h-6 text-indigo-900" />
            </div>
            <span className="text-2xl font-bold">Debate Arena</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-indigo-300 transition-colors">Home</Link>
            <Link to="/debates" className="hover:text-indigo-300 transition-colors">Debates</Link>
            <Link to="/leaderboard" className="hover:text-indigo-300 transition-colors">Leaderboard</Link>
            <Link to="/about" className="hover:text-indigo-300 transition-colors">About</Link>
          </div>

          <div className="hidden md:block">
            {isSignedIn ? (
              <div className="flex items-center space-x-4">
                <div className="bg-indigo-800/50 backdrop-blur-md rounded-lg px-4 py-2 border border-indigo-700/50">
                  <div className="text-xs text-indigo-300">Account</div>
                  <div className="font-medium truncate max-w-[150px]">{accountId}</div>
                </div>
                
                <div className="bg-indigo-800/50 backdrop-blur-md rounded-lg px-4 py-2 border border-indigo-700/50">
                  <div className="text-xs text-indigo-300">NEAR</div>
                  <div className="font-medium">{parseFloat(balance.near).toFixed(2)} Ⓝ</div>
                </div>
                
                {isMetaMaskConnected && (
                  <div className="bg-indigo-800/50 backdrop-blur-md rounded-lg px-4 py-2 border border-indigo-700/50">
                    <div className="text-xs text-indigo-300">ETH</div>
                    <div className="font-medium">{ethBalance} ETH</div>
                  </div>
                )}
                
                <div className="relative group">
                  <button className="bg-indigo-800/50 backdrop-blur-md rounded-lg px-4 py-2 border border-indigo-700/50 flex items-center">
                    <img src="https://metamask.io/images/metamask-fox.svg" alt="MetaMask" className="w-5 h-5 mr-2" />
                    <span className="font-medium truncate max-w-[80px]">
                      {isMetaMaskConnected 
                        ? `${ethAddress.substring(0, 6)}...${ethAddress.substring(ethAddress.length - 4)}`
                        : "Connect"
                      }
                    </span>
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </button>
                  
                  <div className="absolute right-0 mt-2 w-48 bg-indigo-900 border border-indigo-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    {!isMetaMaskConnected ? (
                      <button 
                        onClick={handleConnect}
                        className="w-full text-left px-4 py-2 hover:bg-indigo-800 rounded-lg"
                      >
                        Connect MetaMask
                      </button>
                    ) : (
                      <>
                        <div className="px-4 py-2 border-b border-indigo-700">
                          <div className="text-xs text-indigo-300">MetaMask Address</div>
                          <div className="font-medium text-sm truncate">
                            {ethAddress}
                          </div>
                        </div>
                        <button 
                          onClick={() => {
                            if (window.ethereum) {
                              window.open(`https://etherscan.io/address/${ethAddress}`, '_blank');
                            }
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-indigo-800 text-sm"
                        >
                          View on Etherscan
                        </button>
                      </>
                    )}
                  </div>
                </div>
                
                <button 
                  onClick={handleDisconnect}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Disconnect</span>
                </button>
              </div>
            ) : (
              <button 
                onClick={handleConnect}
                disabled={isConnecting}
                className={`bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center ${isConnecting ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isConnecting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Connecting...
                  </>
                ) : (
                  <>
                    <Wallet className="w-4 h-4 mr-2" />
                    Connect Wallet
                  </>
                )}
              </button>
            )}
          </div>

          <button className="md:hidden" onClick={toggleMenu}>
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="hover:text-indigo-300 transition-colors">Home</Link>
              <Link to="/debates" className="hover:text-indigo-300 transition-colors">Debates</Link>
              <Link to="/leaderboard" className="hover:text-indigo-300 transition-colors">Leaderboard</Link>
              <Link to="/about" className="hover:text-indigo-300 transition-colors">About</Link>
            </nav>
            <div className="mt-4">
              {isSignedIn ? (
                <div className="space-y-3">
                  <div className="bg-indigo-800/50 backdrop-blur-md rounded-lg px-4 py-2 border border-indigo-700/50">
                    <div className="text-xs text-indigo-300">Account</div>
                    <div className="font-medium truncate">{accountId}</div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="bg-indigo-800/50 backdrop-blur-md rounded-lg px-4 py-2 border border-indigo-700/50 flex-1">
                      <div className="text-xs text-indigo-300">NEAR</div>
                      <div className="font-medium">{parseFloat(balance.near).toFixed(2)} Ⓝ</div>
                    </div>
                    {isMetaMaskConnected && (
                      <div className="bg-indigo-800/50 backdrop-blur-md rounded-lg px-4 py-2 border border-indigo-700/50 flex-1">
                        <div className="text-xs text-indigo-300">ETH</div>
                        <div className="font-medium">{ethBalance} ETH</div>
                      </div>
                    )}
                  </div>
                  
                  {!isMetaMaskConnected ? (
                    <button 
                      onClick={handleConnect}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                    >
                      <img src="https://metamask.io/images/metamask-fox.svg" alt="MetaMask" className="w-5 h-5 mr-2" />
                      <span>Connect MetaMask</span>
                    </button>
                  ) : (
                    <div className="bg-indigo-800/50 backdrop-blur-md rounded-lg px-4 py-2 border border-indigo-700/50">
                      <div className="text-xs text-indigo-300">MetaMask</div>
                      <div className="font-medium truncate">{ethAddress}</div>
                    </div>
                  )}
                  
                  <button 
                    onClick={handleDisconnect}
                    className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Disconnect</span>
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleConnect}
                  disabled={isConnecting}
                  className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center justify-center ${isConnecting ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isConnecting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Wallet className="w-4 h-4 mr-2" />
                      Connect Wallet
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;