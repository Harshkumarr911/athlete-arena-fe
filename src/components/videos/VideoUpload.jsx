import React, { useState } from 'react';
import { Upload, Video as VideoIcon, X, Image } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';
import { videoApi } from '../../api/videoApi';

const VideoUpload = ({ onVideoUploaded, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'TECHNIQUE',
    duration: '',
  });
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const categories = [
    'SPEED', 'STRENGTH', 'RECOVERY', 'NUTRITION', 
    'TECHNIQUE', 'CARDIO', 'FLEXIBILITY', 'MENTAL'
  ];

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedVideo(file);
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedVideo) {
      alert('Please select a video file');
      return;
    }

    setLoading(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('title', formData.title);
      uploadFormData.append('description', formData.description);
      uploadFormData.append('category', formData.category);
      uploadFormData.append('duration', formData.duration);
      uploadFormData.append('video', selectedVideo);
      if (selectedThumbnail) {
        uploadFormData.append('thumbnail', selectedThumbnail);
      }

      const response = await videoApi.uploadVideo(uploadFormData);
      if (response.success) {
        onVideoUploaded(response.data);
        onClose();
      }
    } catch (error) {
      alert('Failed to upload video. Please try again.', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Video Title"
        value={formData.title}
        onChange={(e) => setFormData({...formData, title: e.target.value})}
        placeholder="Enter video title"
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          placeholder="Describe your video..."
          className="w-full bg-white/5 text-white px-4 py-3 rounded-xl border border-purple-500/30 focus:border-purple-500 focus:outline-none resize-none"
          rows="4"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Category <span className="text-red-400">*</span>
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            className="w-full bg-white/5 text-white px-4 py-3 rounded-xl border border-purple-500/30 focus:border-purple-500 focus:outline-none"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <Input
          label="Duration"
          value={formData.duration}
          onChange={(e) => setFormData({...formData, duration: e.target.value})}
          placeholder="e.g., 10:30"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Video File <span className="text-red-400">*</span>
        </label>
        <label className="flex items-center justify-center gap-2 px-4 py-8 bg-purple-600/10 border-2 border-dashed border-purple-500/30 rounded-xl cursor-pointer hover:bg-purple-600/20 transition">
          <VideoIcon className="w-6 h-6 text-purple-400" />
          <span className="text-purple-300">
            {selectedVideo ? selectedVideo.name : 'Click to select video'}
          </span>
          <input 
            type="file" 
            accept="video/*" 
            onChange={handleVideoChange} 
            className="hidden"
            required
          />
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Thumbnail (Optional)
        </label>
        {thumbnailPreview ? (
          <div className="relative inline-block">
            <img 
              src={thumbnailPreview} 
              alt="Thumbnail preview" 
              className="max-h-40 rounded-lg border border-purple-500/30"
            />
            <button
              type="button"
              onClick={() => {
                setSelectedThumbnail(null);
                setThumbnailPreview(null);
              }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <label className="flex items-center justify-center gap-2 px-4 py-8 bg-pink-600/10 border-2 border-dashed border-pink-500/30 rounded-xl cursor-pointer hover:bg-pink-600/20 transition">
            <Image className="w-6 h-6 text-pink-400" />
            <span className="text-pink-300">Click to select thumbnail</span>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleThumbnailChange} 
              className="hidden"
            />
          </label>
        )}
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? 'Uploading...' : 'Upload Video'}
        </Button>
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default VideoUpload;