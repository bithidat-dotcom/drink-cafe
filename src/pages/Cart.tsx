import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { formatPrice } from '../lib/utils';

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateCartQuantity } = useAppStore();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 50 : 0;
  const discount = 0;
  const total = subtotal + deliveryFee - discount;

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-32">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#FAF9F6]/80 backdrop-blur-md px-4 py-4 flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm border border-[#F5E6D3]"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">My Cart</h1>
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
              className="bg-white p-4 rounded-3xl shadow-sm border border-[#F5E6D3]/50 flex gap-4"
            >
              <img 
                src={item.productImage} 
                alt={item.productName} 
                className="w-20 h-20 rounded-2xl object-cover shrink-0"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-sm">{item.productName}</h3>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      {item.customization.size}, {item.customization.temperature}, {item.customization.milk}
                      {item.customization.extras.length > 0 && `, +${item.customization.extras.join(', ')}`}
                    </p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold text-[#4B3621]">{formatPrice(item.price * item.quantity)}</span>
                  <div className="flex items-center gap-3 bg-[#FAF9F6] px-2 py-1 rounded-xl">
                    <button 
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 flex items-center justify-center bg-white rounded-lg shadow-sm"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 flex items-center justify-center bg-[#4B3621] text-white rounded-lg"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {cart.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 opacity-50">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <ShoppingBag size={40} className="text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium">Your cart is empty</p>
            <button 
              onClick={() => navigate('/menu')}
              className="mt-6 text-[#4B3621] font-bold text-sm"
            >
              Explore Menu
            </button>
          </div>
        )}
      </div>

      {/* Order Summary */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-white rounded-t-[40px] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] border-t border-[#F5E6D3]">
          <div className="flex flex-col gap-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-bold">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Delivery Fee</span>
              <span className="font-bold">{formatPrice(deliveryFee)}</span>
            </div>
            <div className="h-px bg-[#F5E6D3]/50 my-1" />
            <div className="flex justify-between text-lg">
              <span className="font-bold">Total</span>
              <span className="font-black text-[#4B3621]">{formatPrice(total)}</span>
            </div>
          </div>
          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-[#4B3621] text-white py-4 rounded-3xl font-bold shadow-xl shadow-[#4B3621]/20 active:scale-[0.98] transition-transform"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};
