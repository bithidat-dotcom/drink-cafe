import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';

export const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const { user, signInWithGoogle } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  const handleGetStarted = async () => {
    try {
      await signInWithGoogle();
    } catch (e) {
      // Continue anyway as guest if login fails or modal is closed
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen bg-[#DBCBB1] relative overflow-hidden flex flex-col items-center justify-between py-16 px-6">
      
      {/* Background Coffee Splash */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center"
      >
        <img 
          src="https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=1000" 
          alt="Coffee splash" 
          className="w-full h-full object-cover mix-blend-multiply opacity-60"
        />
      </motion.div>

      {/* Header */}
      <div className="relative z-10 flex flex-col items-center mt-10">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2 mb-2"
        >
          <h1 className="text-5xl font-black text-[#2D1B08] tracking-tighter">Coffee<span className="font-light italic text-[#C9794D]">Vibe</span></h1>
        </motion.div>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-[#4B3621]/70 text-sm font-medium"
        >
          Your perfect coffee awaits.
        </motion.p>
      </div>

      {/* Main Image */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="relative z-10 flex-1 w-full max-w-sm flex items-center justify-center my-8"
      >
        <img 
          src="https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=600" 
          alt="Coffee cup splash"
          className="w-full object-contain drop-shadow-2xl mix-blend-multiply" 
          style={{ clipPath: 'circle(45% at 50% 50%)' }}
        />
      </motion.div>

      {/* Action Button */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="relative z-10 w-full max-w-sm"
      >
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleGetStarted}
          className="w-full bg-[#151515] text-white py-4 px-6 rounded-[30px] flex items-center justify-between group shadow-xl ripple-button"
        >
          <span className="font-medium ml-4 relative z-10 pointer-events-none">Sign In & Continue</span>
          <div className="w-10 h-10 bg-[#2A2A2A] rounded-full flex items-center justify-center group-hover:bg-[#C9794D] transition-colors relative z-10 pointer-events-none">
            <ArrowRight size={18} />
          </div>
        </motion.button>
        <div className="text-center mt-4">
          <button onClick={() => navigate('/home')} className="text-[#2D1B08]/60 text-xs font-semibold uppercase tracking-widest hover:text-[#2D1B08] transition-colors">
            Continue as Guest
          </button>
        </div>
      </motion.div>

    </div>
  );
};
