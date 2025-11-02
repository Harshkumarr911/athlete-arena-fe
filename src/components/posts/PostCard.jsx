// import React from 'react';
// import { Heart, MessageCircle, Share2, Trash2 } from 'lucide-react';
// import { postApi } from '../../api/postApi';
// import { useAuth } from '../../hooks/useAuth';

// const PostCard = ({ post, onUpdate, onDelete }) => {
//   const { user } = useAuth();

//   const handleLike = async () => {
//     try {
//       const response = post.likedByCurrentUser 
//         ? await postApi.unlikePost(post.id)
//         : await postApi.likePost(post.id);
//       onUpdate(response.data);
//     } catch (error) {
//       console.error('Failed to like post:', error);
//     }
//   };

//   const handleDelete = async () => {
//     if (window.confirm('Are you sure you want to delete this post?')) {
//       try {
//         await postApi.deletePost(post.id);
//         onDelete(post.id);
//       } catch (error) {
//         console.error('Failed to delete post:', error);
//       }
//     }
//   };

//   const formatTimeAgo = (dateString) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const seconds = Math.floor((now - date) / 1000);
    
//     if (seconds < 60) return 'Just now';
//     if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
//     if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
//     return `${Math.floor(seconds / 86400)}d ago`;
//   };

//   return (
//     <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition shadow-xl transform hover:scale-[1.01] duration-300">
//       <div className="flex items-start gap-4">
//         <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
//           {post.user.role === 'COACH' ? '🎯' : '⚡'}
//         </div>
//         <div className="flex-1">
//           <div className="flex items-center justify-between mb-2">
//             <div className="flex items-center gap-2">
//               <h3 className="font-semibold text-white">{post.user.name}</h3>
//               <span className="text-xs px-2 py-1 bg-purple-600/30 rounded-full text-purple-300">
//                 {post.user.role}
//               </span>
//               <span className="text-sm text-gray-400">• {formatTimeAgo(post.createdAt)}</span>
//             </div>
//             {user?.id === post.user.id && (
//               <button 
//                 onClick={handleDelete}
//                 className="text-gray-400 hover:text-red-400 transition p-2"
//               >
//                 <Trash2 className="w-4 h-4" />
//               </button>
//             )}
//           </div>
          
//           <p className="text-gray-200 mb-4 whitespace-pre-wrap">{post.content}</p>
          
//           {post.imageUrl && (
//             <div className="bg-black/40 rounded-xl overflow-hidden mb-4">
//               <img 
//                 src={`http://localhost:8080${post.imageUrl}`} 
//                 alt="Post" 
//                 className="w-full object-cover"
//               />
//             </div>
//           )}
          
//           {post.videoUrl && (
//             <div className="bg-black/40 rounded-xl p-8 mb-4 flex items-center justify-center cursor-pointer hover:bg-black/50 transition">
//               <div className="text-center">
//                 <div className="w-16 h-16 mx-auto mb-2 bg-purple-500/20 rounded-full flex items-center justify-center">
//                   <svg className="w-8 h-8 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M8 5v14l11-7z"/>
//                   </svg>
//                 </div>
//                 <p className="text-gray-400 text-sm">Click to play video</p>
//               </div>
//             </div>
//           )}

//           <div className="flex items-center gap-6 pt-4 border-t border-purple-500/20">
//             <button
//               onClick={handleLike}
//               className={`flex items-center gap-2 transition ${
//                 post.likedByCurrentUser ? 'text-pink-500' : 'text-gray-400 hover:text-pink-500'
//               }`}
//             >
//               <Heart className={`w-5 h-5 ${post.likedByCurrentUser ? 'fill-current' : ''}`} />
//               <span>{post.likeCount}</span>
//             </button>
//             <button className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition">
//               <MessageCircle className="w-5 h-5" />
//               <span>{post.commentCount}</span>
//             </button>
//             <button className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition">
//               <Share2 className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PostCard;

import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Trash2, Play, X } from 'lucide-react';
import { postApi } from '../../api/postApi';
import { useAuth } from '../../hooks/useAuth';
import Modal from '../common/Modal';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ post, onUpdate, onDelete }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showVideoModal, setShowVideoModal] = useState(false);

  const handleLike = async () => {
    try {
      const response = post.likedByCurrentUser 
        ? await postApi.unlikePost(post.id)
        : await postApi.likePost(post.id);
      onUpdate(response.data);
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await postApi.deletePost(post.id);
        onDelete(post.id);
      } catch (error) {
        console.error('Failed to delete post:', error);
      }
    }
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  const getVideoStreamUrl = (videoUrl) => {
    if (!videoUrl) return null;
    const filename = videoUrl.split('/').pop();
    return `http://localhost:8080/api/videos/stream/${filename}`;
  };
  const handlePlayVideo = (videoUrl) => {
  const filename = videoUrl.split('/').pop();
  const streamUrl = `http://localhost:8080/api/videos/stream/${filename}`;
  window.open(streamUrl, '_blank');
};

  return (
    <>
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition shadow-xl transform hover:scale-[1.01] duration-300">
        <div className="flex items-start gap-4">
          <div onClick={() => navigate(`/profile/${post.user.id}`)} className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
            {post.user.role === 'COACH' ? '🎯' : '⚡'}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <h3 onClick={() => navigate(`/profile/${post.user.id}`)} className="font-semibold text-white">{post.user.name}</h3>
                <span className="text-xs px-2 py-1 bg-purple-600/30 rounded-full text-purple-300">
                  {post.user.role}
                </span>
                <span className="text-sm text-gray-400">• {formatTimeAgo(post.createdAt)}</span>
              </div>
              {user?.id === post.user.id && (
                <button 
                  onClick={handleDelete}
                  className="text-gray-400 hover:text-red-400 transition p-2"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
            
            <p className="text-gray-200 mb-4 whitespace-pre-wrap">{post.content}</p>
            
            {/* Image Display */}
            {post.imageUrl && (
              <div className="bg-black/40 rounded-xl overflow-hidden mb-4">
                <img 
                  src={`http://localhost:8080${post.imageUrl}`} 
                  alt="Post" 
                  className="w-full object-cover max-h-96"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    console.error('Image failed to load');
                  }}
                />
              </div>
            )}
            
            {/* Video Display with Thumbnail */}
            {post.videoUrl && (
              <div 
                onClick={() => setShowVideoModal(true)}
                className="bg-black/40 rounded-xl overflow-hidden mb-4 cursor-pointer hover:bg-black/50 transition group relative"
              >
                <div className="relative aspect-video">
                  {/* Video Thumbnail */}
                  <video 
                    src={getVideoStreamUrl(post.videoUrl)}
                    className="w-full h-full object-cover"
                    preload="metadata"
                    onError={(e) => {
                      console.error('Video failed to load',e);
                    }}
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-16 h-16 bg-purple-500/80 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                  </div>
                  {/* Video Label */}
                  <div className="absolute top-2 right-2 bg-black/70 px-3 py-1 rounded-full text-xs text-white flex items-center gap-1">
                    <Play className="w-3 h-3" />
                    Video
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-6 pt-4 border-t border-purple-500/20">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 transition ${
                  post.likedByCurrentUser ? 'text-pink-500' : 'text-gray-400 hover:text-pink-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${post.likedByCurrentUser ? 'fill-current' : ''}`} />
                <span>{post.likeCount}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition">
                <MessageCircle className="w-5 h-5" />
                <span>{post.commentCount}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Player Modal */}
      {post.videoUrl && (
        <Modal 
          isOpen={showVideoModal} 
          onClose={() => setShowVideoModal(false)}
          title="Video"
          size="xl"
        >
          <div className="relative bg-black rounded-xl overflow-hidden">
            <video
              controls
              autoPlay
              className="w-full max-h-[70vh] object-contain"
              src={getVideoStreamUrl(post.videoUrl)}
            >
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xl">
                {post.user.role === 'COACH' ? '🎯' : '⚡'}
              </div>
              <div>
                <p className="font-semibold text-white">{post.user.name}</p>
                <p className="text-sm text-gray-400">{formatTimeAgo(post.createdAt)}</p>
              </div>
            </div>
            <p className="text-gray-300">{post.content}</p>
          </div>
        </Modal>
      )}
    </>
  );
};

export default PostCard;