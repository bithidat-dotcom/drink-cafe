import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type NotificationType = 'success' | 'error' | 'info';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
}

interface NotificationContextType {
  showNotification: (title: string, message: string, type?: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = useCallback((title: string, message: string, type: NotificationType = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications((prev) => [...prev, { id, title, message, type }]);
    
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 5000);
  }, []);

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <div className="fixed top-4 left-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {notifications.map((n) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="pointer-events-auto bg-white/95 backdrop-blur-xl border border-white/50 shadow-2xl rounded-2xl p-4 flex items-start gap-3 w-full max-w-sm mx-auto"
            >
              <div className="shrink-0 mt-1">
                {n.type === 'success' && <CheckCircle2 className="text-green-500" size={24} />}
                {n.type === 'error' && <AlertCircle className="text-red-500" size={24} />}
                {n.type === 'info' && (
                  <div className="w-10 h-10 bg-[#C9794D] rounded-xl flex items-center justify-center">
                    <img 
                      src="https://i.postimg.cc/httNxF0X/c0a39348-2342-47b0-9302-5d757a66cdb2.png" 
                      alt="Logo" 
                      className="w-7 h-7"
                    />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-black text-[#2D1B08]">{n.title}</h4>
                <p className="text-[11px] text-stone-500 font-medium leading-tight mt-0.5">{n.message}</p>
              </div>
              <button 
                onClick={() => removeNotification(n.id)}
                className="text-stone-300 hover:text-stone-500 p-1"
              >
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
