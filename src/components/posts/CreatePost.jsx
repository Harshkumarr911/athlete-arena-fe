import React, { useState } from 'react';
import { Upload, Video, X, Image } from 'lucide-react';
import { postApi } from '../../api/postApi';
import Button from '../common/Button';

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedVideo(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const removeVideo = () => {
    setSelectedVideo(null);
  };

  const handleSubmit = async () => {
    if (!content.trim() && !selectedImage && !selectedVideo) {
      alert('Please add some content, image, or video');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('content', content);
      if (selectedImage) formData.append('image', selectedImage);
      if (selectedVideo) formData.append('video', selectedVideo);

      const response = await postApi.createPost(formData);
      if (response.success) {
        setContent('');
        setSelectedImage(null);
        setSelectedVideo(null);
        setImagePreview(null);
        onPostCreated(response.data);
      }
    } catch (error) {
      alert('Failed to create post. Please try again.',error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 shadow-xl">
      <div className="flex gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-2xl">⚡</span>
        </div>
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your progress, tips, or achievements..."
            className="w-full bg-white/5 text-white rounded-xl p-3 border border-purple-500/20 focus:border-purple-500 focus:outline-none resize-none"
            rows="3"
          />
          
          {imagePreview && (
            <div className="mt-3 relative inline-block">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="max-h-40 rounded-lg border border-purple-500/30"
              />
              <button
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {selectedVideo && (
            <div className="mt-3 bg-purple-600/20 border border-purple-500/30 rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-purple-400" />
                <span className="text-sm text-purple-300">{selectedVideo.name}</span>
              </div>
              <button
                onClick={removeVideo}
                className="text-red-400 hover:text-red-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-2">
              <label className="flex items-center gap-2 px-4 py-2 bg-purple-600/20 rounded-xl cursor-pointer hover:bg-purple-600/30 transition">
                <Image className="w-5 h-5 text-purple-400" />
                <span className="text-sm text-purple-300">Image</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  className="hidden" 
                />
              </label>
              <label className="flex items-center gap-2 px-4 py-2 bg-pink-600/20 rounded-xl cursor-pointer hover:bg-pink-600/30 transition">
                <Video className="w-5 h-5 text-pink-400" />
                <span className="text-sm text-pink-300">Video</span>
                <input 
                  type="file" 
                  accept="video/*" 
                  onChange={handleVideoChange} 
                  className="hidden" 
                />
              </label>
            </div>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? 'Posting...' : 'Post'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;