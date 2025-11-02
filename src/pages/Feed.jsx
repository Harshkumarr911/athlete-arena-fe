import React, { useState, useEffect } from 'react';
import { TrendingUp, Target, Zap, MessageCircle } from 'lucide-react';
import Header from '../components/layout/Header';
import CreatePost from '../components/posts/CreatePost';
import PostCard from '../components/posts/PostCard';
import { postApi } from '../api/postApi';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await postApi.getAllPosts(0, 20);
      if (response.success) {
        setPosts(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handlePostUpdate = (updatedPost) => {
    setPosts(posts.map(post => post.id === updatedPost.id ? updatedPost : post));
  };

  const handlePostDelete = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <CreatePost onPostCreated={handlePostCreated} />
            
            {loading ? (
              <div className="text-center text-white py-12">Loading posts...</div>
            ) : posts.length === 0 ? (
              <div className="text-center text-gray-400 py-12">
                <p className="text-xl mb-2">No posts yet</p>
                <p className="text-sm">Be the first to share something!</p>
              </div>
            ) : (
              posts.map(post => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  onUpdate={handlePostUpdate}
                  onDelete={handlePostDelete}
                />
              ))
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 shadow-xl">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                Trending Topics
              </h3>
              <div className="space-y-3">
                {['#SpeedTraining', '#StrengthBuilding', '#Recovery', '#Nutrition'].map(tag => (
                  <div key={tag} className="text-purple-300 hover:text-purple-200 cursor-pointer flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg transition">
                    <Target className="w-4 h-4" />
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 shadow-xl">
              <h3 className="font-bold text-white mb-4">Upcoming Events</h3>
              <div className="space-y-3 text-sm">
                <div className="text-gray-300 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition">
                  <div className="font-semibold text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    Live Training Session
                  </div>
                  <div className="text-gray-400 mt-1">Today, 6:00 PM</div>
                </div>
                <div className="text-gray-300 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition">
                  <div className="font-semibold text-white flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-blue-400" />
                    Q&A with Coach Mike
                  </div>
                  <div className="text-gray-400 mt-1">Tomorrow, 3:00 PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;