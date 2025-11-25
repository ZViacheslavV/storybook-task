'use client';

import React, { useEffect, useState } from 'react';
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
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      const timeout2 = setTimeout(() => {
        onClose(id);
      }, 300);
      return () => clearTimeout(timeout2);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, id, onClose]);

  const handleCloseClick = () => {
    setExiting(true);
    setTimeout(() => {
      onClose(id);
    }, 300);
  };

  return (
    <div className={`${styles.toast} ${styles[type]} ${exiting ? styles['toast--exiting'] : ''}`}>
      <div className={styles.message}>{message}</div>
      {showCloseButton && (
        <button className={styles.closeButton} onClick={handleCloseClick} aria-label="Close toast">
          ×
        </button>
      )}
    </div>
  );
};
