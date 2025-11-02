import React, { useState } from 'react';
import { Award, Bell, LogOut, Menu, X, Home, Film, Users, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // ✅ Add profile click handler
  const handleProfileClick = () => {
    if (user?.id) {
      navigate(`/profile/${user.id}`);
    }
  };

  const navItems = [
    { name: 'Feed', icon: Home, path: '/feed' },
    { name: 'Videos', icon: Film, path: '/videos' },
    { name: 'Community', icon: Users, path: '/community' },
  ];

  return (
    <header className="bg-black/40 backdrop-blur-xl border-b border-purple-500/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/feed')}>
            <Award className="w-8 h-8 text-purple-400 animate-pulse" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AthleteHub
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className="px-4 py-2 rounded-xl transition flex items-center gap-2 text-gray-300 hover:text-white hover:bg-white/5"
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Bell className="w-6 h-6 text-gray-300 cursor-pointer hover:text-white transition animate-bounce" style={{animationDuration: '3s'}} />
            
            {/* ✅ Make profile section clickable */}
            <div 
              onClick={handleProfileClick}
              className="hidden md:flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-purple-500/20 cursor-pointer hover:bg-white/10 transition"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">{user?.name?.charAt(0)}</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{user?.name}</p>
                <p className="text-xs text-purple-300">{user?.role}</p>
              </div>
            </div>

            <button onClick={handleLogout} className="p-2 hover:bg-white/5 rounded-xl transition">
              <LogOut className="w-5 h-5 text-gray-300 hover:text-red-400" />
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => { navigate(item.path); setMobileMenuOpen(false); }}
                className="w-full px-4 py-2 rounded-xl transition flex items-center gap-2 text-gray-300 hover:bg-white/5"
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </button>
            ))}
            
            {/* ✅ Add profile button for mobile */}
            <button
              onClick={() => { handleProfileClick(); setMobileMenuOpen(false); }}
              className="w-full px-4 py-2 rounded-xl transition flex items-center gap-2 text-gray-300 hover:bg-white/5"
            >
              <User className="w-4 h-4" />
              My Profile
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;