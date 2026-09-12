import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ChevronRight, Clock, MapPin, Coffee, CheckCircle, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn, formatPrice } from '../lib/utils';
import { useAppStore } from '../store/useAppStore';

const mockOrdersList = [
  {
    id: 'ORD-8942',
    date: 'Today, 10:45 AM',
    status: 'PREPARING',
    active: true,
    items: ['1x Caramel Cappuccino (Medium)', '1x Croissant Butter Roll'],
    total: 8.50,
    eta: '12 mins'
  },
  {
    id: 'ORD-8901',
    date: 'Yesterday, 4:15 PM',
    status: 'DELIVERED',
    active: false,
    items: ['2x Iced Vanilla Latte (Large)', '1x Almond Biscotti'],
    total: 13.90,
    eta: 'Completed'
  },
  {
    id: 'ORD-8820',
    date: '10 Sep 2026, 9:20 AM',
    status: 'DELIVERED',
    active: false,
    items: ['1x Matcha Green Tea Latte (Medium)'],
    total: 5.25,
    eta: 'Completed'
  }
];

export const Orders: React.FC = () => {
  const navigate = useNavigate();
  const { cart } = useAppStore();
  const [activeTab, setActiveTab] = useState<'Active' | 'Past'>('Active');
  
  const filteredOrders = mockOrdersList.filter(o => activeTab === 'Active' ? o.active : !o.active);

  return (
    <div className="px-4 py-6 flex flex-col gap-5 text-[#2D1B08] pb-28">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-black text-[#2D1B08]">My Orders</h1>
        <p className="text-stone-400 text-xs font-medium">Track live orders and view your purchase history</p>
      </div>

      {/* Tabs */}
      <div className="flex bg-white p-1.5 rounded-2xl border border-[#EADCC9]/80 shadow-xs">
        {(['Active', 'Past'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 py-2.5 rounded-xl text-xs font-extrabold transition-all duration-200",
              activeTab === tab 
                ? "bg-[#C9794D] text-white shadow-md shadow-[#C9794D]/20" 
                : "text-stone-500 hover:text-stone-700"
            )}
          >
            {tab} Orders
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
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white p-5 rounded-[28px] border border-[#EADCC9]/80 shadow-md flex flex-col gap-3"
            >
              <div className="flex justify-between items-center pb-2 border-b border-[#EADCC9]/40">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-100/70 text-[#C9794D] flex items-center justify-center font-black">
                    <Coffee size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-[#2D1B08]">{order.id}</p>
                    <p className="text-[10px] text-stone-400 font-medium">{order.date}</p>
                  </div>
                </div>

                <div className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1",
                  order.status === 'PREPARING' 
                    ? "bg-amber-100 text-[#C9794D] animate-pulse" 
                    : "bg-emerald-100 text-emerald-700"
                )}>
                  {order.status === 'PREPARING' ? <Clock size={12} /> : <CheckCircle size={12} />}
                  <span>{order.status}</span>
                </div>
              </div>

              {/* Items */}
              <div className="flex flex-col gap-1.5 py-1">
                {order.items.map((item, i) => (
                  <p key={i} className="text-xs font-bold text-stone-700 flex items-center justify-between">
                    <span>{item}</span>
                  </p>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#EADCC9]/40 mt-1">
                <div>
                  <p className="text-[10px] text-stone-400 font-bold uppercase">Total Price</p>
                  <p className="text-lg font-black text-[#C9794D]">${order.total.toFixed(2)}</p>
                </div>

                <div className="flex gap-2">
                  {order.active ? (
                    <button 
                      onClick={() => navigate(`/order-tracking/${order.id}`)}
                      className="bg-[#C9794D] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-md shadow-[#C9794D]/30 flex items-center gap-2 active:scale-95 transition-transform"
                    >
                      <span>Track Live</span>
                      <ChevronRight size={14} />
                    </button>
                  ) : (
                    <button 
                      onClick={() => navigate('/home')}
                      className="bg-amber-50 text-[#C9794D] px-4 py-2 rounded-full text-xs font-bold border border-[#EADCC9] flex items-center gap-1.5 active:scale-95 transition-transform"
                    >
                      <RefreshCw size={13} />
                      <span>Reorder</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredOrders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-amber-100/60 rounded-full flex items-center justify-center mb-3 text-[#C9794D]">
              <ShoppingBag size={32} />
            </div>
            <p className="text-stone-700 font-bold text-sm">No Orders Found</p>
            <p className="text-stone-400 text-xs mt-1 max-w-xs font-medium">
              You don't have any {activeTab.toLowerCase()} coffee orders right now.
            </p>
            <button
              onClick={() => navigate('/home')}
              className="mt-4 px-5 py-2.5 bg-[#C9794D] text-white text-xs font-bold rounded-full shadow-md"
            >
              Order Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

