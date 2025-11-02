import React, { useState, useEffect } from 'react';
import { Users, Shield, Zap } from 'lucide-react';
import Header from '../components/layout/Header';
import UserList from '../components/community/UserList';
import { userApi } from '../api/userApi';
import { useAuth } from '../hooks/useAuth';

const Community = () => {
  const { user } = useAuth();
  const [coaches, setCoaches] = useState([]);
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [followingIds, setFollowingIds] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const [coachesRes, athletesRes] = await Promise.all([
        userApi.getAllCoaches(),
        userApi.getAllAthletes(),
      ]);
      
      if (coachesRes.success) setCoaches(coachesRes.data);
      if (athletesRes.success) setAthletes(athletesRes.data);
      
      // Get current user's following list
      if (user) {
        // You might need to create an API endpoint for this
        // For now, we'll leave it empty
        setFollowingIds([]);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async (userId) => {
    try {
      const isFollowing = followingIds.includes(userId);
      if (isFollowing) {
        await userApi.unfollowUser(userId);
        setFollowingIds(followingIds.filter(id => id !== userId));
      } else {
        await userApi.followUser(userId);
        setFollowingIds([...followingIds, userId]);
      }
    } catch (error) {
      console.error('Failed to follow/unfollow user:', error);
    }
  };

  const allUsers = [...coaches, ...athletes];
  const displayUsers = activeTab === 'all' ? allUsers : activeTab === 'coaches' ? coaches : athletes;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Community</h2>
          <p className="text-gray-400">Connect with coaches and athletes</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-purple-500/20 pb-4">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition ${
              activeTab === 'all'
                ? 'bg-purple-600 text-white'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Users className="w-5 h-5" />
            All ({allUsers.length})
          </button>
          <button
            onClick={() => setActiveTab('coaches')}
            className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition ${
              activeTab === 'coaches'
                ? 'bg-purple-600 text-white'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Shield className="w-5 h-5" />
            Coaches ({coaches.length})
          </button>
          <button
            onClick={() => setActiveTab('athletes')}
            className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition ${
              activeTab === 'athletes'
                ? 'bg-purple-600 text-white'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Zap className="w-5 h-5" />
            Athletes ({athletes.length})
          </button>
        </div>

        <UserList 
          users={displayUsers}
          loading={loading}
          onFollow={handleFollow}
          followingIds={followingIds}
          currentUserId={user?.id}
        />
      </div>
    </div>
  );
};

export default Community;