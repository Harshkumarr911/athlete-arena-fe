import React from 'react';
import UserCard from './UserCard';
import Loader from '../common/Loader';

const UserList = ({ users, loading, onFollow, followingIds, currentUserId }) => {
  if (loading) {
    return <Loader message="Loading community members..." />;
  }

  if (users.length === 0) {
    return (
      <div className="text-center text-gray-400 py-12">
        <div className="text-6xl mb-4">👥</div>
        <p className="text-xl mb-2">No users found</p>
        <p className="text-sm">Be the first to join the community!</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {users.map(user => (
        <UserCard 
          key={user.id} 
          user={user}
          onFollow={onFollow}
          isFollowing={followingIds?.includes(user.id)}
          currentUserId={currentUserId}
        />
      ))}
    </div>
  );
};

export default UserList;