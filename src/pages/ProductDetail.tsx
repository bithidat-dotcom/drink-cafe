import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Star, Heart, ShoppingCart } from 'lucide-react';
import { PRODUCTS } from '../data';
import { useAppStore } from '../store/useAppStore';
import { cn } from '../lib/utils';
import { ProductSize, ProductCustomization } from '../types';

export const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find(p => p.id === id);
  const { addToCart, toggleFavorite, isFavorite } = useAppStore();

  const [size, setSize] = useState<ProductSize>('Medium');
  const [addOns, setAddOns] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const favorite = isFavorite(product.id);

  const calculatePrice = () => {
    let totalPrice = product.price;
    if (size === 'Large') totalPrice += 1.0;
    if (size === 'Small') totalPrice -= 0.5;
    totalPrice += addOns.length * 0.5;
    return totalPrice * quantity;
  };

  const handleAddToCart = () => {
    const customization: ProductCustomization = {
      id: Math.random().toString(36).substr(2, 9),
      productId: product.id,
      size,
      temperature: 'Cold',
      milk: 'Regular',
      sugar: 'Normal',
      extras: [...addOns]
    };
    addToCart(product, customization, quantity);
    navigate('/cart');
  };

  const toggleSelection = (item: string, list: string[], setList: (l: string[]) => void) => {
    setList(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);
  };

  const cupSizes = [
    { id: 'Small', label: 'Small', iconScale: 0.75 },
    { id: 'Medium', label: 'Medium', iconScale: 0.9 },
    { id: 'Large', label: 'Large', iconScale: 1.05 },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-32 text-[#2D1B08] relative">
      {/* Curved Header Showcase */}
      <div className="absolute top-0 left-0 w-full h-[360px] bg-gradient-to-b from-[#C9794D] to-[#A85E36] rounded-b-[50px] z-0 overflow-hidden shadow-lg shadow-amber-900/10" />

      {/* Header Navigation */}
      <div className="relative z-20 pt-6 px-6 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2.5 bg-white/20 backdrop-blur-md rounded-full text-white active:scale-95 transition-transform">
          <ArrowLeft size={22} />
        </button>
        <button onClick={() => toggleFavorite(product.id)} className="p-2.5 bg-white/20 backdrop-blur-md rounded-full text-white active:scale-95 transition-transform">
          <Heart size={22} className={cn(favorite && "fill-white text-white")} />
        </button>
      </div>

      {/* Floating Coffee Showcase Image */}
      <div className="relative z-10 w-full flex justify-center mt-2 h-72">
        <div className="relative w-64 h-64 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-white/15 border border-white/20 shadow-inner" />
          <motion.img 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Product Content Details */}
      <div className="relative z-20 px-6 pt-6 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black text-[#2D1B08]">{product.name}</h1>
          <div className="flex items-center gap-1.5 text-sm bg-amber-100/80 px-3.5 py-1.5 rounded-full text-[#2D1B08] shadow-xs">
            <Star size={16} className="fill-[#C9794D] text-[#C9794D]" />
            <span className="font-extrabold">{product.rating}</span>
          </div>
        </div>

        <p className="text-sm text-stone-600 leading-relaxed font-medium">
          {product.description}
        </p>

        {/* Add-Ons and Quantity */}
        <div className="flex justify-between items-start mt-1">
          <div className="flex-1">
            <h3 className="text-sm font-bold text-[#2D1B08] mb-3">Custom Add-Ons:</h3>
            <div className="flex flex-wrap gap-3">
              {['Extra Shot', 'Whipped Cream', 'Vanilla Syrup'].map(item => (
                <button
                  key={item}
                  onClick={() => toggleSelection(item, addOns, setAddOns)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 flex items-center gap-2",
                    addOns.includes(item) 
                      ? "bg-[#C9794D] border-[#C9794D] text-white shadow-sm" 
                      : "bg-white border-[#EADCC9] text-stone-600 hover:border-[#C9794D]/50"
                  )}
                >
                  <div className={cn(
                    "w-3.5 h-3.5 rounded-full border flex items-center justify-center",
                    addOns.includes(item) ? "border-white bg-white" : "border-stone-400"
                  )}>
                    {addOns.includes(item) && <div className="w-1.5 h-1.5 bg-[#C9794D] rounded-full" />}
                  </div>
                  <span>{item}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Quantity Selector */}
          <div className="flex flex-col items-center gap-2 bg-white rounded-full p-1.5 border border-[#EADCC9] shadow-sm ml-2">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-7 h-7 rounded-full bg-amber-100/70 text-[#C9794D] flex items-center justify-center font-bold text-base active:scale-90 transition-transform">-</button>
            <span className="font-bold text-sm text-[#2D1B08]">{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)} className="w-7 h-7 rounded-full bg-[#C9794D] text-white flex items-center justify-center font-bold text-base shadow-sm active:scale-90 transition-transform">+</button>
          </div>
        </div>

        {/* Size Selection */}
        <div className="mt-1">
          <h3 className="text-sm font-bold text-[#2D1B08] mb-3">Select Size:</h3>
          <div className="flex justify-around items-center bg-white p-3 rounded-2xl border border-[#EADCC9]/80 shadow-xs">
            {cupSizes.map(s => {
              const isSelected = size === s.id;
              return (
                <button 
                  key={s.id} 
                  onClick={() => setSize(s.id as ProductSize)}
                  className={cn(
                    "flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200 min-w-[85px]",
                    isSelected 
                      ? "bg-amber-50 border-2 border-[#C9794D] shadow-sm scale-105" 
                      : "bg-transparent border border-transparent hover:bg-stone-50"
                  )}
                >
                  <div 
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-xs",
                      isSelected ? "bg-[#C9794D] text-white" : "bg-stone-100 text-stone-400"
                    )}
                  >
                    <svg 
                      width="20" 
                      height="26" 
                      viewBox="0 0 24 32" 
                      fill="currentColor" 
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ transform: `scale(${s.iconScale})` }}
                    >
                      <path d="M2 0H22L19 26C18.8 29.3 16 32 12 32C8 32 5.2 29.3 5 26L2 0Z" />
                    </svg>
                  </div>
                  <span className={cn("text-xs font-bold transition-colors", isSelected ? "text-[#C9794D]" : "text-stone-500")}>
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Sticky Add to Cart Action */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white/95 backdrop-blur-xl border-t border-[#EADCC9]/80 pb-safe-area-inset-bottom flex items-center justify-between z-30 shadow-2xl">
        <div className="flex flex-col">
          <span className="text-stone-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">Total Price</span>
          <div className="flex items-end gap-1.5">
            <span className="text-3xl font-black text-[#C9794D]">${calculatePrice().toFixed(2)}</span>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="flex-1 ml-6 bg-gradient-to-r from-[#C9794D] to-[#E09065] text-white py-3.5 px-6 rounded-full font-bold flex items-center justify-center gap-3 shadow-xl shadow-[#C9794D]/30 active:scale-[0.98] transition-all ripple-button"
        >
          <ShoppingCart size={20} className="drop-shadow-md" />
          <span className="tracking-wide text-sm font-bold">Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

