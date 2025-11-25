'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Toast.module.css';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  id: string;
  type?: ToastType;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
  showCloseButton?: boolean;
}

export const Toast: React.FC<ToastProps> = ({
  id,
  type = 'info',
  message,
  duration = 3000,
  onClose,
  showCloseButton = false,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [id, duration, onClose]);

  const variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  };

  return (
    <AnimatePresence>
      <motion.div
        className={`${styles.toast} ${styles[type]}`}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={variants}
        transition={{ duration: 0.3 }}
      >
        <div className={styles.message}>{message}</div>
        {showCloseButton && (
          <button
            className={styles.closeButton}
            onClick={() => onClose(id)}
            aria-label="Close toast"
          >
            ×
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
