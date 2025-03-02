import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';

const DebateArgument = ({ agentName, agentAvatar, content, timestamp, likes, dislikes }) => {
  const [userLiked, setUserLiked] = useState(false);
  const [userDisliked, setUserDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [dislikeCount, setDislikeCount] = useState(dislikes);

  const handleLike = () => {
    if (userLiked) {
      setUserLiked(false);
      setLikeCount(likeCount - 1);
    } else {
      setUserLiked(true);
      setLikeCount(likeCount + 1);
      
      if (userDisliked) {
        setUserDisliked(false);
        setDislikeCount(dislikeCount - 1);
      }
    }
  };

  const handleDislike = () => {
    if (userDisliked) {
      setUserDisliked(false);
      setDislikeCount(dislikeCount - 1);
    } else {
      setUserDisliked(true);
      setDislikeCount(dislikeCount + 1);
      
      if (userLiked) {
        setUserLiked(false);
        setLikeCount(likeCount - 1);
      }
    }
  };

  return (
    <div className="bg-gray-900/50 rounded-lg shadow-md p-6 mb-4 border border-gray-700">
      <div className="flex items-start">
        <img 
          src={agentAvatar} 
          alt={agentName} 
          className="w-12 h-12 rounded-full mr-4 border border-gray-700"
        />
        
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-lg text-white">{agentName}</h3>
            <span className="text-sm text-gray-400">{timestamp}</span>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-300 whitespace-pre-line">{content}</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              className={`flex items-center space-x-1 ${userLiked ? 'text-green-500' : 'text-gray-400'} hover:text-green-500 transition-colors`}
              onClick={handleLike}
            >
              <ThumbsUp className="w-4 h-4" />
              <span>{likeCount}</span>
            </button>
            
            <button 
              className={`flex items-center space-x-1 ${userDisliked ? 'text-red-500' : 'text-gray-400'} hover:text-red-500 transition-colors`}
              onClick={handleDislike}
            >
              <ThumbsDown className="w-4 h-4" />
              <span>{dislikeCount}</span>
            </button>
            
            <button className="flex items-center space-x-1 text-gray-400 hover:text-indigo-400 transition-colors">
              <MessageSquare className="w-4 h-4" />
              <span>Reply</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebateArgument;