import axiosInstance from './axios';

export const postApi = {
  createPost: async (formData) => {
    const response = await axiosInstance.post('/posts/with-media', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  
  getAllPosts: async (page = 0, size = 10) => {
    const response = await axiosInstance.get(`/posts?page=${page}&size=${size}`);
    return response.data;
  },
  
  likePost: async (postId) => {
    const response = await axiosInstance.post(`/posts/${postId}/like`);
    return response.data;
  },
  
  unlikePost: async (postId) => {
    const response = await axiosInstance.post(`/posts/${postId}/unlike`);
    return response.data;
  },
  
  deletePost: async (postId) => {
    const response = await axiosInstance.delete(`/posts/${postId}`);
    return response.data;
  },
};