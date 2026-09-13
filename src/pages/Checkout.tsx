import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin, CreditCard, Truck, ShoppingBag, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { formatPrice, cn } from '../lib/utils';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, clearCart, user } = useAppStore();

  React.useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);
  const [deliveryMethod, setDeliveryMethod] = useState<'Delivery' | 'Pickup'>('Delivery');
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'Mobile' | 'Card'>('Card');

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = deliveryMethod === 'Delivery' ? 50 : 0;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    // In a real app, this would save to Firebase
    clearCart();
    navigate('/order-confirmation');
  };

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
        <h1 className="text-xl font-bold">Checkout</h1>
      </div>

      <div className="px-4 py-6 flex flex-col gap-8">
        {/* Delivery Method */}
        <section>
          <h2 className="font-bold mb-4">Delivery Method</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setDeliveryMethod('Delivery')}
              className={cn(
                "p-4 rounded-3xl border-2 flex flex-col items-center gap-2 transition-all",
                deliveryMethod === 'Delivery' ? "bg-[#4B3621] border-[#4B3621] text-white" : "bg-white border-[#F5E6D3]/50 text-gray-500"
              )}
            >
              <Truck size={24} />
              <span className="font-bold text-sm">Delivery</span>
            </button>
            <button
              onClick={() => setDeliveryMethod('Pickup')}
              className={cn(
                "p-4 rounded-3xl border-2 flex flex-col items-center gap-2 transition-all",
                deliveryMethod === 'Pickup' ? "bg-[#4B3621] border-[#4B3621] text-white" : "bg-white border-[#F5E6D3]/50 text-gray-500"
              )}
            >
              <ShoppingBag size={24} />
              <span className="font-bold text-sm">Pickup</span>
            </button>
          </div>
        </section>

        {/* Shipping Address / Pickup Location */}
        <section className="bg-white p-5 rounded-[32px] shadow-sm border border-[#F5E6D3]/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold">Shipping Address</h2>
            <button className="text-[#4B3621] text-xs font-bold">Edit</button>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-[#FAF9F6] rounded-2xl flex items-center justify-center shrink-0">
              <MapPin size={22} className="text-[#4B3621]" />
            </div>
            <div>
              <p className="font-bold text-sm">Home</p>
              <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                House 12, Road 4, Sector 7<br />
                Uttara, Dhaka 1230
              </p>
            </div>
          </div>
        </section>

        {/* Payment Method */}
        <section>
          <h2 className="font-bold mb-4">Payment Method</h2>
          <div className="flex flex-col gap-3">
            {[
              { id: 'Card', label: 'Credit / Debit Card', icon: CreditCard },
              { id: 'Mobile', label: 'Mobile Payment (Bkash/Nagad)', icon: Wallet },
              { id: 'Cash', label: 'Cash on Delivery', icon: ShoppingBag }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setPaymentMethod(item.id as any)}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-2xl border-2 transition-all",
                  paymentMethod === item.id ? "border-[#4B3621] bg-[#FAF9F6]" : "border-[#F5E6D3]/50 bg-white"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center",
                  paymentMethod === item.id ? "bg-[#4B3621] text-white" : "bg-gray-100 text-gray-500"
                )}>
                  <item.icon size={20} />
                </div>
                <span className="font-bold text-sm flex-1 text-left">{item.label}</span>
                <div className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                  paymentMethod === item.id ? "border-[#4B3621]" : "border-gray-300"
                )}>
                  {paymentMethod === item.id && <div className="w-2.5 h-2.5 bg-[#4B3621] rounded-full" />}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Order Summary Recap */}
        <section className="bg-[#FAF9F6] p-5 rounded-[32px] border border-[#F5E6D3]">
          <h2 className="font-bold mb-4">Order Summary</h2>
          <div className="flex flex-col gap-3">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-500">{item.quantity}x {item.productName}</span>
                <span className="font-bold">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
            <div className="h-px bg-[#F5E6D3] my-2" />
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-bold">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Delivery Fee</span>
              <span className="font-bold">{formatPrice(deliveryFee)}</span>
            </div>
            <div className="flex justify-between text-lg mt-2">
              <span className="font-bold">Total</span>
              <span className="font-black text-[#4B3621]">{formatPrice(total)}</span>
            </div>
          </div>
        </section>
      </div>

      {/* Place Order Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-xl border-t border-[#F5E6D3] pb-safe-area-inset-bottom">
        <button
          onClick={handlePlaceOrder}
          className="w-full bg-[#4B3621] text-white py-4 rounded-3xl font-bold shadow-xl shadow-[#4B3621]/20 active:scale-[0.98] transition-transform"
        >
          Place Order — {formatPrice(total)}
        </button>
      </div>
    </div>
  );
};
