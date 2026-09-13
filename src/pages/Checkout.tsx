import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin, CreditCard, Truck, ShoppingBag, Wallet, Tag, User, Phone, CheckCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { formatPrice, cn } from '../lib/utils';
import { doc, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

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
  
  // Order & Buyer Details Required for Server
  const [buyerName, setBuyerName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [location, setLocation] = useState('House 12, Road 4, Sector 7, Uttara, Dhaka 1230');
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = deliveryMethod === 'Delivery' ? 50 : 0;
  const total = Math.max(0, subtotal + deliveryFee - discountAmount);

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'DRINK10' || code === 'WELCOME') {
      setDiscountAmount(50);
      setCouponApplied(true);
    } else if (code.length > 0) {
      setDiscountAmount(30);
      setCouponApplied(true);
    }
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      navigate('/home');
      return;
    }

    setSubmitting(true);
    try {
      const orderId = `DC-${Math.floor(100000 + Math.random() * 900000)}`;
      
      const orderData = {
        id: orderId,
        orderId,
        userId: user?.id || 'guest',
        buyerName: buyerName.trim() || user?.name || 'Valued Buyer',
        phone: phone.trim() || user?.phone || 'N/A',
        phoneNumber: phone.trim() || user?.phone || 'N/A',
        location: location.trim() || 'Uttara, Dhaka',
        address: location.trim() || 'Uttara, Dhaka',
        coupon: couponApplied ? (couponCode.trim().toUpperCase() || 'PROMO') : 'NONE',
        couponCode: couponApplied ? (couponCode.trim().toUpperCase() || 'PROMO') : 'NONE',
        discount: discountAmount,
        subtotal,
        deliveryFee,
        total,
        totalPrice: total,
        deliveryMethod,
        paymentMethod,
        status: 'ORDER PLACED',
        createdAt: new Date().toISOString(),
        products: cart.map(item => ({
          productId: item.productId,
          productName: item.productName,
          price: item.price,
          quantity: item.quantity,
          totalPrice: item.price * item.quantity,
          customization: item.customization
        }))
      };

      // Save directly to Firestore Cloud Database Server
      await setDoc(doc(db, 'orders', orderId), orderData);
      
      clearCart();
      navigate('/order-confirmation', { state: { order: orderData } });
    } catch (error) {
      console.error('Failed to send order to server:', error);
      handleFirestoreError(error, OperationType.CREATE, 'orders');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-36 text-[#2D1B08]">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#FAF9F6]/90 backdrop-blur-md px-4 py-4 flex items-center gap-4 border-b border-[#F5E6D3]">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-xs border border-[#F5E6D3] active:scale-95 transition-transform"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-xl font-bold">Checkout</h1>
          <p className="text-[11px] text-stone-400 font-medium">Server database sync enabled</p>
        </div>
      </div>

      <div className="px-4 py-6 flex flex-col gap-6">
        {/* Buyer Information Section */}
        <section className="bg-white p-5 rounded-[32px] shadow-sm border border-[#F5E6D3]">
          <h2 className="font-extrabold text-[#2D1B08] text-sm mb-3 flex items-center gap-2">
            <User size={18} className="text-[#C9794D]" />
            Buyer Information
          </h2>
          <div className="flex flex-col gap-3">
            <div>
              <label className="text-xs font-bold text-stone-500 mb-1 block">Buyer Name</label>
              <div className="relative">
                <input
                  type="text"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  placeholder="Enter full name"
                  className="w-full bg-[#FAF9F6] border border-[#F5E6D3] rounded-2xl py-3 px-4 text-xs font-bold focus:outline-none focus:border-[#C9794D]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-500 mb-1 block">Phone Number</label>
              <div className="relative">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter phone number"
                  className="w-full bg-[#FAF9F6] border border-[#F5E6D3] rounded-2xl py-3 px-4 text-xs font-bold focus:outline-none focus:border-[#C9794D]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Location / Address Section */}
        <section className="bg-white p-5 rounded-[32px] shadow-sm border border-[#F5E6D3]">
          <h2 className="font-extrabold text-[#2D1B08] text-sm mb-3 flex items-center gap-2">
            <MapPin size={18} className="text-[#C9794D]" />
            Delivery Location
          </h2>
          <textarea
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            rows={2}
            placeholder="Enter full delivery address/location"
            className="w-full bg-[#FAF9F6] border border-[#F5E6D3] rounded-2xl p-3 text-xs font-medium focus:outline-none focus:border-[#C9794D] resize-none"
          />
        </section>

        {/* Coupon Code Section */}
        <section className="bg-white p-5 rounded-[32px] shadow-sm border border-[#F5E6D3]">
          <h2 className="font-extrabold text-[#2D1B08] text-sm mb-3 flex items-center gap-2">
            <Tag size={18} className="text-[#C9794D]" />
            Coupon Discount
          </h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => {
                setCouponCode(e.target.value);
                setCouponApplied(false);
              }}
              placeholder="Enter Coupon (e.g. DRINK10)"
              className="flex-1 bg-[#FAF9F6] border border-[#F5E6D3] rounded-2xl px-4 py-2.5 text-xs font-bold uppercase focus:outline-none focus:border-[#C9794D]"
            />
            <button
              onClick={handleApplyCoupon}
              className="px-5 py-2.5 bg-[#2D1B08] text-white text-xs font-bold rounded-2xl hover:bg-[#4B3621] transition-colors"
            >
              Apply
            </button>
          </div>
          {couponApplied && (
            <p className="text-[11px] font-bold text-emerald-600 mt-2 flex items-center gap-1">
              <CheckCircle size={14} />
              Coupon Applied! Discount: {formatPrice(discountAmount)}
            </p>
          )}
        </section>

        {/* Delivery Method */}
        <section>
          <h2 className="font-bold text-sm mb-3">Delivery Method</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setDeliveryMethod('Delivery')}
              className={cn(
                "p-4 rounded-3xl border-2 flex flex-col items-center gap-2 transition-all",
                deliveryMethod === 'Delivery' ? "bg-[#4B3621] border-[#4B3621] text-white" : "bg-white border-[#F5E6D3]/50 text-stone-500"
              )}
            >
              <Truck size={22} />
              <span className="font-bold text-xs">Delivery (৳50)</span>
            </button>
            <button
              onClick={() => setDeliveryMethod('Pickup')}
              className={cn(
                "p-4 rounded-3xl border-2 flex flex-col items-center gap-2 transition-all",
                deliveryMethod === 'Pickup' ? "bg-[#4B3621] border-[#4B3621] text-white" : "bg-white border-[#F5E6D3]/50 text-stone-500"
              )}
            >
              <ShoppingBag size={22} />
              <span className="font-bold text-xs">Pickup (Free)</span>
            </button>
          </div>
        </section>

        {/* Payment Method */}
        <section>
          <h2 className="font-bold text-sm mb-3">Payment Method</h2>
          <div className="flex flex-col gap-2.5">
            {[
              { id: 'Card', label: 'Credit / Debit Card', icon: CreditCard },
              { id: 'Mobile', label: 'Mobile Payment (bKash/Nagad)', icon: Wallet },
              { id: 'Cash', label: 'Cash on Delivery', icon: ShoppingBag }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setPaymentMethod(item.id as any)}
                className={cn(
                  "flex items-center gap-4 p-3.5 rounded-2xl border-2 transition-all",
                  paymentMethod === item.id ? "border-[#4B3621] bg-[#FAF9F6]" : "border-[#F5E6D3]/50 bg-white"
                )}
              >
                <div className={cn(
                  "w-9 h-9 rounded-xl flex items-center justify-center",
                  paymentMethod === item.id ? "bg-[#4B3621] text-white" : "bg-stone-100 text-stone-500"
                )}>
                  <item.icon size={18} />
                </div>
                <span className="font-bold text-xs flex-1 text-left">{item.label}</span>
                <div className={cn(
                  "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                  paymentMethod === item.id ? "border-[#4B3621]" : "border-stone-300"
                )}>
                  {paymentMethod === item.id && <div className="w-2 h-2 bg-[#4B3621] rounded-full" />}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Order Details & Summary Sent to Server */}
        <section className="bg-white p-5 rounded-[32px] border border-[#F5E6D3] shadow-sm">
          <h2 className="font-bold text-sm mb-3">Product Name & Price Details</h2>
          <div className="flex flex-col gap-3">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between text-xs py-1 border-b border-stone-100 last:border-0">
                <div>
                  <span className="font-bold text-[#2D1B08]">{item.productName}</span>
                  <span className="text-stone-400 text-[10px] block">Qty: {item.quantity} x {formatPrice(item.price)}</span>
                </div>
                <span className="font-extrabold text-[#C9794D]">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}

            <div className="h-px bg-[#F5E6D3] my-1" />

            <div className="flex justify-between text-xs">
              <span className="text-stone-500">Subtotal</span>
              <span className="font-bold">{formatPrice(subtotal)}</span>
            </div>

            <div className="flex justify-between text-xs">
              <span className="text-stone-500">Delivery Fee</span>
              <span className="font-bold">{formatPrice(deliveryFee)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-xs text-emerald-600 font-bold">
                <span>Coupon Discount ({couponCode})</span>
                <span>-{formatPrice(discountAmount)}</span>
              </div>
            )}

            <div className="flex justify-between text-base pt-2 border-t border-stone-200">
              <span className="font-black">Total Amount</span>
              <span className="font-black text-[#C9794D]">{formatPrice(total)}</span>
            </div>
          </div>
        </section>
      </div>

      {/* Submit / Place Order Button */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white/90 backdrop-blur-xl border-t border-[#F5E6D3] z-30">
        <button
          onClick={handlePlaceOrder}
          disabled={submitting}
          className="w-full bg-[#2D1B08] text-white py-4 rounded-3xl font-bold text-sm shadow-xl shadow-[#2D1B08]/20 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform disabled:opacity-50"
        >
          {submitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Sending Order to Server...
            </>
          ) : (
            `Place Order — ${formatPrice(total)}`
          )}
        </button>
      </div>
    </div>
  );
};

