import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, Award, ArrowLeft } from 'lucide-react';
import Header from '../components/layout/Header';
import PostCard from '../components/posts/PostCard';
import VideoCard from '../components/videos/VideoCard';
import Avatar from '../components/common/Avatar';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import { userApi } from '../api/userApi';
import { postApi } from '../api/postApi';
import { videoApi } from '../api/videoApi';
import { useAuth } from '../hooks/useAuth';

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const [profileUser, setProfileUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [videos, setVideos] = useState([]);
  const [activeTab, setActiveTab] = useState('posts');
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, [id]);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      // Fetch user profile
      const userRes = await userApi.getUserById(id);
      if (userRes.success) {
        setProfileUser(userRes.data);
        
        // Check if current user is following this profile
        if (currentUser && currentUser.id !== id) {
          // You'll need to implement this in your backend
          // For now, we'll assume not following
          setIsFollowing(false);
        }
      }
      
      // Fetch user's posts
      const postsRes = await postApi.getAllPosts(0, 50);
      if (postsRes.success) {
        setPosts(postsRes.data.filter(post => post.user.id === id));
      }
      
      // Fetch user's videos if coach
      if (userRes.data.role === 'COACH') {
        const videosRes = await videoApi.getAllVideos(0, 50);
        if (videosRes.success) {
          setVideos(videosRes.data.filter(video => video.coach.id === id));
        }
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        await userApi.unfollowUser(id);
      } else {
        await userApi.followUser(id);
      }
      setIsFollowing(!isFollowing);
      fetchUserProfile(); // Refresh to update follower count
    } catch (error) {
      console.error('Failed to follow/unfollow:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Header />
        <Loader fullScreen message="Loading profile..." />
      </div>
    );
  }

  if (!profileUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-white mb-4">User not found</h2>
          <Button onClick={() => navigate('/community')}>Back to Community</Button>
        </div>
      </div>
    );
  }

  const isOwnProfile = currentUser?.id === profileUser.id;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* ✅ Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        {/* Profile Header */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20 shadow-xl mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar src={profileUser.avatar} name={profileUser.name} size="xl" role={profileUser.role} />
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                <h1 className="text-3xl font-bold text-white">{profileUser.name}</h1>
                <span className="px-4 py-1 bg-purple-600/30 rounded-full text-purple-300">
                  {profileUser.role}
                </span>
              </div>
              
              <p className="text-gray-400 mb-4">@{profileUser.username}</p>
              
              {profileUser.bio && (
                <p className="text-gray-300 mb-4 max-w-2xl">{profileUser.bio}</p>
              )}
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm text-gray-400 mb-4">
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <strong className="text-white">{profileUser.followerCount}</strong> followers
                </span>
                <span className="flex items-center gap-2">
                  <strong className="text-white">{profileUser.followingCount}</strong> following
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Joined {new Date(profileUser.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              </div>
              
              {!isOwnProfile && (
                <Button 
                  onClick={handleFollow}
                  variant={isFollowing ? 'secondary' : 'primary'}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-purple-500/20 pb-4">
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-4 py-2 rounded-t-lg transition ${
              activeTab === 'posts'
                ? 'bg-purple-600 text-white'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Posts ({posts.length})
          </button>
          {profileUser.role === 'COACH' && (
            <button
              onClick={() => setActiveTab('videos')}
              className={`px-4 py-2 rounded-t-lg transition ${
                activeTab === 'videos'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Videos ({videos.length})
            </button>
          )}
        </div>

        {/* Content */}
        {activeTab === 'posts' ? (
          <div className="space-y-6">
            {posts.length === 0 ? (
              <div className="text-center text-gray-400 py-12">
                <p className="text-xl">No posts yet</p>
              </div>
            ) : (
              posts.map(post => (
                <PostCard 
                  key={post.id} 
                  post={post}
                  onUpdate={(updated) => setPosts(posts.map(p => p.id === updated.id ? updated : p))}
                  onDelete={(postId) => setPosts(posts.filter(p => p.id !== postId))}
                />
              ))
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {videos.length === 0 ? (
              <div className="col-span-3 text-center text-gray-400 py-12">
                <p className="text-xl">No videos yet</p>
              </div>
            ) : (
              videos.map(video => (
                <VideoCard 
                  key={video.id} 
                  video={video}
                  onClick={() => {
                    // Open video modal or navigate to video page
                  }}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;