import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import { Heart, ShoppingBag, ChevronLeft, ChevronRight, Plus, Star, Zap, RefreshCw } from 'lucide-react';
import { PRODUCTS } from '../data';
import { Product, ProductSize } from '../types';
import { useAppStore } from '../store/useAppStore';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

export const Favorites: React.FC = () => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite, addToCart } = useAppStore();
  
  // Filter products in favorites list
  const favoriteProducts = PRODUCTS.filter(p => favorites.includes(p.id));

  // Sort so Coffee items appear 1st, then Tea, then Milkshake
  const sortedFavorites = [...favoriteProducts].sort((a, b) => {
    const order: Record<string, number> = { coffee: 1, tea: 2, milkshake: 3 };
    const aOrder = order[a.categoryId] || 99;
    const bOrder = order[b.categoryId] || 99;
    return aOrder - bOrder;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<ProductSize>('Medium');

  // Filtered by selected category if user taps chip
  const filteredCollection = sortedFavorites.filter(p => {
    if (activeCategory === 'all') return true;
    return p.categoryId === activeCategory;
  });

  // Keep index within bounds
  useEffect(() => {
    if (currentIndex >= filteredCollection.length && filteredCollection.length > 0) {
      setCurrentIndex(0);
    }
  }, [filteredCollection.length, currentIndex]);

  const activeProduct: Product | undefined = filteredCollection[currentIndex];
  const length = filteredCollection.length;

  const slideLeft = () => {
    if (length <= 1) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? length - 1 : prev - 1));
  };

  const slideRight = () => {
    if (length <= 1) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev === length - 1 ? 0 : prev + 1));
  };

  // Drag handler for touch swipe gestures
  const handleDragEnd = (_: any, info: PanInfo) => {
    const swipeThreshold = 35;
    if (info.offset.x < -swipeThreshold) {
      slideRight();
    } else if (info.offset.x > swipeThreshold) {
      slideLeft();
    }
  };

  // Price adjustment by size
  const getComputedPrice = (basePrice: number, size: ProductSize) => {
    if (size === 'Small') return Math.max(2.5, basePrice - 0.50);
    if (size === 'Large') return basePrice + 0.75;
    return basePrice;
  };

  // Direct Buy System
  const handleDirectBuy = (product: Product) => {
    addToCart(
      product,
      {
        id: Math.random().toString(36).substr(2, 9),
        productId: product.id,
        size: selectedSize,
        temperature: 'Cold',
        milk: 'Regular',
        sugar: 'Normal',
        extras: []
      },
      1
    );
    navigate('/checkout');
  };

  // Quick Add To Cart
  const handleAddToCart = (product: Product) => {
    addToCart(
      product,
      {
        id: Math.random().toString(36).substr(2, 9),
        productId: product.id,
        size: selectedSize,
        temperature: 'Cold',
        milk: 'Regular',
        sugar: 'Normal',
        extras: []
      },
      1
    );
  };

  // Restoration helper for empty state
  const restoreSampleFavorites = () => {
    ['1', '2', '4', '6'].forEach(id => {
      if (!favorites.includes(id)) {
        toggleFavorite(id);
      }
    });
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 280 : -280,
      opacity: 0,
      scale: 0.85,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.35, ease: [0.25, 1, 0.5, 1] }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 280 : -280,
      opacity: 0,
      scale: 0.85,
      transition: { duration: 0.35, ease: [0.25, 1, 0.5, 1] }
    })
  };

  const cupSizes: { id: ProductSize; label: string; scale: number }[] = [
    { id: 'Small', label: 'S (8 oz)', scale: 0.8 },
    { id: 'Medium', label: 'M (12 oz)', scale: 1.0 },
    { id: 'Large', label: 'L (16 oz)', scale: 1.2 }
  ];

  return (
    <div className="px-4 py-6 flex flex-col gap-5 text-[#2D1B08] pb-28">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#2D1B08]">My Collection</h1>
          <p className="text-stone-400 text-xs font-medium">Swipe left or right to switch coffees</p>
        </div>
        {favoriteProducts.length > 0 && (
          <span className="text-xs font-extrabold bg-amber-100/80 text-[#C9794D] px-3 py-1 rounded-full">
            {favoriteProducts.length} Saved
          </span>
        )}
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {[
          { id: 'all', label: 'All Favorites' },
          { id: 'coffee', label: '☕ Coffee First' },
          { id: 'tea', label: '🍃 Tea' },
          { id: 'milkshake', label: '🥛 Milkshake' }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setCurrentIndex(0);
            }}
            className={cn(
              "px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200",
              activeCategory === cat.id
                ? "bg-[#C9794D] text-white shadow-md shadow-[#C9794D]/20"
                : "bg-white border border-[#EADCC9] text-stone-600 hover:border-[#C9794D]/50"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Coffee Stage (Card Hidden - Clean Floating Drinks & Side Blurred Coffees) */}
      {filteredCollection.length > 0 && activeProduct ? (
        <div className="flex flex-col gap-4 mt-1">
          
          {/* Smooth Carousel Stage with Clean Floating Coffee */}
          <div className="relative w-full h-[260px] flex items-center justify-center overflow-hidden my-1 select-none">
            
            {/* Left Slide Arrow */}
            <button
              onClick={slideLeft}
              className="absolute left-1 z-30 w-9 h-9 bg-white/90 backdrop-blur-md rounded-full border border-[#EADCC9] text-[#2D1B08] flex items-center justify-center shadow-md active:scale-90 transition-transform"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Right Slide Arrow */}
            <button
              onClick={slideRight}
              className="absolute right-1 z-30 w-9 h-9 bg-white/90 backdrop-blur-md rounded-full border border-[#EADCC9] text-[#2D1B08] flex items-center justify-center shadow-md active:scale-90 transition-transform"
            >
              <ChevronRight size={20} />
            </button>

            {/* Animated Swipable Coffee Image (No Blur, Sharp & Clear Slide) */}
            <AnimatePresence custom={direction} mode="popLayout">
              <motion.div
                key={`active-${activeProduct.id}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                onClick={() => navigate(`/product/${activeProduct.id}`)}
                className="relative z-20 flex flex-col items-center justify-center cursor-pointer group"
              >
                {/* Floating Drink */}
                <div className="relative w-52 h-52 flex items-center justify-center">
                  <motion.img
                    src={activeProduct.image}
                    alt={activeProduct.name}
                    className="h-full object-contain relative z-10 drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicator Dots */}
          <div className="flex items-center justify-center gap-1.5 -mt-2">
            {filteredCollection.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  idx === currentIndex ? "w-6 bg-[#C9794D]" : "w-2 bg-stone-300"
                )}
              />
            ))}
          </div>

          {/* Product Header Info Under Coffee */}
          <div className="flex items-center justify-between px-2 pt-1">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-amber-100 text-[#C9794D] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {activeProduct.categoryId}
                </span>
                <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-full">
                  <Star size={13} className="fill-[#C9794D] text-[#C9794D]" />
                  <span className="font-bold text-xs">{activeProduct.rating}</span>
                </div>
              </div>
              <h2 className="text-xl font-black text-[#2D1B08] mt-1">{activeProduct.name}</h2>
            </div>

            <button
              onClick={() => toggleFavorite(activeProduct.id)}
              className="w-10 h-10 bg-white border border-[#EADCC9] text-[#C9794D] rounded-full flex items-center justify-center shadow-xs active:scale-90 transition-transform"
            >
              <Heart size={20} className="fill-[#C9794D]" />
            </button>
          </div>

          <p className="text-stone-500 text-xs px-2 line-clamp-2 font-medium">
            {activeProduct.description}
          </p>

          {/* Size Selector Under Coffee */}
          <div className="mt-1 bg-white p-3 rounded-2xl border border-[#EADCC9]/80 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#2D1B08]">Select Size:</span>
              <span className="text-[11px] text-[#C9794D] font-extrabold">{selectedSize}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {cupSizes.map(s => {
                const isSelected = selectedSize === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSize(s.id)}
                    className={cn(
                      "flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs transition-all duration-200 border",
                      isSelected
                        ? "bg-[#C9794D] text-white border-[#C9794D] shadow-sm scale-[1.02]"
                        : "bg-amber-50/50 border-[#EADCC9]/60 text-stone-600 hover:border-[#C9794D]/40"
                    )}
                  >
                    <svg 
                      width="16" 
                      height="20" 
                      viewBox="0 0 24 32" 
                      fill="currentColor" 
                      className={isSelected ? "text-white" : "text-[#C9794D]"}
                      style={{ transform: `scale(${s.scale})` }}
                    >
                      <path d="M2 0H22L19 26C18.8 29.3 16 32 12 32C8 32 5.2 29.3 5 26L2 0Z" />
                    </svg>
                    <span>{s.id[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price & Direct Buy System */}
          <div className="mt-1 bg-white p-4 rounded-2xl border border-[#EADCC9]/80 shadow-md flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] text-stone-400 font-bold uppercase block">Total Price</span>
              <span className="text-2xl font-black text-[#2D1B08]">
                ${getComputedPrice(activeProduct.price, selectedSize).toFixed(2)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Add to Bag Button */}
              <button
                onClick={() => handleAddToCart(activeProduct)}
                className="w-11 h-11 bg-amber-100 text-[#C9794D] rounded-full flex items-center justify-center active:scale-90 transition-transform shadow-xs"
                title="Add to Cart"
              >
                <ShoppingBag size={20} />
              </button>

              {/* Direct Buy System Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDirectBuy(activeProduct)}
                className="bg-gradient-to-r from-[#C9794D] to-[#E09065] text-white px-5 py-3 rounded-full font-black text-xs flex items-center gap-2 shadow-lg shadow-[#C9794D]/30 ripple-button"
              >
                <Zap size={16} className="fill-white" />
                <span>Direct Buy</span>
              </motion.button>
            </div>
          </div>

          {/* Quick Switch Strip */}
          <div className="mt-4 flex flex-col gap-2">
            <h3 className="font-bold text-xs text-[#2D1B08]">Quick Switch Collection</h3>
            <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide">
              {filteredCollection.map((product, idx) => (
                <button
                  key={product.id}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={cn(
                    "flex items-center gap-2.5 p-2 rounded-2xl border transition-all shrink-0 min-w-[140px]",
                    idx === currentIndex
                      ? "bg-amber-100/60 border-[#C9794D] shadow-xs"
                      : "bg-white border-[#EADCC9]/70 hover:border-[#C9794D]/40"
                  )}
                >
                  <div className="w-9 h-9 rounded-xl bg-amber-50 p-1 flex items-center justify-center shrink-0">
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain drop-shadow-xs" />
                  </div>
                  <div className="flex flex-col text-left truncate">
                    <span className="font-bold text-xs text-[#2D1B08] truncate">{product.name}</span>
                    <span className="font-black text-[11px] text-[#C9794D]">${product.price.toFixed(2)}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 bg-amber-100/60 rounded-full flex items-center justify-center mb-4 text-[#C9794D]">
            <Heart size={38} />
          </div>
          <h2 className="text-lg font-black text-[#2D1B08]">No Drinks in Collection</h2>
          <p className="text-stone-400 text-xs mt-1 max-w-xs font-medium">
            Tap the heart icon on any Coffee, Tea, or Milkshake to build your swipable collection!
          </p>

          <button
            onClick={restoreSampleFavorites}
            className="mt-6 px-6 py-3 bg-[#C9794D] text-white text-xs font-bold rounded-full shadow-lg shadow-[#C9794D]/30 flex items-center gap-2 active:scale-95 transition-transform"
          >
            <RefreshCw size={16} />
            <span>Load Sample Collection</span>
          </button>
        </div>
      )}
    </div>
  );
};

