'use client';

import React, { useState, useEffect, FC } from 'react';
import styles from './SidebarMenu.module.css';
import { MenuItem } from '@/types/menu';

interface SidebarMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: MenuItem[];
}

const SidebarMenu: FC<SidebarMenuProps> = ({ isOpen, onClose, items }) => {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!isOpen) {
      const timeout = setTimeout(() => {
        setOpenIds(new Set());
      }, 0);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  const toggleItem = (item: MenuItem) => {
    const newSet = new Set(openIds);
    if (openIds.has(item.id)) {
      newSet.delete(item.id);
    } else {
      newSet.add(item.id);
    }
    setOpenIds(newSet);
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      {isOpen && <div className={styles.backdrop} onClick={onClose} />}
      <div
        className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}
        onClick={stopPropagation}
      >
        <ul className={styles.menuList}>
          {items.map((item) => (
            <li key={item.id} className={styles.menuItem}>
              <div className={styles.menuLabel} onClick={() => toggleItem(item)}>
                {item.label}
                {item.subItems && (
                  <span className={styles.chevron}>{openIds.has(item.id) ? '▾' : '▸'}</span>
                )}
              </div>
              {item.subItems && openIds.has(item.id) && (
                <ul className={styles.subMenu}>
                  {item.subItems.map((sub) => (
                    <li key={sub.id} className={styles.subMenuItem}>
                      <div
                        className={styles.menuLabel}
                        onClick={() => {
                          sub.onClick?.();

                          onClose();
                        }}
                      >
                        {sub.label}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SidebarMenu;
