import React from 'react';

const Card = ({ children, className = '', hover = true, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 shadow-xl ${
        hover ? 'hover:border-purple-500/40 transition transform hover:scale-[1.01] duration-300' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card; 