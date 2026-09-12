import React from 'react';
import { Bell, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-xl border-b border-[#EADCC9]/50 px-4 py-3.5 flex items-center justify-between shadow-xs">
      <div className="flex items-center gap-2">
        <button className="p-2 -ml-2 text-[#2D1B08] active:scale-95 transition-transform">
          <Menu size={24} />
        </button>
      </div>

      <div className="flex items-center justify-center flex-1">
        <img 
          src="https://i.postimg.cc/httNxF0X/c0a39348-2342-47b0-9302-5d757a66cdb2.png" 
          alt="Coffee Vibe" 
          className="h-9 object-contain cursor-pointer"
          onClick={() => navigate('/home')}
        />
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={() => navigate('/notifications')}
          className="p-2 -mr-2 rounded-full transition-colors relative text-[#2D1B08] active:scale-95"
        >
          <Bell size={22} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#C9794D] rounded-full border-2 border-white" />
        </button>
      </div>
    </header>
  );
};

