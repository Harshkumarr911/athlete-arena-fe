import axiosInstance from './axios';

export const userApi = {
  getUserById: async (userId) => {
    const response = await axiosInstance.get(`/users/${userId}`);
    return response.data;
  },
  
  getUserByUsername: async (username) => {
    const response = await axiosInstance.get(`/users/username/${username}`);
    return response.data;
  },
  
  getAllCoaches: async () => {
    const response = await axiosInstance.get('/users/coaches');
    return response.data;
  },
  
  getAllAthletes: async () => {
    const response = await axiosInstance.get('/users/athletes');
    return response.data;
  },
  
  followUser: async (userId) => {
    const response = await axiosInstance.post(`/users/follow/${userId}`);
    return response.data;
  },
  
  unfollowUser: async (userId) => {
    const response = await axiosInstance.post(`/users/unfollow/${userId}`);
    return response.data;
  },
};