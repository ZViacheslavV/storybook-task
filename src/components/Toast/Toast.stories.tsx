import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toast, ToastType } from './Toast';

interface ToastDemoProps {
  type: ToastType;
  message: string;
  duration: number;
  showCloseButton: boolean;
}

const ToastDemo: React.FC<ToastDemoProps> = ({ type, message, duration, showCloseButton }) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button onClick={() => setOpen(true)}>Show Toast</button>
      {open && (
        <Toast
          id="storybook-toast"
          type={type}
          message={message}
          duration={duration}
          onClose={handleClose}
          showCloseButton={showCloseButton}
        />
      )}
    </>
  );
};

const meta: Meta<typeof ToastDemo> = {
  title: 'Feedback/Toast',
  component: ToastDemo,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['success', 'error', 'info', 'warning'],
      },
    },
    message: { control: 'text' },
    duration: { control: 'number' },
    showCloseButton: { control: 'boolean' },
  },
  args: {
    type: 'info',
    message: 'This is a toast message',
    duration: 3000,
    showCloseButton: true,
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'info',
    message: 'Hello, Storybook!',
    duration: 3000,
    showCloseButton: true,
  },
};

export const Success: Story = {
  args: {
    type: 'success',
    message: 'Operation was successful!',
    duration: 3000,
    showCloseButton: true,
  },
};

export const Error: Story = {
  args: {
    type: 'error',
    message: 'Something went wrong.',
    duration: 5000,
    showCloseButton: true,
  },
};

export const WarningNoClose: Story = {
  args: {
    type: 'warning',
    message: 'This is a warning without close button.',
    duration: 4000,
    showCloseButton: false,
  },
};
