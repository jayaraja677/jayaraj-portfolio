import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { ToastMessage } from '../../types/portfolio';

export interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const icons = {
            success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
            error: <AlertCircle className="w-5 h-5 text-crimson-accent shrink-0" />,
            info: <Info className="w-5 h-5 text-text-secondary shrink-0" />,
            warning: <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />,
          };

          const borders = {
            success: 'border-emerald-500/30',
            error: 'border-crimson',
            info: 'border-border-subtle',
            warning: 'border-amber-500/30',
          };

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-lg bg-bg-card border ${borders[toast.type]} shadow-xl text-sm`}
            >
              <div className="flex items-center gap-3">
                {icons[toast.type]}
                <span className="text-text-primary font-medium">{toast.message}</span>
              </div>
              <button
                onClick={() => onDismiss(toast.id)}
                className="text-text-secondary hover:text-text-primary p-1 rounded transition-colors"
                aria-label="Dismiss toast"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
