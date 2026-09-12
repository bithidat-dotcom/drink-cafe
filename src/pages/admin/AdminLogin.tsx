import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, User, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple mock protection
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm bg-white p-8 rounded-[40px] shadow-xl shadow-[#4B3621]/5 border border-[#F5E6D3]/50"
      >
        <div className="flex flex-col items-center gap-4 mb-8">
          <img 
            src="https://i.postimg.cc/4x6J3RB3/file-0000000074a481faaa71d2779f8f7226.png" 
            alt="DRINK CAFE" 
            className="h-16 object-contain"
          />
          <h1 className="text-xl font-black text-[#4B3621]">Admin Portal</h1>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Admin Username" 
              defaultValue="admin"
              className="w-full bg-[#FAF9F6] border border-[#F5E6D3] rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#4B3621]/20"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="password" 
              placeholder="Admin Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#FAF9F6] border border-[#F5E6D3] rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#4B3621]/20"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#4B3621] text-white py-4 rounded-2xl font-bold shadow-lg shadow-[#4B3621]/20 mt-2 flex items-center justify-center gap-2"
          >
            Access Dashboard
            <ArrowRight size={18} />
          </button>
        </form>
      </motion.div>
    </div>
  );
};
