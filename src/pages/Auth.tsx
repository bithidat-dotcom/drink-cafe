import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, User, Phone, AlertCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { useNotification } from '../components/NotificationProvider';

export const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { login, register, user } = useAppStore();
  const { showNotification } = useNotification();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        await register(phone, password, name);
        showNotification('Welcome to Drink Cafe', 'Account created successfully. Enjoy your day', 'info');
      } else {
        await login(phone, password);
        showNotification('Welcome back!', 'Logged in successfully. Enjoy your day', 'info');
      }
      navigate('/home');
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-6 bg-[#2D1B08]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://i.pinimg.com/736x/23/6d/92/236d929ea7c5070666f3fc4902cb0e3b.jpg" 
          alt="Auth Background" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2D1B08] via-transparent to-[#2D1B08]" />
      </div>

      <div className="relative z-10 w-full max-w-sm flex flex-col items-center">
        <motion.img 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          src="https://i.postimg.cc/httNxF0X/c0a39348-2342-47b0-9302-5d757a66cdb2.png" 
          alt="Coffee Vibe Logo" 
          className="h-24 mb-8 drop-shadow-2xl"
        />

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full bg-white/95 backdrop-blur-xl p-6 rounded-[32px] shadow-2xl border border-white/60 flex flex-col gap-4 text-[#2D1B08]"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-extrabold text-lg text-[#2D1B08]">{isSignUp ? 'Create Account' : 'Sign In'}</h3>
            <span className="text-[10px] bg-amber-100 text-[#C9794D] font-bold px-3 py-1 rounded-full">
              Mobile Auth
            </span>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-bold flex items-center gap-2 border border-red-100">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleAuth} className="flex flex-col gap-4">
            {isSignUp && (
              <div className="flex items-center gap-3 bg-stone-100 p-4 rounded-2xl border border-stone-200">
                <User size={20} className="text-stone-400 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent text-sm font-bold text-[#2D1B08] focus:outline-none placeholder-stone-400"
                />
              </div>
            )}

            <div className="flex items-center gap-3 bg-stone-100 p-4 rounded-2xl border border-stone-200">
              <Phone size={20} className="text-stone-400 shrink-0" />
              <input 
                type="tel" 
                placeholder="Mobile Number" 
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-transparent text-sm font-bold text-[#2D1B08] focus:outline-none placeholder-stone-400"
              />
            </div>

            <div className="flex items-center gap-3 bg-stone-100 p-4 rounded-2xl border border-stone-200">
              <Lock size={20} className="text-stone-400 shrink-0" />
              <input 
                type="password" 
                placeholder="Password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-sm font-bold text-[#2D1B08] focus:outline-none placeholder-stone-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#C9794D] text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-[#C9794D]/30 active:scale-[0.98] transition-transform mt-2 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : (isSignUp ? 'Create Account' : 'Sign In')}
            </button>
          </form>

          <div className="flex flex-col gap-3 mt-2">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-stone-500 hover:text-[#C9794D] text-xs font-bold text-center active:scale-95 transition-transform"
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
