import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, ArrowLeft, Check, RefreshCw, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ErrorPageProps {
  title?: string;
  message?: string;
  onOk?: () => void;
  onBack?: () => void;
  isBoundary?: boolean;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({
  title = "Oops! Something Went Wrong",
  message = "An unexpected error occurred or the requested page is unavailable. Please try again.",
  onOk,
  onBack,
  isBoundary = false,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate('/home');
      }
    }
  };

  const handleOk = () => {
    if (onOk) {
      onOk();
    } else {
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-6 text-[#2D1B08] relative overflow-hidden">
      {/* Soft background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#C9794D]/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-[#EADCC9]/80 text-center flex flex-col items-center gap-5 relative z-10"
      >
        {/* Brand Logo Header */}
        <img
          src="https://i.postimg.cc/httNxF0X/c0a39348-2342-47b0-9302-5d757a66cdb2.png"
          alt="Coffee Logo"
          className="h-14 object-contain drop-shadow-sm"
        />

        {/* Error Alert Icon Badge */}
        <div className="w-16 h-16 rounded-full bg-amber-50 border-2 border-[#C9794D]/30 flex items-center justify-center shadow-inner text-[#C9794D]">
          <AlertTriangle size={32} />
        </div>

        {/* Text Details */}
        <div className="flex flex-col gap-1.5">
          <h2 className="text-xl font-extrabold text-[#2D1B08] tracking-tight">{title}</h2>
          <p className="text-stone-500 text-xs font-medium leading-relaxed px-2">
            {message}
          </p>
        </div>

        {/* Action Buttons: OK and Back */}
        <div className="grid grid-cols-2 gap-3 w-full mt-2">
          {/* Back Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleBack}
            className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-stone-100 hover:bg-stone-200 text-[#2D1B08] font-bold text-xs border border-stone-200 shadow-xs transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </motion.button>

          {/* OK Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleOk}
            className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-[#C9794D] hover:bg-[#b5683c] text-white font-bold text-xs shadow-md shadow-[#C9794D]/30 transition-all"
          >
            <Check size={16} strokeWidth={2.5} />
            <span>OK</span>
          </motion.button>
        </div>

        {/* Go to Home shortcut if boundary */}
        {isBoundary && (
          <button
            onClick={() => window.location.href = '/home'}
            className="text-[11px] text-stone-400 hover:text-[#C9794D] font-medium flex items-center gap-1 transition-colors mt-1"
          >
            <Home size={12} />
            <span>Return to Main Home</span>
          </button>
        )}
      </motion.div>
    </div>
  );
};
