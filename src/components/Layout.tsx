import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { Header } from './Header';
import { ScrollUXButton } from './ScrollUXButton';

import { useAppStore } from '../store/useAppStore';

export const Layout: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAppStore();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D1B08] pb-24 selection:bg-[#C9794D]/30">
      <Header />
      <main className="max-w-md mx-auto relative z-10">
        <Outlet />
      </main>
      <ScrollUXButton />
      <BottomNav />
    </div>
  );
};

