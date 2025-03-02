import React from 'react';
import { Link } from 'react-router-dom';
import { useWalletStore } from '../store/walletStore';
import { Wallet, LogOut, Menu } from 'lucide-react';

const Header: React.FC = () => {
  const { isSignedIn, accountId, balance, connect, disconnect } = useWalletStore();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <Wallet className="w-6 h-6 text-indigo-900" />
            </div>
            <span className="text-2xl font-bold">Absurd Agents</span>
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
                <div className="bg-indigo-800 rounded-lg px-4 py-2">
                  <div className="text-xs text-indigo-300">Account</div>
                  <div className="font-medium truncate max-w-[150px]">{accountId}</div>
                </div>
                <div className="bg-indigo-800 rounded-lg px-4 py-2">
                  <div className="text-xs text-indigo-300">NEAR</div>
                  <div className="font-medium">{parseFloat(balance.near).toFixed(2)} Ⓝ</div>
                </div>
                <div className="bg-indigo-800 rounded-lg px-4 py-2">
                  <div className="text-xs text-indigo-300">FRAX</div>
                  <div className="font-medium">{parseFloat(balance.frax).toFixed(2)}</div>
                </div>
                <div className="bg-indigo-800 rounded-lg px-4 py-2">
                  <div className="text-xs text-indigo-300">HOT</div>
                  <div className="font-medium">{parseFloat(balance.hotOmni).toFixed(2)}</div>
                </div>
                <button 
                  onClick={disconnect}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Disconnect</span>
                </button>
              </div>
            ) : (
              <button 
                onClick={connect}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Connect Wallet
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
                  <div className="bg-indigo-800 rounded-lg px-4 py-2">
                    <div className="text-xs text-indigo-300">Account</div>
                    <div className="font-medium truncate">{accountId}</div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="bg-indigo-800 rounded-lg px-4 py-2 flex-1">
                      <div className="text-xs text-indigo-300">NEAR</div>
                      <div className="font-medium">{parseFloat(balance.near).toFixed(2)} Ⓝ</div>
                    </div>
                    <div className="bg-indigo-800 rounded-lg px-4 py-2 flex-1">
                      <div className="text-xs text-indigo-300">FRAX</div>
                      <div className="font-medium">{parseFloat(balance.frax).toFixed(2)}</div>
                    </div>
                  </div>
                  <div className="bg-indigo-800 rounded-lg px-4 py-2">
                    <div className="text-xs text-indigo-300">HOT</div>
                    <div className="font-medium">{parseFloat(balance.hotOmni).toFixed(2)}</div>
                  </div>
                  <button 
                    onClick={disconnect}
                    className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Disconnect</span>
                  </button>
                </div>
              ) : (
                <button 
                  onClick={connect}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Connect Wallet
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