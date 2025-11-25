import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SidebarMenu from './SidebarMenu';

type SidebarProps = React.ComponentProps<typeof SidebarMenu>;

const meta: Meta<SidebarProps> = {
  title: 'Navigation/SidebarMenu',
  component: SidebarMenu,
  args: {
    items: [
      { id: '1', label: 'Home', onClick: () => {} },
      {
        id: '2',
        label: 'Settings',
        subItems: [
          { id: '2.1', label: 'Profile', onClick: () => {} },
          { id: '2.2', label: 'Billing', onClick: () => {} },
        ],
      },
    ],
    isOpen: false,
    onClose: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const SidebarWrapper: React.FC<SidebarProps> = (props) => {
  const [open, setOpen] = useState(props.isOpen);

  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      <button onClick={() => setOpen(true)} style={{ margin: 16 }}>
        Open Sidebar
      </button>
      <SidebarMenu {...props} isOpen={open} onClose={() => setOpen(false)} items={props.items} />
    </div>
  );
};

export const Level1: Story = {
  render: (args) => <SidebarWrapper {...args} />,
  args: {
    items: [
      { id: '1', label: 'Home', onClick: () => alert('Home clicked') },
      { id: '2', label: 'About', onClick: () => alert('About clicked') },
      {
        id: '3',
        label: 'Settings',
        subItems: [
          { id: '3.1', label: 'Profile', onClick: () => alert('Profile clicked') },
          { id: '3.2', label: 'Billing', onClick: () => alert('Billing clicked') },
        ],
      },
    ],
    isOpen: false,
  },
};

export const Level2: Story = {
  render: (args) => <SidebarWrapper {...args} />,
  args: {
    items: [
      { id: '1', label: 'Dashboard', onClick: () => alert('Dashboard') },
      {
        id: '2',
        label: 'Manage',
        subItems: [
          { id: '2.1', label: 'Users', onClick: () => alert('Users') },
          {
            id: '2.2',
            label: 'Projects',
            subItems: [
              { id: '2.2.1', label: 'Active', onClick: () => alert('Active') },
              { id: '2.2.2', label: 'Archived', onClick: () => alert('Archived') },
            ],
          },
        ],
      },
      { id: '3', label: 'Help', onClick: () => alert('Help') },
    ],
    isOpen: true,
  },
};
