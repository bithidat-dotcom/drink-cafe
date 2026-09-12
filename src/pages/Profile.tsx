import React from 'react';
import { motion } from 'motion/react';
import { 
  ClipboardList, Heart, MapPin, Gift, Bell, 
  Settings, HelpCircle, Info, LogOut, ChevronRight,
  Camera, LogIn
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';

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
  const { user, logout, signInWithGoogle } = useAuth();

  return (
    <div className="px-4 py-8 flex flex-col gap-8 text-white relative">
      <div className="absolute top-0 left-0 w-full h-[200px] bg-[#C9794D]/10 rounded-b-[100%] blur-3xl z-0" />
      
      {/* Profile Info */}
      <div className="flex flex-col items-center gap-4 relative z-10">
        <div className="relative">
          <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-[#C9794D] bg-[#1C1C1C] flex items-center justify-center">
            {user?.photoURL ? (
              <img 
                src={user.photoURL} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-4xl font-bold text-[#C9794D]">{user?.displayName?.charAt(0) || 'G'}</span>
            )}
          </div>
          {user && (
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#C9794D] text-white rounded-full border-2 border-[#151515] flex items-center justify-center shadow-lg">
              <Camera size={14} />
            </button>
          )}
        </div>
        <div className="text-center">
          <h1 className="text-xl font-bold">{user?.displayName || 'Guest User'}</h1>
          <p className="text-gray-400 text-xs mt-1">{user?.email || 'Sign in to sync your rewards'}</p>
        </div>
      </div>

      {/* Loyalty Card Preview */}
      <motion.div 
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate('/loyalty')}
        className="bg-gradient-to-br from-[#242424] to-[#1C1C1C] p-6 rounded-3xl text-white shadow-xl border border-white/5 relative overflow-hidden group z-10"
      >
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#C9794D]/20 rounded-full blur-3xl transition-colors" />
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Loyalty Points</p>
              <h2 className="text-2xl font-black mt-1 text-[#C9794D]">{user ? '1,240' : '0'}</h2>
            </div>
            <div className="w-10 h-10 bg-[#C9794D]/10 rounded-full flex items-center justify-center text-[#C9794D]">
              <Gift size={20} />
            </div>
          </div>
          <div className="flex justify-between items-end">
            <p className="text-xs text-gray-400">Tier: <span className="text-white font-bold">{user ? 'Gold Member' : 'New Member'}</span></p>
            <div className="flex items-center gap-1 text-[10px] font-bold bg-[#C9794D]/20 text-[#C9794D] px-3 py-1 rounded-full">
              View Rewards <ChevronRight size={12} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Menu List */}
      <div className="flex flex-col gap-3 relative z-10">
        {menuItems.map((item, idx) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => navigate(item.path)}
            className="flex items-center gap-4 p-4 rounded-2xl bg-[#1C1C1C] border border-white/5 active:bg-[#242424] transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-[#242424] text-gray-400 flex items-center justify-center group-hover:text-[#C9794D] transition-colors">
              <item.icon size={16} />
            </div>
            <span className="font-semibold text-sm flex-1 text-left">{item.label}</span>
            {item.badge && user && (
              <span className="text-[10px] font-bold bg-[#C9794D]/20 text-[#C9794D] px-2 py-1 rounded-md mr-2">
                {item.badge}
              </span>
            )}
            <ChevronRight size={16} className="text-gray-600 group-hover:text-[#C9794D] transition-colors" />
          </motion.button>
        ))}

        {user ? (
          <button 
            onClick={async () => {
              await logout();
              navigate('/');
            }}
            className="flex items-center gap-4 p-4 rounded-2xl bg-[#1C1C1C] border border-white/5 mt-2 active:bg-red-500/10 transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center">
              <LogOut size={16} />
            </div>
            <span className="font-semibold text-sm text-red-500">Logout</span>
          </button>
        ) : (
          <button 
            onClick={() => signInWithGoogle()}
            className="flex items-center gap-4 p-4 rounded-2xl bg-[#1C1C1C] border border-white/5 mt-2 active:bg-[#C9794D]/10 transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-[#C9794D]/10 text-[#C9794D] flex items-center justify-center">
              <LogIn size={16} />
            </div>
            <span className="font-semibold text-sm text-[#C9794D]">Sign In</span>
          </button>
        )}
      </div>
    </div>
  );
};
