import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Lock, Phone, UserCheck, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordLogin, setShowPasswordLogin] = useState(false);
  const [progress, setProgress] = useState(0);

  // 1.5 Second Splash Auto-Transition to Home (Welcome only, paused/stopped on Login)
  useEffect(() => {
    if (showPasswordLogin) return; // In login time, no auto-timer

    const startTime = Date.now();
    const duration = 1500; // 1.5 seconds

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);

      if (elapsed >= duration) {
        clearInterval(interval);
        const hasInteracted = localStorage.getItem('user_interacted');
        if (!hasInteracted) {
          localStorage.setItem('userMobile', 'Guest User');
          navigate('/home');
        }
      }
    }, 30);

    return () => clearInterval(interval);
  }, [navigate, showPasswordLogin]);

  const handleEnterApp = (isGuest = false) => {
    localStorage.setItem('user_interacted', 'true');
    if (isGuest || !mobileNumber) {
      localStorage.setItem('userMobile', 'Guest User');
    } else {
      localStorage.setItem('userMobile', mobileNumber);
    }
    navigate('/home');
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-between py-10 px-6 bg-[#2D1B08]">
      
      {/* 1.5s Auto-Transition Top Progress Bar (Welcome state only) */}
      {!showPasswordLogin && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-30">
          <div 
            className="h-full bg-[#C9794D] transition-all duration-75 ease-linear shadow-sm"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Full Cover Custom Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="https://i.pinimg.com/736x/23/6d/92/236d929ea7c5070666f3fc4902cb0e3b.jpg" 
          alt="Coffee Welcome Background" 
          className="w-full h-full object-cover opacity-90 scale-105"
        />
        {/* Dark Warm Gradient Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2D1B08]/75 via-[#2D1B08]/45 to-[#2D1B08]/90" />
      </div>

      {/* Header */}
      <div className="relative z-10 flex flex-col items-center mt-4 text-center">
        <motion.img 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          src="https://i.postimg.cc/httNxF0X/c0a39348-2342-47b0-9302-5d757a66cdb2.png" 
          alt="Coffee Vibe Logo" 
          className="h-20 mb-2 drop-shadow-2xl"
        />
        <motion.h1 
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-white font-black text-3xl tracking-wider uppercase drop-shadow-lg font-serif"
        >
          {showPasswordLogin ? 'Sign In' : 'Welcome'}
        </motion.h1>
      </div>

      {/* Center Spacer */}
      <div className="relative z-10 flex-1" />

      {/* Action Area & Login Form */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="relative z-10 w-full max-w-sm flex flex-col gap-3.5 mb-2"
      >
        <AnimatePresence mode="wait">
          {!showPasswordLogin ? (
            <motion.div 
              key="quick-enter"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-3"
            >
              {/* Enter as Guest / Direct Entry */}
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => handleEnterApp(true)}
                className="w-full bg-gradient-to-r from-[#C9794D] to-[#E09065] text-white py-4 px-6 rounded-[30px] flex items-center justify-between group shadow-2xl shadow-amber-950/60 border border-white/20 active:scale-[0.98] transition-all ripple-button"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                    <UserCheck size={18} className="text-white" />
                  </div>
                  <div className="text-left">
                    <span className="font-extrabold text-sm block leading-tight">Enter Without Login</span>
                    <span className="text-[10px] text-amber-100/80 font-medium">Instant Guest Access</span>
                  </div>
                </div>
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-[#C9794D] transition-all shadow-sm">
                  <ArrowRight size={20} />
                </div>
              </motion.button>

              {/* Password Login Toggle */}
              <button
                onClick={() => {
                  localStorage.setItem('user_interacted', 'true');
                  setShowPasswordLogin(true);
                }}
                className="w-full bg-black/40 backdrop-blur-md text-amber-100 hover:text-white py-3 px-6 rounded-[30px] border border-white/20 text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <Lock size={15} className="text-[#C9794D]" />
                <span>Password Login System</span>
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="password-form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white/95 backdrop-blur-xl p-5 rounded-[32px] shadow-2xl border border-white/60 flex flex-col gap-3 text-[#2D1B08]"
            >
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-extrabold text-base text-[#2D1B08]">Sign In</h3>
                <span className="text-[10px] bg-amber-100 text-[#C9794D] font-bold px-2.5 py-0.5 rounded-full">
                  Password Auth
                </span>
              </div>

              {/* Mobile Input */}
              <div className="flex items-center gap-2 bg-stone-100 p-3 rounded-2xl border border-stone-200">
                <Phone size={18} className="text-stone-400 shrink-0" />
                <input 
                  type="tel" 
                  placeholder="Mobile Number" 
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="w-full bg-transparent text-sm font-bold text-[#2D1B08] focus:outline-none placeholder-stone-400"
                />
              </div>

              {/* Password Input */}
              <div className="flex items-center gap-2 bg-stone-100 p-3 rounded-2xl border border-stone-200">
                <Lock size={18} className="text-stone-400 shrink-0" />
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent text-sm font-bold text-[#2D1B08] focus:outline-none placeholder-stone-400"
                />
              </div>

              {/* Login Button */}
              <button
                onClick={() => handleEnterApp(false)}
                className="w-full bg-[#C9794D] text-white py-3.5 rounded-2xl font-bold text-sm shadow-md shadow-[#C9794D]/30 active:scale-95 transition-transform mt-1"
              >
                Login & Continue
              </button>

              {/* Guest Fallback */}
              <button
                onClick={() => handleEnterApp(true)}
                className="text-stone-500 hover:text-[#C9794D] text-xs font-semibold text-center mt-1 active:scale-95 transition-transform"
              >
                Skip & Login as Guest
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

    </div>
  );
};

