import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, CheckCircle2, Coffee, Tag, Sparkles, Gift, ArrowRight, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

export interface NotificationItem {
  id: string;
  category: 'orders' | 'promos' | 'products';
  type: 'order_complete' | 'order_progress' | 'discount' | 'new_product' | 'reward';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  actionUrl?: string;
  actionText?: string;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    category: 'orders',
    type: 'order_complete',
    title: 'Order Completed! ☕',
    message: 'Your Special Cold Coffee (Order #1048) is completed & ready at counter 1. Enjoy!',
    time: '2 mins ago',
    isRead: false,
    actionUrl: '/home/orders',
    actionText: 'View Order'
  },
  {
    id: 'n2',
    category: 'orders',
    type: 'order_progress',
    title: 'Order In Progress ⏱️',
    message: 'Our head barista is crafting your Caramel Cream Latte (Order #1049). Almost ready!',
    time: '18 mins ago',
    isRead: false,
    actionUrl: '/order-tracking/1049',
    actionText: 'Track Order'
  },
  {
    id: 'n3',
    category: 'products',
    type: 'new_product',
    title: 'New Product Arrival! 🍓🥛',
    message: 'Strawberry Milkshake is now available in store! Blended with Belgian strawberry ice cream.',
    time: '2 hours ago',
    isRead: false,
    actionUrl: '/home',
    actionText: 'Order Now'
  },
  {
    id: 'n4',
    category: 'promos',
    type: 'discount',
    title: 'Special 25% OFF Discount! 🏷️',
    message: 'Enjoy 25% OFF on all Iced Teas today with coupon code VIBE25 at checkout.',
    time: '5 hours ago',
    isRead: true,
    actionUrl: '/home',
    actionText: 'Claim Discount'
  },
  {
    id: 'n5',
    category: 'promos',
    type: 'reward',
    title: 'Loyalty Points Earned! 🎁',
    message: 'Congratulations! You earned +120 Vibe Loyalty Points from your last order.',
    time: '1 day ago',
    isRead: true,
    actionUrl: '/home/loyalty',
    actionText: 'View Rewards'
  }
];

export const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const [list, setList] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState<'all' | 'orders' | 'promos' | 'products'>('all');

  const unreadCount = list.filter(n => !n.isRead).length;

  const markAllAsRead = () => {
    setList(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const toggleRead = (id: string) => {
    setList(prev => prev.map(n => n.id === id ? { ...n, isRead: !n.isRead } : n));
  };

  const filteredNotifications = list.filter(n => {
    if (activeTab === 'all') return true;
    return n.category === activeTab;
  });

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'order_complete':
        return <CheckCircle2 size={22} className="text-emerald-600" />;
      case 'order_progress':
        return <Clock size={22} className="text-[#C9794D]" />;
      case 'new_product':
        return <Coffee size={22} className="text-amber-700" />;
      case 'discount':
        return <Tag size={22} className="text-purple-600" />;
      case 'reward':
        return <Gift size={22} className="text-amber-600" />;
      default:
        return <Bell size={22} className="text-[#C9794D]" />;
    }
  };

  const getIconBg = (type: NotificationItem['type']) => {
    switch (type) {
      case 'order_complete':
        return 'bg-emerald-50 border-emerald-200';
      case 'order_progress':
        return 'bg-amber-50 border-amber-200';
      case 'new_product':
        return 'bg-orange-50 border-orange-200';
      case 'discount':
        return 'bg-purple-50 border-purple-200';
      case 'reward':
        return 'bg-amber-100/60 border-amber-300';
      default:
        return 'bg-amber-50 border-amber-200';
    }
  };

  return (
    <div className="px-4 py-6 flex flex-col gap-6 text-[#2D1B08] pb-28">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-[#2D1B08]">Notifications</h1>
            {unreadCount > 0 && (
              <span className="bg-[#C9794D] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs">
                {unreadCount} NEW
              </span>
            )}
          </div>
          <p className="text-stone-400 text-xs font-medium">Order updates, new arrivals & special deals</p>
        </div>

        {unreadCount > 0 && (
          <button 
            onClick={markAllAsRead}
            className="text-[#C9794D] hover:text-[#A85E36] text-xs font-bold active:scale-95 transition-transform"
          >
            Mark all read
          </button>
        )}
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {[
          { id: 'all', label: 'All Updates' },
          { id: 'orders', label: 'Orders' },
          { id: 'promos', label: 'Discounts & Deals' },
          { id: 'products', label: 'New Arrivals' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200",
              activeTab === tab.id
                ? "bg-[#C9794D] text-white shadow-md shadow-[#C9794D]/20"
                : "bg-white border border-[#EADCC9] text-stone-600 hover:border-[#C9794D]/50"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="flex flex-col gap-3">
        <AnimatePresence mode="popLayout">
          {filteredNotifications.map((notif) => (
            <motion.div
              key={notif.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={() => toggleRead(notif.id)}
              className={cn(
                "p-4 rounded-3xl flex gap-3.5 transition-all relative cursor-pointer border shadow-xs group",
                notif.isRead 
                  ? "bg-white border-[#EADCC9]/60 opacity-85" 
                  : "bg-gradient-to-r from-amber-50/70 to-white border-[#C9794D]/40 shadow-md shadow-amber-900/5"
              )}
            >
              {!notif.isRead && (
                <span className="absolute top-4 right-4 w-2.5 h-2.5 bg-[#C9794D] rounded-full shadow-xs" />
              )}

              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border shadow-2xs", getIconBg(notif.type))}>
                {getIcon(notif.type)}
              </div>

              <div className="flex flex-col gap-1 flex-1">
                <div className="flex items-center justify-between pr-4">
                  <h3 className={cn("font-bold text-sm text-[#2D1B08]", !notif.isRead && "font-black")}>
                    {notif.title}
                  </h3>
                  <span className="text-[10px] text-stone-400 font-semibold">{notif.time}</span>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed font-medium pr-2">
                  {notif.message}
                </p>

                {notif.actionText && (
                  <div className="mt-2 flex items-center justify-between pt-2 border-t border-[#EADCC9]/40">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (notif.actionUrl) navigate(notif.actionUrl);
                      }}
                      className="text-xs font-extrabold text-[#C9794D] flex items-center gap-1 hover:underline active:scale-95 transition-transform"
                    >
                      <span>{notif.actionText}</span>
                      <ArrowRight size={14} />
                    </button>
                    <span className="text-[10px] text-stone-400 font-semibold">
                      {notif.isRead ? 'Read' : 'Tap to mark read'}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredNotifications.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 opacity-60">
            <div className="w-16 h-16 bg-amber-100/60 rounded-full flex items-center justify-center mb-3 text-[#C9794D]">
              <Bell size={32} />
            </div>
            <p className="text-stone-700 font-bold text-sm">No notifications found</p>
            <p className="text-stone-400 text-xs mt-0.5">Check back later for updates</p>
          </div>
        )}
      </div>
    </div>
  );
};
