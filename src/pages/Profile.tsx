import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ClipboardList, Heart, MapPin, Gift, Bell, 
  Settings, HelpCircle, Info, LogOut, ChevronRight,
  Camera, LogIn, Check, X, Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';

const AVATARS = [
  'https://i.postimg.cc/httNxF0X/c0a39348-2342-47b0-9302-5d757a66cdb2.png',
  'https://i.postimg.cc/52Fv0yC1/f7f7f32e-6709-496f-a1e2-173e733bbcad.png',
  'https://i.postimg.cc/PJPJRVW7/cb767773-eaec-4ae5-a2ce-d7eedee66b24.png',
  'https://i.postimg.cc/XNmYv8cS/e124248e-d5d7-4e04-b98d-eb76d615c0ed.png',
  'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200'
];

const menuItems = [
  { id: 'orders', label: 'My Orders', icon: ClipboardList, path: '/orders' },
  { id: 'favorites', label: 'Favorites', icon: Heart, path: '/favorites' },
  { id: 'addresses', label: 'Saved Addresses', icon: MapPin, path: '/addresses' },
  { id: 'loyalty', label: 'Loyalty Points', icon: Gift, path: '/loyalty', badge: '120 pts' },
  { id: 'notifications', label: 'Notifications', icon: Bell, path: '/notifications' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  { id: 'help', label: 'Help & Support', icon: HelpCircle, path: '/help' },
  { id: 'about', label: 'About Coffee Vibe', icon: Info, path: '/about' },
];

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, updateProfile, loading } = useAppStore();
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('user_interacted');
    navigate('/');
  };

  const handleSelectAvatar = async (url: string) => {
    await updateProfile({ photoUrl: url });
    setShowAvatarPicker(false);
  };

  return (
    <div className="px-4 py-8 flex flex-col gap-8 text-[#2D1B08] relative min-h-screen pb-28">
      <div className="absolute top-0 left-0 w-full h-[200px] bg-[#C9794D]/10 rounded-b-[100%] blur-3xl z-0" />
      
      {/* Profile Info */}
      <div className="flex flex-col items-center gap-3 relative z-10">
        <div className="relative">
          <motion.div 
            whileTap={{ scale: 0.95 }}
            className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#C9794D] bg-[#F7F2EB] flex items-center justify-center shadow-lg relative group"
          >
            {user?.photoUrl ? (
              <img src={user.photoUrl} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-3xl font-black text-[#C9794D]">{user?.name?.charAt(0) || 'G'}</span>
            )}
            {loading && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <Loader2 size={24} className="text-white animate-spin" />
              </div>
            )}
          </motion.div>
          {user && (
            <button 
              onClick={() => setShowAvatarPicker(true)}
              className="absolute bottom-0 right-0 w-8 h-8 bg-[#C9794D] text-white rounded-full border-2 border-white flex items-center justify-center shadow-md active:scale-90 transition-transform"
            >
              <Camera size={14} />
            </button>
          )}
        </div>
        <div className="text-center">
          <h1 className="text-xl font-extrabold text-[#2D1B08]">{user?.name || 'Guest User'}</h1>
          <p className="text-stone-400 text-xs mt-0.5 font-medium">{user?.phone || 'Sign in to sync your rewards'}</p>
        </div>
      </div>

      {/* Loyalty Card Preview */}
      <motion.div 
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate('/loyalty')}
        className="bg-gradient-to-br from-[#2D1B08] to-[#422A14] p-6 rounded-3xl text-white shadow-xl relative overflow-hidden group z-10"
      >
        <div 
          className="absolute inset-0 opacity-15 mix-blend-overlay bg-cover bg-center"
          style={{ backgroundImage: `url('https://i.pinimg.com/736x/25/2f/20/252f20859a24ffd746abd7bbd5af95e8.jpg')` }}
        />
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-amber-200/70 text-[10px] font-bold uppercase tracking-wider">Loyalty Points</p>
              <h2 className="text-2xl font-black mt-1 text-[#E8A57A]">{user ? user.loyaltyPoints.toLocaleString() : '0'}</h2>
            </div>
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-[#E8A57A]">
              <Gift size={20} />
            </div>
          </div>
          <div className="flex justify-between items-end">
            <p className="text-xs text-stone-300">Tier: <span className="text-white font-bold">{user ? 'Gold Member' : 'New Member'}</span></p>
            <div className="flex items-center gap-1 text-[10px] font-bold bg-[#C9794D] text-white px-3 py-1.5 rounded-full shadow-sm">
              View Rewards <ChevronRight size={12} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Simplified Action List */}
      <div className="flex flex-col gap-2.5 relative z-10">
        {user ? (
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 p-4 rounded-2xl bg-red-50/50 border border-red-100 mt-2 active:bg-red-100/80 transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
              <LogOut size={16} />
            </div>
            <span className="font-bold text-sm text-red-600">Logout</span>
          </button>
        ) : (
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-4 p-4 rounded-2xl bg-amber-50 border border-[#EADCC9] mt-2 active:bg-amber-100 transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-amber-100 text-[#C9794D] flex items-center justify-center">
              <LogIn size={16} />
            </div>
            <span className="font-bold text-sm text-[#C9794D]">Sign In</span>
          </button>
        )}
      </div>

      {/* Avatar Picker Modal */}
      <AnimatePresence>
        {showAvatarPicker && (
          <div className="fixed inset-0 z-50 flex items-end justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="bg-white w-full max-w-sm rounded-t-[40px] rounded-b-[40px] p-6 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-black text-lg text-[#2D1B08]">Select Profile Image</h3>
                <button 
                  onClick={() => setShowAvatarPicker(false)}
                  className="p-2 bg-stone-100 rounded-full text-stone-400"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                {AVATARS.map((url) => (
                  <motion.button
                    key={url}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSelectAvatar(url)}
                    className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                      user?.photoUrl === url ? 'border-[#C9794D] shadow-md' : 'border-transparent'
                    }`}
                  >
                    <img src={url} alt="Avatar option" className="w-full h-full object-cover" />
                    {user?.photoUrl === url && (
                      <div className="absolute inset-0 bg-[#C9794D]/20 flex items-center justify-center">
                        <Check size={24} className="text-[#C9794D]" />
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>

              <button
                onClick={() => setShowAvatarPicker(false)}
                className="w-full py-4 bg-[#2D1B08] text-white rounded-2xl font-bold text-sm shadow-lg"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

