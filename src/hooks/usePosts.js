import { useState, useEffect } from 'react';
import { postApi } from '../api/postApi';

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await postApi.getAllPosts(0, 20);
      if (response.success) {
        setPosts(response.data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async (formData) => {
    const response = await postApi.createPost(formData);
    if (response.success) {
      setPosts([response.data, ...posts]);
    }
    return response;
  };

  const likePost = async (postId) => {
    const post = posts.find(p => p.id === postId);
    const response = post.likedByCurrentUser 
      ? await postApi.unlikePost(postId)
      : await postApi.likePost(postId);
    
    if (response.success) {
      setPosts(posts.map(p => p.id === postId ? response.data : p));
    }
    return response;
  };

  const deletePost = async (postId) => {
    const response = await postApi.deletePost(postId);
    if (response.success) {
      setPosts(posts.filter(p => p.id !== postId));
    }
    return response;
  };

  return {
    posts,
    loading,
    error,
    fetchPosts,
    createPost,
    likePost,
    deletePost,
  };
};