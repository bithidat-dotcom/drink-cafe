import React from 'react';
import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { Header } from './Header';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D1B08] pb-24 selection:bg-[#C9794D]/30">
      <Header />
      <main className="max-w-md mx-auto relative z-10">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

