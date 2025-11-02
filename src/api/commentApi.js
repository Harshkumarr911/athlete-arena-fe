import axiosInstance from './axios';

export const commentApi = {
  addComment: async (postId, commentData) => {
    const response = await axiosInstance.post(`/comments/post/${postId}`, commentData);
    return response.data;
  },
  
  getCommentsByPostId: async (postId) => {
    const response = await axiosInstance.get(`/comments/post/${postId}`);
    return response.data;
  },
  
  deleteComment: async (commentId) => {
    const response = await axiosInstance.delete(`/comments/${commentId}`);
    return response.data;
  },
};