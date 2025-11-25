// import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';
// import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Inputs/Input',
  component: Input,
  argTypes: {
    type: {
      control: { type: 'select', options: ['text', 'password', 'number'] },
    },
    clearable: { control: 'boolean' },
  },
  args: {
    type: 'text',
    clearable: false,
    placeholder: 'Enter text…',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...meta.args,
  },
};

export const Clearable: Story = {
  args: {
    ...meta.args,
    clearable: true,
    placeholder: 'Clear me!',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    clearable: false,
    placeholder: 'Enter password',
  },
};

export const PasswordClearable: Story = {
  args: {
    type: 'password',
    clearable: true,
    placeholder: 'Password (clearable)',
  },
};

export const Number: Story = {
  args: {
    type: 'number',
    clearable: false,
    placeholder: 'Enter number',
  },
};
