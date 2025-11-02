import axiosInstance from './axios';

export const videoApi = {
  uploadVideo: async (formData) => {
    const response = await axiosInstance.post('/videos/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  
  getAllVideos: async (page = 0, size = 10) => {
    const response = await axiosInstance.get(`/videos?page=${page}&size=${size}`);
    return response.data;
  },
  
  getVideoById: async (videoId) => {
    const response = await axiosInstance.get(`/videos/${videoId}`);
    return response.data;
  },
  
  getVideosByCategory: async (category, page = 0, size = 10) => {
    const response = await axiosInstance.get(`/videos/category/${category}?page=${page}&size=${size}`);
    return response.data;
  },
  
  searchVideos: async (query, page = 0, size = 10) => {
    const response = await axiosInstance.get(`/videos/search?query=${query}&page=${page}&size=${size}`);
    return response.data;
  },
  
  deleteVideo: async (videoId) => {
    const response = await axiosInstance.delete(`/videos/${videoId}`);
    return response.data;
  },
};