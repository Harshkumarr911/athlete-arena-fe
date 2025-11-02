import React from 'react';
import { Play, Eye, Clock } from 'lucide-react';
import Avatar from '../common/Avatar';
import { useNavigate } from 'react-router-dom';

const VideoCard = ({ video, onClick }) => {
  const navigate = useNavigate();
  return (
    <div 
      onClick={onClick}
      className="bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden border border-purple-500/20 hover:border-purple-500/40 transition cursor-pointer transform hover:scale-105 duration-300 shadow-xl"
    >
      <div onClick={onClick} className="bg-gradient-to-br from-purple-600/30 to-pink-600/30 aspect-video flex items-center justify-center relative group">
        {video.thumbnailUrl ? (
          <img 
            src={`http://localhost:8080${video.thumbnailUrl}`} 
            alt={video.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-6xl">📹</div>
        )}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition flex items-center justify-center">
          <Play className="w-16 h-16 text-white opacity-80 group-hover:scale-110 transition" />
        </div>
        {video.duration && (
          <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {video.duration}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-white mb-2 line-clamp-2">{video.title}</h3>
        <div onClick={(e) => {
            e.stopPropagation();
            navigate(`/profile/${video.coach?.id}`);
          }}
          className="flex items-center gap-2 mb-2 cursor-pointer hover:bg-white/5 p-1 rounded-lg transition">
          <Avatar src={video.coach?.avatar} name={video.coach?.name} size="sm" />
          <p className="text-sm text-gray-400">{video.coach?.name}</p>
        </div>
        {video.description && (
          <p className="text-sm text-gray-500 mb-2 line-clamp-2">{video.description}</p>
        )}
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {video.views} views
          </span>
          {video.category && (
            <span className="px-2 py-1 bg-purple-600/20 rounded-full text-purple-300 text-xs">
              {video.category}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;