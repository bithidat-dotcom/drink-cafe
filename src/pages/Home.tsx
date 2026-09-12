import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CATEGORIES, PRODUCTS } from '../data';
import { ProductCard } from '../components/ProductCard';
import { Search, Mic, SlidersHorizontal, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('coffee');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categoryProducts = PRODUCTS.filter(p => {
    const matchesCat = selectedCategory === 'all' || p.categoryId === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const popularCoffees = categoryProducts.filter(p => p.isPopular);
  const displayPopular = popularCoffees.length > 0 ? popularCoffees : categoryProducts;

  return (
    <div className="px-4 py-4 flex flex-col gap-6 text-[#2D1B08]">
      {/* Promotional Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full h-[140px] rounded-3xl overflow-hidden flex items-center bg-gradient-to-r from-[#2D1B08] to-[#422A14] p-5 shadow-lg shadow-amber-950/20"
      >
        <div className="z-10 flex flex-col w-2/3">
          <h2 className="text-white font-medium text-lg leading-snug">
            20% OFF On All<br/>
            <span className="font-bold text-[#E8A57A]">Cold Coffee!</span>
          </h2>
          <p className="text-[10px] text-amber-200/70 mt-1 mb-3">Today Only • Special Promo</p>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/product/${PRODUCTS[0]?.id || '1'}`)}
            className="bg-[#C9794D] text-white text-[11px] font-bold px-4 py-1.5 rounded-full w-fit shadow-md ripple-button"
          >
            Order Now
          </motion.button>
        </div>
        <img 
          src="https://i.postimg.cc/52Fv0yC1/f7f7f32e-6709-496f-a1e2-173e733bbcad.png" 
          alt="Coffee Promo" 
          className="absolute right-0 top-1/2 -translate-y-1/2 h-[120%] object-contain drop-shadow-2xl"
        />
      </motion.div>

      {/* Search Bar */}
      <div className="flex gap-3 items-center">
        <div className="flex-1 bg-white rounded-[20px] flex items-center px-4 py-3 shadow-md shadow-stone-200/40 border border-[#EADCC9]/80">
          <Search size={18} className="text-stone-400 shrink-0" />
          <input 
            type="text" 
            placeholder="Search coffee, tea, milkshake..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none focus:outline-none text-sm px-3 w-full text-[#2D1B08] placeholder-stone-400 font-medium"
          />
          <Mic size={18} className="text-stone-400 shrink-0" />
        </div>
        <button className="w-12 h-12 bg-[#C9794D] text-white rounded-[20px] flex items-center justify-center shrink-0 shadow-md shadow-[#C9794D]/30 active:scale-95 transition-transform ripple-button">
          <SlidersHorizontal size={18} />
        </button>
      </div>

      {/* Categories (1: Coffee, 2: Tea, 3: Milkshake) */}
      <section>
        <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide mt-1">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory('all')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full whitespace-nowrap transition-all duration-200 ${
              selectedCategory === 'all' 
                ? 'bg-[#C9794D] text-white shadow-md shadow-[#C9794D]/25 font-bold' 
                : 'bg-white border border-[#EADCC9]/80 text-stone-600 font-medium shadow-xs hover:border-[#C9794D]/50'
            }`}
          >
            <span className="text-xs">All Items</span>
          </motion.button>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <motion.button
                key={cat.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full whitespace-nowrap transition-all duration-200 ${
                  isSelected 
                    ? 'bg-[#C9794D] text-white shadow-md shadow-[#C9794D]/25 font-bold' 
                    : 'bg-white border border-[#EADCC9]/80 text-stone-600 font-medium shadow-xs hover:border-[#C9794D]/50'
                }`}
              >
                <span className="text-xs">{cat.name}</span>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Popular Slider */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-lg text-[#2D1B08]">Popular Items</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
          {displayPopular.map((product) => (
            <motion.div
              key={product.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(`/product/${product.id}`)}
              className="bg-white rounded-3xl p-3.5 shadow-md shadow-amber-900/5 border border-[#EADCC9]/60 flex flex-col items-center gap-2 w-[190px] shrink-0 snap-center relative overflow-hidden group transition-all duration-300 hover:shadow-lg"
            >
              {/* Clear Product Showcase Background */}
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden flex items-center justify-center p-2.5 bg-gradient-to-b from-[#FAF6F0] to-[#F1E8DC]">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain relative z-10 drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="w-full text-left flex flex-col gap-1 z-10 mt-1">
                <h3 className="font-bold text-sm text-[#2D1B08] truncate px-1">{product.name}</h3>
                <div className="flex items-center justify-between mt-1 px-1">
                  <span className="font-extrabold text-[#C9794D] text-[15px]">${product.price.toFixed(2)}</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(
                        product,
                        {
                          id: Math.random().toString(36).substr(2, 9),
                          productId: product.id,
                          size: 'Medium',
                          temperature: 'Cold',
                          milk: 'Regular',
                          sugar: 'Normal',
                          extras: []
                        },
                        1
                      );
                    }}
                    className="w-8 h-8 rounded-full bg-[#C9794D] text-white flex items-center justify-center shadow-md shadow-[#C9794D]/20 active:scale-90 transition-transform ripple-button"
                  >
                    <Plus size={16} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* All Product Grid */}
      <section className="pb-8 mt-1">
        <h2 className="font-bold text-lg text-[#2D1B08] mb-3">All Menu Items</h2>
        <div className="grid grid-cols-2 gap-4">
          {categoryProducts.map((product) => (
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

