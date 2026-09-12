import React from 'react';
import { motion } from 'motion/react';
import { CATEGORIES, PRODUCTS } from '../data';
import { ProductCard } from '../components/ProductCard';
import { Search, Mic, SlidersHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 py-4 flex flex-col gap-6">
      {/* Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full h-[140px] rounded-3xl overflow-hidden flex items-center bg-[#242424] p-5 shadow-2xl"
      >
        <div className="z-10 flex flex-col w-2/3">
          <h2 className="text-white font-medium text-lg leading-snug">
            20% OFF On All<br/>
            <span className="font-bold">Espresso!</span>
          </h2>
          <p className="text-[10px] text-gray-400 mt-1 mb-3">Today Only • Limited Time Offer</p>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            className="bg-[#C9794D] text-white text-[10px] font-bold px-4 py-2 rounded-full w-fit ripple-button"
          >
            Order Now
          </motion.button>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1599557431284-0a307c9fb377?q=80&w=300&auto=format&fit=crop" 
          alt="Offer" 
          className="absolute right-0 top-0 h-full w-1/2 object-cover mix-blend-lighten"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 40%)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 40%)' }}
        />
      </motion.div>

      {/* Search Bar */}
      <div className="flex gap-3 items-center">
        <div className="flex-1 bg-[#1C1C1C] rounded-[20px] flex items-center px-4 py-3 shadow-inner border border-white/5">
          <Search size={18} className="text-gray-400 shrink-0" />
          <input 
            type="text" 
            placeholder="Search coffee..."
            className="bg-transparent border-none focus:outline-none text-sm px-3 w-full text-white placeholder-gray-500"
          />
          <Mic size={18} className="text-gray-400 shrink-0" />
        </div>
        <button className="w-12 h-12 bg-[#C9794D] rounded-[20px] flex items-center justify-center shrink-0 shadow-lg shadow-[#C9794D]/20">
          <SlidersHorizontal size={18} className="text-white" />
        </button>
      </div>

      {/* Categories */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-medium text-base text-gray-300">Categories</h2>
          <button className="text-gray-500 text-[10px] font-medium">See all</button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map((cat, idx) => {
            const isSelected = idx === 1; // Just for mockup, default to second item selected
            return (
              <motion.button
                key={cat.id}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap border ${
                  isSelected ? 'bg-[#C9794D] border-[#C9794D] text-white' : 'bg-[#1C1C1C] border-white/10 text-gray-400'
                }`}
              >
                <span className="text-xs font-medium">{cat.name}</span>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Product Grid */}
      <section className="pb-8">
        <div className="grid grid-cols-2 gap-4">
          {PRODUCTS.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
            />
          ))}
        </div>
      </section>
    </div>
  );
};
