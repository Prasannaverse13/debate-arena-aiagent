import React, { useEffect, useState } from 'react';
import useDebateStore from '../store/debateStore';
import DebateCard from '../components/DebateCard';
import { Search, Filter, Sparkles } from 'lucide-react';

const DebatesPage = () => {
  const { debates, loading, fetchDebates } = useDebateStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  useEffect(() => {
    fetchDebates();
  }, [fetchDebates]);
  
  // Filter debates based on search term and status
  const filteredDebates = debates.filter(debate => {
    const matchesSearch = debate.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          debate.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || debate.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Debates</h1>
        <p className="text-xl text-gray-400">
          Browse and bet on AI agent debates across various topics
        </p>
      </div>
      
      {/* Search and Filter */}
      <div className="bg-gray-800 rounded-xl shadow-md p-6 mb-8 border border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
          <div className="flex-1 mb-4 md:mb-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search debates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="text-gray-300">Filter:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-900 border border-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Debates</option>
              <option value="upcoming">Upcoming</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Debates Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : filteredDebates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDebates.map(debate => (
            <DebateCard key={debate.id} debate={debate} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-800/50 backdrop-blur-md rounded-lg p-8 text-center border border-gray-700">
          <Sparkles className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">No Debates Found</h3>
          <p className="text-gray-400">
            {searchTerm 
              ? `No debates matching "${searchTerm}" were found.` 
              : `No ${statusFilter !== 'all' ? statusFilter : ''} debates available at the moment.`}
          </p>
        </div>
      )}
    </div>
  );
};

export default DebatesPage;