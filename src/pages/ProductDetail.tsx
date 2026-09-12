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
  const [customizations, setCustomizations] = useState<string[]>(['Extra Milk']);
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
      temperature: 'Hot',
      milk: 'Regular',
      sugar: 'Normal',
      extras: [...customizations, ...addOns]
    };
    addToCart(product, customization, quantity);
    navigate('/cart');
  };

  const toggleSelection = (item: string, list: string[], setList: (l: string[]) => void) => {
    setList(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);
  };

  const cupSizes = [
    { id: 'Small', label: 'Small', iconScale: 0.7 },
    { id: 'Medium', label: 'Medium', iconScale: 0.85 },
    { id: 'Large', label: 'Large', iconScale: 1 },
  ];

  return (
    <div className="min-h-screen bg-[#151515] pb-32 text-white relative">
      {/* Curved Orange Header */}
      <div className="absolute top-0 left-0 w-full h-[45%] bg-[#C9794D] rounded-b-[60px] z-0" />

      {/* Header Actions */}
      <div className="relative z-20 pt-8 px-6 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-white">
          <ArrowLeft size={24} />
        </button>
        <button onClick={() => toggleFavorite(product.id)} className="p-2 -mr-2 text-white">
          <Heart size={24} className={cn(favorite && "fill-white")} />
        </button>
      </div>

      {/* Product Image */}
      <div className="relative z-10 w-full flex justify-center mt-4 h-64">
        <motion.img 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          src={product.image} 
          alt={product.name} 
          className="h-[120%] object-cover object-bottom mix-blend-multiply drop-shadow-2xl"
          style={{ maskImage: 'radial-gradient(ellipse at bottom, black 40%, transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse at bottom, black 40%, transparent 70%)' }}
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
           <h1 className="text-8xl font-black text-white mix-blend-overlay tracking-tighter w-full text-center truncate px-4">{product.name}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 px-6 pt-16 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="flex items-center gap-1 text-sm">
            <Star size={16} className="fill-[#C9794D] text-[#C9794D]" />
            <span className="font-bold">{product.rating}</span>
            <span className="text-gray-500">({product.reviewCount}+ Reviews)</span>
          </div>
        </div>

        {/* Customizations */}
        <div>
          <h3 className="text-sm font-semibold mb-3">Customizations:</h3>
          <div className="flex flex-wrap gap-4">
            {['Extra Milk', 'Less Sugar', 'Add Flavor'].map(item => (
              <label key={item} className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
                <div className={cn(
                  "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                  customizations.includes(item) ? "bg-[#C9794D] border-[#C9794D]" : "border-gray-500"
                )}>
                  {customizations.includes(item) && <div className="w-2 h-2 bg-white rounded-sm" />}
                </div>
                {item}
              </label>
            ))}
          </div>
        </div>

        {/* Add-Ons */}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-sm font-semibold mb-3">Add-Ons:</h3>
            <div className="flex flex-wrap gap-4">
              {['Extra Shot', 'Whipped Cream'].map(item => (
                <label key={item} className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
                  <div className={cn(
                    "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                    addOns.includes(item) ? "bg-[#C9794D] border-[#C9794D]" : "border-gray-500"
                  )}>
                    {addOns.includes(item) && <div className="w-2 h-2 bg-white rounded-sm" />}
                  </div>
                  {item}
                </label>
              ))}
            </div>
          </div>
          
          {/* Quantity */}
          <div className="flex flex-col items-center gap-2 bg-[#1C1C1C] rounded-full p-1 border border-white/5">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-6 h-6 rounded-full bg-[#C9794D]/20 text-[#C9794D] flex items-center justify-center font-bold text-lg">-</button>
            <span className="font-bold text-sm">{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)} className="w-6 h-6 rounded-full bg-[#C9794D] text-white flex items-center justify-center font-bold text-lg">+</button>
          </div>
        </div>

        {/* Size */}
        <div>
          <h3 className="text-sm font-semibold mb-3">Size</h3>
          <div className="flex justify-between items-end px-4">
            {cupSizes.map(s => (
              <button 
                key={s.id} 
                onClick={() => setSize(s.id as ProductSize)}
                className="flex flex-col items-center gap-2 group"
              >
                <div 
                  className={cn("transition-colors", size === s.id ? "text-[#C9794D]" : "text-gray-600")}
                  style={{ transform: `scale(${s.iconScale})` }}
                >
                  <svg width="24" height="32" viewBox="0 0 24 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 0H22L19 26C18.8 29.3 16 32 12 32C8 32 5.2 29.3 5 26L2 0Z" />
                  </svg>
                </div>
                <span className={cn("text-xs font-semibold transition-colors", size === s.id ? "text-[#C9794D]" : "text-gray-500")}>
                  {s.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Sticky Action */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-[#151515] pb-safe-area-inset-bottom flex items-center justify-between z-30">
        <div className="flex items-end gap-1">
          <span className="text-3xl font-bold">${Math.floor(calculatePrice())}</span>
          <span className="text-sm text-gray-500 mb-1 line-through">${(calculatePrice() + 0.5).toFixed(2)}</span>
        </div>
        <button
          onClick={handleAddToCart}
          className="w-1/2 bg-[#C9794D] text-white py-4 rounded-3xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-[#C9794D]/20 active:scale-[0.98] transition-transform ripple-button"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};
