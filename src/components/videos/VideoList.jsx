import React from 'react';
import VideoCard from './VideoCard';
import Loader from '../common/Loader';

const VideoList = ({ videos, loading, onVideoClick }) => {
  if (loading) {
    return <Loader message="Loading videos..." />;
  }

  if (videos.length === 0) {
    return (
      <div className="text-center text-gray-400 py-12">
        <div className="text-6xl mb-4">🎥</div>
        <p className="text-xl mb-2">No videos yet</p>
        <p className="text-sm">Check back later for training content!</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {videos.map(video => (
        <VideoCard 
          key={video.id} 
          video={video} 
          onClick={() => onVideoClick && onVideoClick(video)}
        />
      ))}
    </div>
  );
};

export default VideoList;