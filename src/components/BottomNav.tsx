import React from 'react';
import { motion } from 'motion/react';
import { Home, Heart, Coffee, Settings, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

const navItems = [
  { id: 'home', label: 'Home', icon: Home, path: '/home' },
  { id: 'favorites', label: 'Favorite', icon: Heart, path: '/home/favorites' },
  { id: 'custom', label: 'Custom', icon: Coffee, path: '/home/menu' },
  { id: 'settings', label: 'Setting', icon: Settings, path: '/home/settings' },
  { id: 'profile', label: 'Profile', icon: User, path: '/home/profile' }
];

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#151515]/80 backdrop-blur-xl border-t border-white/5 px-4 pb-safe-area-inset-bottom rounded-t-[30px]">
      <div className="max-w-md mx-auto flex items-center justify-between py-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className="relative flex flex-col items-center justify-center w-14 h-12 gap-1 group"
            >
              <motion.div
                animate={isActive ? { y: -2, scale: 1.1 } : { y: 0, scale: 1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={cn(
                  "p-1 rounded-xl transition-colors duration-200",
                  isActive ? "text-[#C9794D]" : "text-gray-500 group-hover:text-gray-300"
                )}
              >
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              </motion.div>
              
              <span className={cn(
                "text-[10px] font-medium transition-colors duration-200",
                isActive ? "text-[#C9794D]" : "text-gray-500"
              )}>
                {item.label}
              </span>

              {isActive && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute -top-3 w-8 h-1 rounded-full bg-[#C9794D]"
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
