import React from 'react';
import { Bell, MapPin, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { motion, AnimatePresence } from 'motion/react';

export const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 w-full bg-[#151515]/80 backdrop-blur-xl px-4 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <button className="p-2 -ml-2 text-white">
          <Menu size={24} />
        </button>
      </div>

      <div className="flex items-center justify-center flex-1">
        <img 
          src="https://i.postimg.cc/httNxF0X/c0a39348-2342-47b0-9302-5d757a66cdb2.png" 
          alt="Coffee Vibe" 
          className="h-8 object-contain cursor-pointer brightness-0 invert"
          onClick={() => navigate('/home')}
        />
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={() => navigate('/notifications')}
          className="p-2 -mr-2 rounded-full transition-colors relative text-white"
        >
          <Bell size={22} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#C9794D] rounded-full border-2 border-[#151515]" />
        </button>
      </div>
    </header>
  );
};
