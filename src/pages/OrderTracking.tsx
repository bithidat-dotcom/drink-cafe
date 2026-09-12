import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, MapPin, Phone } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { cn } from '../lib/utils';

const stages = [
  { id: 'PLACED', label: 'ORDER PLACED', description: 'We have received your order' },
  { id: 'CONFIRMED', label: 'CONFIRMED', description: 'The cafe has confirmed your order' },
  { id: 'PREPARING', label: 'PREPARING', description: 'Your coffee is being brewed' },
  { id: 'READY', label: 'READY', description: 'Order is ready for pickup/delivery' },
  { id: 'DELIVERY', label: 'OUT FOR DELIVERY', description: 'Driver is on the way' },
  { id: 'DELIVERED', label: 'DELIVERED', description: 'Enjoy your DRINK CAFE experience!' }
];

export const OrderTracking: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentStageIndex = 2; // Mocking "PREPARING"

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-12">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#FAF9F6]/80 backdrop-blur-md px-4 py-4 flex items-center gap-4">
        <button 
          onClick={() => navigate('/')}
          className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm border border-[#F5E6D3]"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Track Order</h1>
      </div>

      <div className="px-6 py-6">
        {/* Status Card */}
        <div className="bg-[#4B3621] rounded-[40px] p-8 text-white mb-10 shadow-2xl shadow-[#4B3621]/30">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Clock size={24} className="animate-pulse" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Estimated Time</p>
              <p className="text-2xl font-black">12:45 PM</p>
            </div>
          </div>
          <div className="h-px bg-white/10 my-6" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">Order ID</p>
              <p className="font-bold">{id}</p>
            </div>
            <button className="bg-white/10 px-4 py-2 rounded-xl text-sm font-bold border border-white/10">
              Details
            </button>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative pl-8 flex flex-col gap-10">
          {/* Vertical Line */}
          <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-[#F5E6D3]" />
          
          {/* Animated Indicator */}
          <motion.div 
            initial={{ top: 0 }}
            animate={{ top: currentStageIndex * 76 + 8 }}
            className="absolute left-[7px] w-2.5 h-2.5 bg-[#4B3621] rounded-full z-10 border-4 border-white box-content"
            transition={{ type: 'spring', stiffness: 50 }}
          />

          {stages.map((stage, idx) => {
            const isCompleted = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex;

            return (
              <div key={stage.id} className="relative flex flex-col gap-1">
                <div className={cn(
                  "absolute -left-8 w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-500",
                  isCompleted ? "bg-[#4B3621] text-white" : "bg-white border-2 border-[#F5E6D3] text-gray-300",
                  isCurrent && "border-[#4B3621] text-[#4B3621]"
                )}>
                  {isCompleted && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                
                <h3 className={cn(
                  "font-black text-sm transition-colors duration-500",
                  isCompleted || isCurrent ? "text-[#2D1B08]" : "text-gray-300"
                )}>
                  {stage.label}
                </h3>
                <p className={cn(
                  "text-xs transition-colors duration-500",
                  isCompleted || isCurrent ? "text-gray-500" : "text-gray-200"
                )}>
                  {stage.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Delivery Info */}
        {currentStageIndex >= 4 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 bg-white p-6 rounded-[32px] shadow-sm border border-[#F5E6D3]/50 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden">
                <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100" alt="Driver" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Your Delivery Hero</p>
                <p className="font-bold">Rahat Ahmed</p>
              </div>
            </div>
            <button className="w-12 h-12 bg-[#4B3621] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-[#4B3621]/20">
              <Phone size={20} />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
