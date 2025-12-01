'use client';

import React, { useEffect, useState } from 'react';
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

export const Toast = ({
  id,
  type = 'info',
  message,
  duration = 3000,
  onClose,
  showCloseButton = false,
}: ToastProps) => {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      const timeout2 = setTimeout(() => {
        onClose(id);
      }, 300);
      return () => clearTimeout(timeout2);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, id, onClose]);

  const handleCloseClick = () => {
    setExiting(true);
    setTimeout(() => {
      onClose(id);
    }, 300);
  };

  const variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  };

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key={id}
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
              onClick={handleCloseClick}
              aria-label="Close toast"
            >
              ×
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
