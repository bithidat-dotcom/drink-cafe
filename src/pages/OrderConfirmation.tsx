import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Coffee, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';

export const OrderConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAppStore();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="w-32 h-32 bg-[#FAF9F6] rounded-full flex items-center justify-center relative mb-8"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute -top-2 -right-2 w-12 h-12 bg-[#4B3621] rounded-full flex items-center justify-center text-white border-4 border-white"
        >
          <CheckCircle2 size={24} />
        </motion.div>
        <Coffee size={64} className="text-[#4B3621]" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h1 className="text-3xl font-black text-[#2D1B08] mb-4">Order Confirmed ☕</h1>
        <p className="text-gray-500 leading-relaxed max-w-[280px] mx-auto">
          Your delicious coffee is being prepared with love. We'll notify you when it's ready!
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12 w-full max-w-xs flex flex-col gap-4"
      >
        <div className="bg-[#FAF9F6] p-6 rounded-3xl border border-[#F5E6D3] text-left">
          <div className="flex justify-between mb-2">
            <span className="text-gray-400 text-sm">Order Number</span>
            <span className="font-bold text-sm">#DC-98234</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400 text-sm">Est. Time</span>
            <span className="font-bold text-sm">15-20 mins</span>
          </div>
        </div>

        <button
          onClick={() => navigate('/order-tracking/DC-98234')}
          className="w-full bg-[#4B3621] text-white py-4 rounded-3xl font-bold shadow-xl shadow-[#4B3621]/20 flex items-center justify-center gap-2 group"
        >
          Track Order
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </button>

        <button
          onClick={() => navigate('/')}
          className="w-full py-4 text-gray-500 font-bold"
        >
          Back to Home
        </button>
      </motion.div>
    </div>
  );
};
