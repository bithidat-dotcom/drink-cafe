import React from 'react';
import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { Header } from './Header';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#151515] text-white pb-24 selection:bg-[#C9794D]/30">
      <Header />
      <main className="max-w-md mx-auto relative z-10">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};
