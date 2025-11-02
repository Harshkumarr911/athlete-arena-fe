import React from 'react';
import { X, Download, Share2 } from 'lucide-react';
import Modal from '../common/Modal';
import Avatar from '../common/Avatar';

const VideoPlayer = ({ video, isOpen, onClose }) => {
  if (!video) return null;

  const getVideoUrl = (videoUrl) => {
    if (!videoUrl) return null;
    // Extract filename from URL
    const filename = videoUrl.split('/').pop();
    return `http://localhost:8080/api/videos/stream/${filename}`;
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = getVideoUrl(video.videoUrl);
    link.download = video.title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={video.title} size="xl">
      <div className="space-y-4">
        {/* Video Player */}
        <div className="relative bg-black rounded-xl overflow-hidden">
          <video
            controls
            autoPlay
            className="w-full max-h-[70vh] object-contain"
            src={getVideoUrl(video.videoUrl)}
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Video Info */}
        <div className="flex items-start gap-4">
          <Avatar 
            src={video.coach?.avatar} 
            name={video.coach?.name} 
            size="lg" 
            role={video.coach?.role} 
          />
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white mb-2">{video.title}</h2>
            <p className="text-gray-400 mb-3">{video.coach?.name}</p>
            {video.description && (
              <p className="text-gray-300 mb-4">{video.description}</p>
            )}
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>{video.views} views</span>
              {video.duration && <span>{video.duration}</span>}
              {video.category && (
                <span className="px-3 py-1 bg-purple-600/20 rounded-full text-purple-300">
                  {video.category}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-purple-500/20">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600/20 rounded-xl text-purple-300 hover:bg-purple-600/30 transition"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 rounded-xl text-blue-300 hover:bg-blue-600/30 transition"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default VideoPlayer;