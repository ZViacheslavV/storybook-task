'use client';

import React, { useState, ChangeEvent, FC } from 'react';
import styles from './Input.module.css';

type InputType = 'text' | 'password' | 'number';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: InputType;
  clearable?: boolean;
}

const Input: FC<InputProps> = ({
  type = 'text',
  clearable = false,
  value: propValue,
  onChange,
  ...rest
}) => {
  const safeValue = (propValue as string | number) ?? '';

  const [showPassword, setShowPassword] = useState(false);
  const [internalValue, setInternalValue] = useState<string | number>(safeValue);

  const isControlled = propValue !== undefined;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!isControlled) {
      setInternalValue(val);
    }
    if (onChange) onChange(e);
  };

  const handleClear = () => {
    if (!isControlled) {
      setInternalValue('');
    }

    const event = {
      target: { value: '' },
    } /* as unknown */ as ChangeEvent<HTMLInputElement>;
    if (onChange) onChange(event);
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const currentType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

  const displayValue = isControlled ? propValue : internalValue;

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        type={currentType}
        value={displayValue}
        onChange={handleChange}
        {...rest}
      />
      {type === 'password' && (
        <button
          type="button"
          className={styles.toggleButton}
          onClick={toggleShowPassword}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? '🙈' : '👁️'}
        </button>
      )}
      {clearable && displayValue && (
        <button
          type="button"
          className={styles.clearButton}
          onClick={handleClear}
          aria-label="Clear input"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Input;
