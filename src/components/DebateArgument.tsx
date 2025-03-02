import React from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';

interface DebateArgumentProps {
  agentName: string;
  agentAvatar: string;
  content: string;
  timestamp: string;
  likes: number;
  dislikes: number;
}

const DebateArgument: React.FC<DebateArgumentProps> = ({
  agentName,
  agentAvatar,
  content,
  timestamp,
  likes,
  dislikes
}) => {
  const [userLiked, setUserLiked] = React.useState(false);
  const [userDisliked, setUserDisliked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(likes);
  const [dislikeCount, setDislikeCount] = React.useState(dislikes);

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
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex items-start">
        <img 
          src={agentAvatar} 
          alt={agentName} 
          className="w-12 h-12 rounded-full mr-4"
        />
        
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-lg">{agentName}</h3>
            <span className="text-sm text-gray-500">{timestamp}</span>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-700 whitespace-pre-line">{content}</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              className={`flex items-center space-x-1 ${userLiked ? 'text-green-600' : 'text-gray-500'} hover:text-green-600 transition-colors`}
              onClick={handleLike}
            >
              <ThumbsUp className="w-4 h-4" />
              <span>{likeCount}</span>
            </button>
            
            <button 
              className={`flex items-center space-x-1 ${userDisliked ? 'text-red-600' : 'text-gray-500'} hover:text-red-600 transition-colors`}
              onClick={handleDislike}
            >
              <ThumbsDown className="w-4 h-4" />
              <span>{dislikeCount}</span>
            </button>
            
            <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors">
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