import React from 'react';
import { Heart, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { cn } from '../lib/utils';
import { useAppStore } from '../store/useAppStore';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite, addToCart } = useAppStore();
  const favorite = isFavorite(product.id);

  return (
    <motion.div
      whileTap={{ scale: 0.96 }}
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white rounded-3xl p-3 shadow-md shadow-amber-900/5 border border-[#EADCC9]/60 flex flex-col gap-2 group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[#C9794D]/30"
    >
      {/* Clear Product Showcase Background */}
      <div className="relative aspect-square rounded-2xl overflow-hidden flex items-center justify-center p-2.5 bg-gradient-to-b from-[#FAF6F0] to-[#F1E8DC]">
        {/* Crisp Coffee Image */}
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-105 drop-shadow-md"
        />

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-md rounded-full z-20 shadow-sm active:scale-90 transition-transform"
        >
          <Heart 
            size={16} 
            className={cn(
              "transition-colors",
              favorite ? "fill-[#C9794D] text-[#C9794D]" : "text-stone-400"
            )} 
          />
        </button>
      </div>

      <div className="px-1 pt-1 pb-1 flex flex-col gap-2 z-10">
        <div className="flex flex-col">
          <span className="font-bold text-[14px] text-[#2D1B08] line-clamp-1">{product.name}</span>
          <span className="text-[11px] text-stone-400 line-clamp-1">Rich cold espresso</span>
        </div>

        <div className="flex items-center justify-between w-full mt-1">
          <span className="font-extrabold text-[#C9794D] text-[16px]">${product.price.toFixed(2)}</span>

          {/* Add to Cart Button matching Home button style */}
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
            className="w-9 h-9 rounded-full bg-[#C9794D] text-white flex items-center justify-center shadow-md shadow-[#C9794D]/30 active:scale-90 transition-transform ripple-button"
          >
            <Plus size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

