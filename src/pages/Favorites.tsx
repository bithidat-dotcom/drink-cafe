import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ShoppingBag } from 'lucide-react';
import { PRODUCTS } from '../data';
import { ProductCard } from '../components/ProductCard';
import { useAppStore } from '../store/useAppStore';

export const Favorites: React.FC = () => {
  const { favorites } = useAppStore();
  const favoriteProducts = PRODUCTS.filter(p => favorites.includes(p.id));

  return (
    <div className="px-4 py-8 flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-black text-[#2D1B08]">My Favorites</h1>
        <p className="text-gray-400 text-sm">Your most loved drinks in one place</p>
      </div>

      <AnimatePresence mode="popLayout">
        <div className="grid grid-cols-2 gap-4">
          {favoriteProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {favoriteProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 opacity-50">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-[#4B3621]">
            <Heart size={40} />
          </div>
          <p className="text-gray-500 font-medium">No favorites yet</p>
          <p className="text-gray-400 text-xs mt-1">Tap the heart on any drink to add it here</p>
        </div>
      )}
    </div>
  );
};
