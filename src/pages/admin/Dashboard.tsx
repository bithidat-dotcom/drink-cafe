import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, Coffee, ShoppingBag, Users, 
  TrendingUp, DollarSign, Package, Tag, 
  Bell, Settings, LogOut, ChevronRight,
  BarChart3, Calendar, Filter, Search,
  Key, ShieldCheck, Database, Copy, Check, Server, ToggleLeft, ToggleRight,
  MapPin, Phone
} from 'lucide-react';
import { cn, formatPrice } from '../../lib/utils';
import firebaseConfig from '../../../firebase-applet-config.json';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { AdminProducts } from './AdminProducts';
import { useAppStore } from '../../store/useAppStore';

const stats = [
  { label: "Today's Sales", value: "৳42,500", change: "+12.5%", icon: DollarSign, color: 'text-green-600 bg-green-100' },
  { label: "Total Orders", value: "156", change: "+8.2%", icon: ShoppingBag, color: 'text-blue-600 bg-blue-100' },
  { label: "New Customers", value: "24", change: "+5.4%", icon: Users, color: 'text-purple-600 bg-purple-100' },
  { label: "Active Offers", value: "8", change: "0%", icon: Tag, color: 'text-orange-600 bg-orange-100' },
];

export const AdminDashboard: React.FC = () => {
  const { products } = useAppStore();
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [firestoreSync, setFirestoreSync] = useState(true);
  const [orderAccepting, setOrderAccepting] = useState(true);
  const [serverOrders, setServerOrders] = useState<any[]>([]);

  useEffect(() => {
    try {
      const q = query(collection(db, 'orders'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const docs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setServerOrders(docs);
      }, (err) => {
        console.error('Firestore snapshot listener error:', err);
      });
      return () => unsubscribe();
    } catch (e) {
      console.error('Failed to subscribe to Firestore orders:', e);
    }
  }, []);

  const handleCopy = (keyName: string, textValue: string) => {
    navigator.clipboard.writeText(textValue);
    setCopiedKey(keyName);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-[#F5E6D3] flex flex-col p-6 hidden md:flex">
        <div className="flex items-center gap-3 mb-10">
          <img 
            src="https://i.postimg.cc/httNxF0X/c0a39348-2342-47b0-9302-5d757a66cdb2.png" 
            alt="DRINK CAFE" 
            className="h-10 w-10 object-contain drop-shadow-sm"
          />
          <div>
            <h1 className="font-black text-[#4B3621] text-lg leading-tight">DRINK CAFE</h1>
            <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              Admin Portal
            </span>
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-2">
          {[
            { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'keys', label: 'Firebase Keys', icon: Key },
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

        <button 
          onClick={() => window.location.href = '/admin'}
          className="flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-sm text-red-500 hover:bg-red-50 mt-auto"
        >
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        {/* Admin Control Header Banner */}
        <div className="mb-6 bg-gradient-to-r from-[#2D1B08] via-[#4B3621] to-[#6A4729] text-white p-4 md:p-5 rounded-3xl shadow-xl border border-amber-900/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center shrink-0 text-amber-300">
              <ShieldCheck size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-amber-200 tracking-wide">PAGE CONTROLLED BY ADMIN</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-xs text-amber-100/80 font-medium mt-0.5">
                Full backend controls & active Firebase synchronization enabled for Super Admin.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-100 flex items-center gap-1.5">
              <Server size={14} className="text-emerald-400" />
              Backend Sync: Active
            </span>
          </div>
        </div>

        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-[#2D1B08]">
              {activeTab === 'keys' ? 'Firebase & Backend Configuration' : 'Dashboard Overview'}
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              {activeTab === 'keys' ? 'Full overview of your active Firebase API Keys & Database Identifiers.' : "Welcome back, Admin! Manage your app controls, sales, and products here."}
            </p>
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

        {activeTab === 'keys' ? (
          /* Firebase Keys & Backend Info View */
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-[32px] p-6 md:p-8 border border-[#F5E6D3]/50 shadow-sm">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-100">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-amber-50 text-[#C9794D]">
                    <Database size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-[#2D1B08]">Active Firebase Project Credentials</h3>
                    <p className="text-xs text-stone-400 font-medium">Provisioned database keys powering Drink Cafe backend</p>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy('all', JSON.stringify(firebaseConfig, null, 2))}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2D1B08] text-white text-xs font-bold hover:bg-[#4B3621] transition-colors shadow-sm"
                >
                  {copiedKey === 'all' ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                  <span>{copiedKey === 'all' ? 'Copied Full JSON' : 'Copy All Keys'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "Firebase Project ID", key: "projectId", value: firebaseConfig.projectId },
                  { label: "Firestore Database ID", key: "firestoreDatabaseId", value: firebaseConfig.firestoreDatabaseId },
                  { label: "Web API Key", key: "apiKey", value: firebaseConfig.apiKey },
                  { label: "Web App ID", key: "appId", value: firebaseConfig.appId },
                  { label: "Auth Domain", key: "authDomain", value: firebaseConfig.authDomain },
                  { label: "Storage Bucket", key: "storageBucket", value: firebaseConfig.storageBucket },
                  { label: "Messaging Sender ID", key: "messagingSenderId", value: firebaseConfig.messagingSenderId },
                  { label: "OAuth Client ID", key: "oAuthClientId", value: firebaseConfig.oAuthClientId },
                ].map((item) => (
                  <div key={item.key} className="bg-[#FAF9F6] p-4 rounded-2xl border border-[#F5E6D3] flex flex-col justify-between gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">{item.label}</span>
                      <button
                        onClick={() => handleCopy(item.key, item.value || '')}
                        className="text-stone-400 hover:text-[#C9794D] transition-colors p-1"
                      >
                        {copiedKey === item.key ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                      </button>
                    </div>
                    <code className="text-xs font-mono font-bold text-[#2D1B08] break-all bg-white p-2.5 rounded-xl border border-stone-200/60">
                      {item.value || 'Not Set'}
                    </code>
                  </div>
                ))}
              </div>
            </div>

            {/* Backend Controls Card */}
            <div className="bg-white rounded-[32px] p-6 md:p-8 border border-[#F5E6D3]/50 shadow-sm">
              <h3 className="text-lg font-black text-[#2D1B08] mb-4">Backend Admin Controls</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#F5E6D3] flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-sm text-[#2D1B08]">Accepting New Orders</h4>
                    <p className="text-[11px] text-stone-400 font-medium">Toggle store checkout engine</p>
                  </div>
                  <button onClick={() => setOrderAccepting(!orderAccepting)} className="text-[#C9794D]">
                    {orderAccepting ? <ToggleRight size={36} className="text-emerald-600" /> : <ToggleLeft size={36} className="text-stone-300" />}
                  </button>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#F5E6D3] flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-sm text-[#2D1B08]">Firestore Sync</h4>
                    <p className="text-[11px] text-stone-400 font-medium">Realtime database listener</p>
                  </div>
                  <button onClick={() => setFirestoreSync(!firestoreSync)} className="text-[#C9794D]">
                    {firestoreSync ? <ToggleRight size={36} className="text-emerald-600" /> : <ToggleLeft size={36} className="text-stone-300" />}
                  </button>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#F5E6D3] flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-sm text-[#2D1B08]">Maintenance Mode</h4>
                    <p className="text-[11px] text-stone-400 font-medium">Show maintenance screen</p>
                  </div>
                  <button onClick={() => setMaintenanceMode(!maintenanceMode)} className="text-[#C9794D]">
                    {maintenanceMode ? <ToggleRight size={36} className="text-red-600" /> : <ToggleLeft size={36} className="text-stone-300" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'products' ? (
          <AdminProducts />
        ) : (
          /* Overview View */
          <>
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
                      {(serverOrders.length > 0 ? serverOrders : [
                        { id: 'DC-98234', buyerName: 'Alex Graham', phone: '01711223344', location: 'Uttara, Dhaka', coupon: 'DRINK10', products: [{ productName: 'Vanilla Latte (L)', price: 540 }], total: 540, status: 'ORDER PLACED' },
                        { id: 'DC-98233', buyerName: 'Sarah Khan', phone: '01899887766', location: 'Gulshan 2, Dhaka', coupon: 'NONE', products: [{ productName: 'Cappuccino (M)', price: 320 }], total: 320, status: 'ORDER PLACED' },
                      ]).map((order) => {
                        const productSummary = order.products && order.products.length > 0
                          ? order.products.map((p: any) => `${p.quantity || 1}x ${p.productName || p.name}`).join(', ')
                          : (order.product || 'Coffee Item');

                        return (
                          <tr key={order.id} className="group hover:bg-[#FAF9F6] transition-colors">
                            <td className="py-4 font-bold text-sm">
                              <div>
                                <span className="text-[#2D1B08] font-extrabold">{order.id}</span>
                                {order.coupon && order.coupon !== 'NONE' && (
                                  <span className="block text-[10px] text-emerald-600 font-bold">Coupon: {order.coupon}</span>
                                )}
                              </div>
                            </td>
                            <td className="py-4 text-sm font-medium">
                              <div>
                                <p className="font-bold text-[#2D1B08]">{order.buyerName || order.customer || 'Customer'}</p>
                                <p className="text-[11px] text-stone-400 font-medium flex items-center gap-1">
                                  <Phone size={10} />
                                  {order.phone || order.phoneNumber || 'N/A'}
                                </p>
                                <p className="text-[10px] text-stone-400 font-medium flex items-center gap-1">
                                  <MapPin size={10} />
                                  {order.location || order.address || 'Dhaka'}
                                </p>
                              </div>
                            </td>
                            <td className="py-4 text-xs text-stone-600 font-medium max-w-[200px] truncate">
                              {productSummary}
                            </td>
                            <td className="py-4 font-black text-[#C9794D] text-sm">
                              {formatPrice(order.total || order.totalPrice || 0)}
                            </td>
                            <td className="py-4">
                              <span className={cn(
                                "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tight",
                                order.status === 'ORDER PLACED' ? 'text-amber-700 bg-amber-100' : 'text-emerald-700 bg-emerald-100'
                              )}>
                                {order.status || 'ORDER PLACED'}
                              </span>
                            </td>
                            <td className="py-4 text-right">
                              <button className="text-stone-300 hover:text-[#4B3621] transition-colors">
                                <ChevronRight size={20} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Best Selling Products */}
              <div className="bg-white rounded-[40px] p-8 border border-[#F5E6D3]/30 shadow-sm">
                <h3 className="text-xl font-black mb-8">Best Selling</h3>
                <div className="flex flex-col gap-6">
                  {products.slice(0, 4).map((product) => (
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
          </>
        )}
      </main>
    </div>
  );
};

