import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CATEGORIES, PRODUCTS } from '../data';
import { ProductCard } from '../components/ProductCard';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { cn } from '../lib/utils';

const MENU_CATEGORIES = [
  'All',
  'Espresso',
  'Americano',
  'Cappuccino',
  'Latte',
  'Mocha',
  'Cold Coffee',
  'Iced Latte',
  'Frappé',
  'Tea',
  'Smoothies',
  'Fresh Drinks',
  'Snacks',
  'Desserts'
];

export const Menu: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || 'All';
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.categoryId.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full bg-[#FAF9F6]">
      {/* Search Bar */}
      <div className="px-4 pt-4 pb-2">
        <div className="relative flex items-center">
          <Search className="absolute left-4 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search your favorite coffee..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#F5E6D3] rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#4B3621]/20 transition-all shadow-sm"
          />
          <button className="ml-3 p-3 bg-[#4B3621] text-white rounded-xl shadow-lg shadow-[#4B3621]/10">
            <SlidersHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto py-4 px-4 scrollbar-hide">
        {MENU_CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setSearchParams({ category })}
            className={cn(
              "px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all",
              selectedCategory === category
                ? "bg-[#4B3621] text-white shadow-lg shadow-[#4B3621]/20"
                : "bg-white text-gray-500 border border-[#F5E6D3]/50 hover:bg-gray-50"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product List */}
      <div className="flex-1 px-4 pb-8 overflow-y-auto">
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid grid-cols-2 gap-4"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 opacity-50">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search size={32} className="text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
};
