import React from 'react';
import { motion } from 'motion/react';
import { Gift, Star, Clock, ChevronRight, Award, Coffee, Zap, Plus } from 'lucide-react';
import { cn } from '../lib/utils';

export const Loyalty: React.FC = () => {
  const points = 1240;
  const nextRewardAt = 2000;
  const progress = (points / nextRewardAt) * 100;

  const rewards = [
    { id: '1', title: 'Free Coffee', points: 500, icon: Coffee, color: 'bg-orange-100 text-orange-600' },
    { id: '2', title: 'Size Upgrade', points: 300, icon: Zap, color: 'bg-blue-100 text-blue-600' },
    { id: '3', title: 'Free Dessert', points: 800, icon: Award, color: 'bg-purple-100 text-purple-600' },
  ];

  const history: any[] = [];

  return (
    <div className="px-4 py-8 flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-black text-[#2D1B08]">Loyalty Rewards</h1>
        <p className="text-gray-400 text-sm">Earn points for every sip you take</p>
      </div>

      {/* Points Card */}
      <div className="bg-[#4B3621] rounded-[40px] p-8 text-white shadow-2xl shadow-[#4B3621]/30 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-md mb-4 border border-white/10">
            <Gift size={40} className="text-white" />
          </div>
          <h2 className="text-5xl font-black mb-1">{points.toLocaleString()}</h2>
          <p className="text-white/60 font-bold uppercase tracking-widest text-xs">Total Points</p>
          
          <div className="w-full mt-8">
            <div className="flex justify-between text-xs font-bold mb-2">
              <span className="text-white/60">Progress to Next Reward</span>
              <span>{points}/{nextRewardAt}</span>
            </div>
            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]"
              />
            </div>
            <p className="text-[10px] text-white/40 mt-3 italic">
              ৳100 spent = 10 points earned
            </p>
          </div>
        </div>
      </div>

      {/* Available Rewards */}
      <section>
        <h2 className="font-bold text-lg mb-4">Available Rewards</h2>
        <div className="flex flex-col gap-3">
          {rewards.map((reward) => (
            <div key={reward.id} className="bg-white p-4 rounded-3xl border border-[#F5E6D3]/30 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", reward.color)}>
                  <reward.icon size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">{reward.title}</h3>
                  <p className="text-xs text-gray-400">{reward.points} Points required</p>
                </div>
              </div>
              <button 
                disabled={points < reward.points}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                  points >= reward.points 
                    ? "bg-[#4B3621] text-white shadow-lg shadow-[#4B3621]/10 active:scale-95" 
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                )}
              >
                Redeem
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* History */}
      <section>
        <h2 className="font-bold text-lg mb-4">Points History</h2>
        <div className="flex flex-col gap-4">
          {history.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center",
                  item.type === 'earn' ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                )}>
                  {item.type === 'earn' ? <Plus size={18} /> : <Gift size={18} />}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#2D1B08]">{item.desc}</h3>
                  <p className="text-[10px] text-gray-400">{item.date}</p>
                </div>
              </div>
              <span className={cn(
                "font-black text-sm",
                item.type === 'earn' ? "text-green-600" : "text-red-600"
              )}>
                {item.type === 'earn' ? '+' : ''}{item.points}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
