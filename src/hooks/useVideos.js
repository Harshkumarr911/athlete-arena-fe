import { useState, useEffect } from 'react';
import { videoApi } from '../api/videoApi';

export const useVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVideos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await videoApi.getAllVideos(0, 20);
      if (response.success) {
        setVideos(response.data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const uploadVideo = async (formData) => {
    const response = await videoApi.uploadVideo(formData);
    if (response.success) {
      setVideos([response.data, ...videos]);
    }
    return response;
  };

  const deleteVideo = async (videoId) => {
    const response = await videoApi.deleteVideo(videoId);
    if (response.success) {
      setVideos(videos.filter(v => v.id !== videoId));
    }
    return response;
  };

  return {
    videos,
    loading,
    error,
    fetchVideos,
    uploadVideo,
    deleteVideo,
  };
};