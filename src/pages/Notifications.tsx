import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, ShoppingBag, Gift, CheckCircle2, Star, Coffee } from 'lucide-react';
import { cn } from '../lib/utils';

const notifications: any[] = [];

export const Notifications: React.FC = () => {
  return (
    <div className="px-4 py-8 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-black text-[#2D1B08]">Notifications</h1>
          <p className="text-gray-400 text-sm">Stay updated with your orders</p>
        </div>
        <button className="text-[#4B3621] text-xs font-bold">Mark all as read</button>
      </div>

      <div className="flex flex-col gap-4">
        {notifications.map((notif, idx) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={cn(
              "p-5 rounded-[32px] flex gap-4 transition-all relative",
              notif.isRead ? "bg-white border border-[#F5E6D3]/30" : "bg-[#FAF9F6] border-2 border-[#4B3621]/10 shadow-lg shadow-[#4B3621]/5"
            )}
          >
            {!notif.isRead && (
              <div className="absolute top-5 right-5 w-2 h-2 bg-[#4B3621] rounded-full" />
            )}
            
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0", notif.color)}>
              <notif.icon size={24} />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between pr-4">
                <h3 className={cn("font-bold text-sm", !notif.isRead ? "text-[#2D1B08]" : "text-gray-600")}>
                  {notif.title}
                </h3>
                <span className="text-[10px] text-gray-400 font-medium">{notif.time}</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed pr-2">{notif.message}</p>
            </div>
          </motion.div>
        ))}

        {notifications.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 opacity-50">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-[#4B3621]">
              <Bell size={40} />
            </div>
            <p className="text-gray-500 font-medium">No notifications yet</p>
          </div>
        )}
      </div>
    </div>
  );
};
