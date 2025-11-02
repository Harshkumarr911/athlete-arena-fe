import React from 'react';
import { Users as UsersIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';  // ✅ Add this
import Avatar from '../common/Avatar';
import Button from '../common/Button';

const UserCard = ({ user, onFollow, isFollowing, currentUserId }) => {
  const navigate = useNavigate();  // ✅ Add this
  const isCurrentUser = currentUserId === user.id;

  // ✅ Add click handler
  const handleCardClick = (e) => {
    // Don't navigate if clicking the follow button
    if (e.target.closest('button')) return;
    navigate(`/profile/${user.id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition shadow-xl cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <Avatar src={user.avatar} name={user.name} size="lg" role={user.role} />
        <div className="flex-1">
          <h3 className="font-semibold text-white text-lg hover:text-purple-300 transition">{user.name}</h3>
          <p className="text-sm text-gray-400">@{user.username}</p>
          <p className="text-xs text-purple-300 mt-1">{user.role}</p>
          {user.bio && (
            <p className="text-sm text-gray-400 mt-2 line-clamp-2">{user.bio}</p>
          )}
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <UsersIcon className="w-4 h-4" />
              {user.followerCount} followers
            </span>
            <span>{user.followingCount} following</span>
          </div>
        </div>
        {!isCurrentUser && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onFollow(user.id);
            }}
            variant={isFollowing ? 'secondary' : 'primary'}
            size="sm"
          >
            {isFollowing ? 'Following' : 'Follow'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserCard;