import React from 'react';
import { Bell, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const cart = useAppStore((state) => state.cart);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-xl border-b border-[#EADCC9]/50 px-4 py-3 flex items-center justify-between shadow-xs">
      {/* Left side: Brand Logo */}
      <div className="flex items-center gap-2">
        <img 
          src="https://i.postimg.cc/httNxF0X/c0a39348-2342-47b0-9302-5d757a66cdb2.png" 
          alt="DRINK CAFE Logo" 
          className="h-9 object-contain cursor-pointer active:scale-95 transition-transform drop-shadow-xs"
          onClick={() => navigate('/home')}
        />
        <span 
          onClick={() => navigate('/home')} 
          className="font-black text-[#2D1B08] text-base tracking-tight cursor-pointer"
        >
          DRINK CAFE
        </span>
      </div>

      {/* Right side: Notification & Cart Buttons */}
      <div className="flex items-center gap-1.5">
        <button 
          onClick={() => navigate('/home/notifications')}
          className="p-2 rounded-full transition-colors relative text-[#2D1B08] hover:bg-stone-100 active:scale-95"
          aria-label="Notifications"
        >
          <Bell size={22} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C9794D] rounded-full border-2 border-white" />
        </button>

        <button 
          onClick={() => navigate('/home/cart')}
          className="p-2 rounded-full transition-colors relative text-[#2D1B08] hover:bg-stone-100 active:scale-95"
          aria-label="Cart"
        >
          <ShoppingBag size={22} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#C9794D] text-white font-extrabold text-[10px] min-w-[20px] h-5 px-1 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

