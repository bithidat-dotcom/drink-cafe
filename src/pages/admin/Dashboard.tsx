import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, Coffee, ShoppingBag, Users, 
  TrendingUp, DollarSign, Package, Tag, 
  Bell, Settings, LogOut, ChevronRight,
  BarChart3, Calendar, Filter, Search
} from 'lucide-react';
import { cn, formatPrice } from '../../lib/utils';
import { PRODUCTS } from '../../data';

const stats = [
  { label: "Today's Sales", value: "৳42,500", change: "+12.5%", icon: DollarSign, color: 'text-green-600 bg-green-100' },
  { label: "Total Orders", value: "156", change: "+8.2%", icon: ShoppingBag, color: 'text-blue-600 bg-blue-100' },
  { label: "New Customers", value: "24", change: "+5.4%", icon: Users, color: 'text-purple-600 bg-purple-100' },
  { label: "Active Offers", value: "8", change: "0%", icon: Tag, color: 'text-orange-600 bg-orange-100' },
];

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-[#F5E6D3] flex flex-col p-6 hidden md:flex">
        <div className="flex items-center gap-3 mb-12">
          <img 
            src="https://i.postimg.cc/4x6J3RB3/file-0000000074a481faaa71d2779f8f7226.png" 
            alt="DRINK CAFE" 
            className="h-10 w-10 object-contain"
          />
          <h1 className="font-black text-[#4B3621] text-xl">Admin</h1>
        </div>

        <nav className="flex-1 flex flex-col gap-2">
          {[
            { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'products', label: 'Products', icon: Coffee },
            { id: 'orders', label: 'Orders', icon: ShoppingBag },
            { id: 'customers', label: 'Customers', icon: Users },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-sm transition-all",
                activeTab === item.id 
                  ? "bg-[#4B3621] text-white shadow-lg shadow-[#4B3621]/10" 
                  : "text-gray-400 hover:bg-[#FAF9F6] hover:text-[#4B3621]"
              )}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>

        <button className="flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-sm text-red-500 hover:bg-red-50 mt-auto">
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-black text-[#2D1B08]">Dashboard Overview</h2>
            <p className="text-gray-400 text-sm mt-1">Welcome back, Admin! Here's what's happening today.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-3 bg-white border border-[#F5E6D3] rounded-2xl text-gray-400 hover:text-[#4B3621] transition-colors shadow-sm">
              <Calendar size={20} />
            </button>
            <button className="p-3 bg-white border border-[#F5E6D3] rounded-2xl text-gray-400 hover:text-[#4B3621] transition-colors shadow-sm relative">
              <Bell size={20} />
              <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="flex items-center gap-3 bg-white p-2 pr-4 rounded-2xl border border-[#F5E6D3] shadow-sm">
              <div className="w-10 h-10 bg-[#4B3621] rounded-xl flex items-center justify-center text-white font-bold">A</div>
              <span className="font-bold text-sm">Super Admin</span>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-6 rounded-[32px] border border-[#F5E6D3]/30 shadow-sm"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={cn("p-3 rounded-2xl", stat.color)}>
                  <stat.icon size={24} />
                </div>
                <span className={cn("text-xs font-bold px-2 py-1 rounded-lg bg-green-50 text-green-600")}>
                  {stat.change}
                </span>
              </div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-2xl font-black text-[#2D1B08] mt-1">{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white rounded-[40px] p-8 border border-[#F5E6D3]/30 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black">Recent Orders</h3>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search orders..." 
                    className="bg-[#FAF9F6] border border-[#F5E6D3] rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none w-48"
                  />
                </div>
                <button className="p-2 bg-[#FAF9F6] border border-[#F5E6D3] rounded-xl text-gray-400">
                  <Filter size={16} />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#FAF9F6]">
                    <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest">Order ID</th>
                    <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest">Customer</th>
                    <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest">Product</th>
                    <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest">Amount</th>
                    <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                    <th className="pb-4 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#FAF9F6]">
                  {[
                    { id: '#DC-98234', customer: 'Alex Graham', product: 'Vanilla Latte (L)', amount: '৳540', status: 'Preparing', color: 'text-yellow-600 bg-yellow-50' },
                    { id: '#DC-98233', customer: 'Sarah Khan', product: 'Cappuccino (M)', amount: '৳320', status: 'Ready', color: 'text-blue-600 bg-blue-50' },
                    { id: '#DC-98232', customer: 'John Doe', product: 'Espresso', amount: '৳250', status: 'Delivered', color: 'text-green-600 bg-green-50' },
                    { id: '#DC-98231', customer: 'Emily Chen', product: 'Iced Tea', amount: '৳280', status: 'Delivered', color: 'text-green-600 bg-green-50' },
                    { id: '#DC-98230', customer: 'Michael Ross', product: 'Flat White', amount: '৳350', status: 'Preparing', color: 'text-yellow-600 bg-yellow-50' },
                  ].map((order) => (
                    <tr key={order.id} className="group hover:bg-[#FAF9F6] transition-colors">
                      <td className="py-4 font-bold text-sm">{order.id}</td>
                      <td className="py-4 text-sm font-medium">{order.customer}</td>
                      <td className="py-4 text-sm text-gray-500">{order.product}</td>
                      <td className="py-4 font-black text-[#4B3621] text-sm">{order.amount}</td>
                      <td className="py-4">
                        <span className={cn("px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tight", order.color)}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <button className="text-gray-300 hover:text-[#4B3621] transition-colors">
                          <ChevronRight size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Best Selling Products */}
          <div className="bg-white rounded-[40px] p-8 border border-[#F5E6D3]/30 shadow-sm">
            <h3 className="text-xl font-black mb-8">Best Selling</h3>
            <div className="flex flex-col gap-6">
              {PRODUCTS.slice(0, 4).map((product) => (
                <div key={product.id} className="flex items-center gap-4">
                  <img src={product.image} alt={product.name} className="w-14 h-14 rounded-2xl object-cover" />
                  <div className="flex-1">
                    <h4 className="font-bold text-sm">{product.name}</h4>
                    <p className="text-xs text-gray-400">{product.reviewCount} sales this week</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-[#4B3621] text-sm">{formatPrice(product.price)}</p>
                    <p className="text-[10px] text-green-600 font-bold">+15%</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 rounded-2xl border border-[#F5E6D3] text-[#4B3621] text-sm font-bold hover:bg-[#FAF9F6] transition-colors">
              View All Products
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
