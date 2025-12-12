// src/components/ui/button.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outline';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

export function Button({
  children,
  className = '',
  variant = 'default',
  onClick,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:opacity-50',
        variant === 'default'
          ? 'bg-blue text-white hover:bg-blue/90 px-4 py-2'
          : 'border border-gray text-gray hover:bg-gray/10 px-4 py-2',
        className
      )}
    >
      {children}
    </button>
  );
}
