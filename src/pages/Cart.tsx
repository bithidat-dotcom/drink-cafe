import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateCartQuantity, user } = useAppStore();

  React.useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 2.50 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-36 text-[#2D1B08]">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md px-4 py-4 flex items-center gap-4 border-b border-[#EADCC9]/60">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-xs border border-[#EADCC9] active:scale-95 transition-transform"
        >
          <ArrowLeft size={20} className="text-[#2D1B08]" />
        </button>
        <h1 className="text-xl font-black text-[#2D1B08]">My Cart</h1>
      </div>

      <div className="px-4 py-4 flex flex-col gap-4">
        <AnimatePresence mode="popLayout">
          {cart.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white p-4 rounded-3xl shadow-md shadow-amber-900/5 border border-[#EADCC9]/60 flex gap-4 items-center"
            >
              <div className="w-20 h-20 rounded-2xl bg-[#F7F2EB] flex items-center justify-center p-2 relative shrink-0 overflow-hidden">
                <div 
                  className="absolute inset-0 opacity-20 mix-blend-multiply bg-cover bg-center"
                  style={{ backgroundImage: `url('https://i.pinimg.com/736x/25/2f/20/252f20859a24ffd746abd7bbd5af95e8.jpg')` }}
                />
                <img 
                  src={item.productImage} 
                  alt={item.productName} 
                  className="w-full h-full object-contain relative z-10 drop-shadow-md"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-[#2D1B08]">{item.productName}</h3>
                    <p className="text-[11px] text-stone-400 mt-0.5 font-medium">
                      {item.customization.size}
                      {item.customization.extras.length > 0 && `, ${item.customization.extras.join(', ')}`}
                    </p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-stone-400 hover:text-red-500 rounded-lg active:scale-90 transition-transform"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-extrabold text-[#C9794D] text-base">${(item.price * item.quantity).toFixed(2)}</span>
                  <div className="flex items-center gap-3 bg-[#FAF7F2] px-2.5 py-1 rounded-full border border-[#EADCC9]/60">
                    <button 
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 flex items-center justify-center bg-white rounded-full shadow-xs text-stone-600 font-bold active:scale-90"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="font-bold text-xs w-4 text-center text-[#2D1B08]">{item.quantity}</span>
                    <button 
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 flex items-center justify-center bg-[#C9794D] text-white rounded-full shadow-xs font-bold active:scale-90"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {cart.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 opacity-60">
            <div className="w-20 h-20 bg-amber-100/50 rounded-full flex items-center justify-center mb-4 text-[#C9794D]">
              <ShoppingBag size={38} />
            </div>
            <p className="text-stone-600 font-bold text-base">Your cart is empty</p>
            <button 
              onClick={() => navigate('/home')}
              className="mt-4 px-6 py-2.5 bg-[#C9794D] text-white font-bold text-xs rounded-full shadow-md active:scale-95 transition-transform"
            >
              Explore Menu
            </button>
          </div>
        )}
      </div>

      {/* Order Summary */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-white rounded-t-[40px] shadow-2xl border-t border-[#EADCC9]/80 z-30">
          <div className="flex flex-col gap-2.5 mb-5">
            <div className="flex justify-between text-xs font-medium text-stone-500">
              <span>Subtotal</span>
              <span className="font-bold text-[#2D1B08]">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs font-medium text-stone-500">
              <span>Delivery Fee</span>
              <span className="font-bold text-[#2D1B08]">${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="h-px bg-[#EADCC9]/60 my-1" />
            <div className="flex justify-between text-base">
              <span className="font-black text-[#2D1B08]">Total</span>
              <span className="font-black text-[#C9794D] text-xl">${total.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-gradient-to-r from-[#C9794D] to-[#E09065] text-white py-4 rounded-full font-bold shadow-xl shadow-[#C9794D]/30 active:scale-[0.98] transition-transform ripple-button"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

