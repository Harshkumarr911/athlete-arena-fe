import React, { useState, useEffect } from 'react';
import { Upload, Search } from 'lucide-react';
import Header from '../components/layout/Header';
import VideoList from '../components/videos/VideoList';
import VideoUpload from '../components/videos/VideoUpload';
import VideoPlayer from '../components/videos/VideoPlayer';  // ✅ Add this
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { videoApi } from '../api/videoApi';
import { useAuth } from '../hooks/useAuth';

const Videos = () => {
  const { user } = useAuth();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);  // ✅ Add this
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);  // ✅ Add this
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = [
    'ALL', 'SPEED', 'STRENGTH', 'RECOVERY', 'NUTRITION', 
    'TECHNIQUE', 'CARDIO', 'FLEXIBILITY', 'MENTAL'
  ];

  useEffect(() => {
    fetchVideos();
  }, [selectedCategory]);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      let response;
      if (selectedCategory === 'ALL') {
        response = await videoApi.getAllVideos(0, 20);
      } else {
        response = await videoApi.getVideosByCategory(selectedCategory, 0, 20);
      }
      if (response.success) {
        setVideos(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchVideos();
      return;
    }
    setLoading(true);
    try {
      const response = await videoApi.searchVideos(searchQuery, 0, 20);
      if (response.success) {
        setVideos(response.data);
      }
    } catch (error) {
      console.error('Failed to search videos:', error);
    } finally {
      setLoading(false);
    }
  };

  

  const handleVideoUploaded = (newVideo) => {
    setVideos([newVideo, ...videos]);
  };

  // ✅ Add this function
  const handleVideoClick = async (video) => {
    try {
      // Increment view count
      await videoApi.getVideoById(video.id);
      // Open video player
      setSelectedVideo(video);
      setShowVideoPlayer(true);
    } catch (error) {
      console.error('Failed to load video:', error);
    }
  };

  const isCoach = user?.role === 'COACH';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <h2 className="text-3xl font-bold text-white">Training Videos</h2>
          
          <div className="flex gap-4 w-full md:w-auto">
            <div className="flex-1 md:w-80">
              <Input
                type="text"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                icon={<Search className="w-5 h-5" />}
              />
            </div>
            {isCoach && (
              <Button 
                onClick={() => setShowUploadModal(true)}
                icon={<Upload className="w-5 h-5" />}
              >
                Upload
              </Button>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl whitespace-nowrap transition ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <VideoList 
          videos={videos} 
          loading={loading}
          onVideoClick={handleVideoClick}  // ✅ Pass the handler
        />
      </div>

      {/* Upload Modal */}
      <Modal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        title="Upload Training Video"
      >
        <VideoUpload 
          onVideoUploaded={handleVideoUploaded}
          onClose={() => setShowUploadModal(false)}
        />
      </Modal>

      {/* ✅ Add Video Player Modal */}
      <VideoPlayer
        video={selectedVideo}
        isOpen={showVideoPlayer}
        onClose={() => {
          setShowVideoPlayer(false);
          setSelectedVideo(null);
        }}
      />
    </div>
  );
};

export default Videos;