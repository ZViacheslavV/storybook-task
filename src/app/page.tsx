'use client';

import Input from '@/components/Input/Input';
import css from './Home.module.css';
import SidebarMenu from '@/components/SidebarMenu/SidebarMenu';
import { Toast } from '@/components/Toast/Toast';
import { MenuItem } from '@/types/menu';
import { useState } from 'react';

const Home = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const menuItems: MenuItem[] = [
    { id: '1', label: 'Home', onClick: () => console.log('Home clicked') },
    {
      id: '2',
      label: 'Settings',
      subItems: [
        { id: '2.1', label: 'Profile', onClick: () => console.log('Profile clicked') },
        { id: '2.2', label: 'Billing', onClick: () => console.log('Billing clicked') },
      ],
    },
  ];

  return (
    <main>
      <div className={css.container}>
        <button className={css.btnSidebar} onClick={() => setSidebarOpen(true)}>
          Open Sidebar
        </button>

        <SidebarMenu
          isOpen={isSidebarOpen}
          onClose={() => setSidebarOpen(false)}
          items={menuItems}
        />
        <Input value={'Test text'} type="password" />
        <Toast
          id="test"
          type="info"
          message="Hello from Toast"
          duration={3000}
          onClose={(id) => console.log('Close toast:', id)}
          showCloseButton={true}
        />
      </div>
    </main>
  );
};

export default Home;
