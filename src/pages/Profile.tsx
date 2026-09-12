import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  ClipboardList, Heart, MapPin, Gift, Bell, 
  Settings, HelpCircle, Info, LogOut, ChevronRight,
  Camera, LogIn
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  { id: 'orders', label: 'My Orders', icon: ClipboardList, path: '/orders' },
  { id: 'favorites', label: 'Favorites', icon: Heart, path: '/home/favorites' },
  { id: 'addresses', label: 'Saved Addresses', icon: MapPin, path: '/addresses' },
  { id: 'loyalty', label: 'Loyalty Points', icon: Gift, path: '/loyalty', badge: '120 pts' },
  { id: 'notifications', label: 'Notifications', icon: Bell, path: '/notifications' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  { id: 'help', label: 'Help & Support', icon: HelpCircle, path: '/help' },
  { id: 'about', label: 'About Coffee Vibe', icon: Info, path: '/about' },
];

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('userMobile');
    if (stored) {
      setMobileNumber(stored);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userMobile');
    setMobileNumber(null);
    navigate('/');
  };

  return (
    <div className="px-4 py-8 flex flex-col gap-8 text-[#2D1B08] relative">
      <div className="absolute top-0 left-0 w-full h-[200px] bg-[#C9794D]/10 rounded-b-[100%] blur-3xl z-0" />
      
      {/* Profile Info */}
      <div className="flex flex-col items-center gap-3 relative z-10">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#C9794D] bg-[#F7F2EB] flex items-center justify-center shadow-md">
            <span className="text-3xl font-black text-[#C9794D]">{mobileNumber ? 'U' : 'G'}</span>
          </div>
          {mobileNumber && (
            <button className="absolute bottom-0 right-0 w-7 h-7 bg-[#C9794D] text-white rounded-full border-2 border-white flex items-center justify-center shadow-md">
              <Camera size={13} />
            </button>
          )}
        </div>
        <div className="text-center">
          <h1 className="text-xl font-extrabold text-[#2D1B08]">{mobileNumber ? 'Drink Cafe Member' : 'Guest User'}</h1>
          <p className="text-stone-400 text-xs mt-0.5 font-medium">{mobileNumber ? mobileNumber : 'Sign in to sync your rewards'}</p>
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
              <h2 className="text-2xl font-black mt-1 text-[#E8A57A]">{mobileNumber ? '1,240' : '0'}</h2>
            </div>
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-[#E8A57A]">
              <Gift size={20} />
            </div>
          </div>
          <div className="flex justify-between items-end">
            <p className="text-xs text-stone-300">Tier: <span className="text-white font-bold">{mobileNumber ? 'Gold Member' : 'New Member'}</span></p>
            <div className="flex items-center gap-1 text-[10px] font-bold bg-[#C9794D] text-white px-3 py-1.5 rounded-full shadow-sm">
              View Rewards <ChevronRight size={12} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Menu List */}
      <div className="flex flex-col gap-2.5 relative z-10">
        {menuItems.map((item, idx) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.04 }}
            onClick={() => navigate(item.path)}
            className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#EADCC9]/60 shadow-xs active:bg-amber-50/60 transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-[#FAF7F2] text-stone-500 flex items-center justify-center group-hover:text-[#C9794D] transition-colors">
              <item.icon size={16} />
            </div>
            <span className="font-bold text-sm flex-1 text-left text-[#2D1B08]">{item.label}</span>
            {item.badge && mobileNumber && (
              <span className="text-[10px] font-bold bg-amber-100 text-[#C9794D] px-2 py-1 rounded-md mr-1">
                {item.badge}
              </span>
            )}
            <ChevronRight size={16} className="text-stone-300 group-hover:text-[#C9794D] transition-colors" />
          </motion.button>
        ))}

        {mobileNumber ? (
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
    </div>
  );
};

