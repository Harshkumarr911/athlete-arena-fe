import React from 'react';
import { User } from 'lucide-react';

const Avatar = ({ src, name, size = 'md', role }) => {
  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-lg',
    lg: 'w-16 h-16 text-2xl',
    xl: 'w-24 h-24 text-4xl',
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getEmoji = (role) => {
    if (role === 'COACH') return '🎯';
    if (role === 'ATHLETE') return '⚡';
    return '👤';
  };

  return (
    <div className={`${sizes[size]} bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0`}>
      {src ? (
        <img src={src} alt={name} className="w-full h-full rounded-full object-cover" />
      ) : role ? (
        <span>{getEmoji(role)}</span>
      ) : (
        <span className="text-white font-bold">{getInitials(name)}</span>
      )}
    </div>
  );
};

export default Avatar;