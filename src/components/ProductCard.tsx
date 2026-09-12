import React from 'react';
import { Heart } from 'lucide-react';
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
  const { toggleFavorite, isFavorite } = useAppStore();
  const favorite = isFavorite(product.id);

  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-[#1C1C1C] rounded-3xl p-3 shadow-sm border border-white/5 flex flex-col gap-3 group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9794D]/10 rounded-full blur-3xl" />
      
      <div className="relative aspect-square rounded-2xl overflow-hidden flex items-center justify-center">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-[120%] h-[120%] object-cover object-center transition-transform duration-500 group-hover:scale-105 mix-blend-lighten"
          style={{ maskImage: 'radial-gradient(circle, black 40%, transparent 70%)', WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 70%)' }}
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          className="absolute top-2 right-2 p-1.5"
        >
          <Heart 
            size={16} 
            className={cn(
              "transition-colors",
              favorite ? "fill-white text-white" : "text-gray-500"
            )} 
          />
        </button>
      </div>

      <div className="px-2 pb-2 flex flex-col gap-1 z-10">
        <div className="flex items-end justify-between w-full">
          <span className="font-semibold text-[13px] text-white">{product.name}</span>
          <div className="flex-1 border-b border-dashed border-gray-600 mx-2 mb-[4px] opacity-30" />
          <span className="font-bold text-white text-[13px]">${product.price.toFixed(0)}</span>
        </div>
      </div>
    </motion.div>
  );
};
