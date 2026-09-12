import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ChevronRight, Clock, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn, formatPrice } from '../lib/utils';

const mockOrders: any[] = [];

export const Orders: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'Active' | 'Past'>('Active');
  
  const filteredOrders = mockOrders.filter(o => activeTab === 'Active' ? o.active : !o.active);

  return (
    <div className="px-4 py-8 flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-black text-[#2D1B08]">Orders</h1>
        <p className="text-gray-400 text-sm">Track and manage your coffee orders</p>
      </div>

      {/* Tabs */}
      <div className="flex bg-white p-1.5 rounded-2xl border border-[#F5E6D3]/50 shadow-sm">
        {(['Active', 'Past'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 py-3 rounded-xl text-sm font-bold transition-all",
              activeTab === tab ? "bg-[#4B3621] text-white shadow-lg shadow-[#4B3621]/20" : "text-gray-400"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Order List */}
      <div className="flex flex-col gap-4">
        <AnimatePresence mode="popLayout">
          {filteredOrders.map((order) => (
            <motion.div
              key={order.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white p-5 rounded-[32px] border border-[#F5E6D3]/30 shadow-sm flex flex-col gap-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Order #{order.id}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{order.date}</p>
                </div>
                <div className={cn(
                  "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tight",
                  order.status === 'PREPARING' ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"
                )}>
                  {order.status}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                {order.items.map((item, i) => (
                  <p key={i} className="text-sm font-bold text-[#2D1B08]">{item}</p>
                ))}
              </div>

              <div className="h-px bg-[#FAF9F6]" />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold">Total Amount</p>
                  <p className="text-lg font-black text-[#4B3621]">{formatPrice(order.total)}</p>
                </div>
                <div className="flex gap-2">
                  {order.active ? (
                    <button 
                      onClick={() => navigate(`/order-tracking/${order.id}`)}
                      className="bg-[#4B3621] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-[#4B3621]/10 flex items-center gap-2"
                    >
                      Track <ChevronRight size={14} />
                    </button>
                  ) : (
                    <button className="bg-[#FAF9F6] text-[#4B3621] px-4 py-2 rounded-xl text-xs font-bold border border-[#F5E6D3]">
                      Reorder
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredOrders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 opacity-50">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-[#4B3621]">
              <ShoppingBag size={40} />
            </div>
            <p className="text-gray-500 font-medium">No orders found</p>
          </div>
        )}
      </div>
    </div>
  );
};
