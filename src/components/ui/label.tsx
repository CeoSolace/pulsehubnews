// src/components/ui/label.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export function Label({ className, children, ...props }: LabelProps) {
  return (
    <label
      className={cn('block text-sm font-medium mb-1.5', className)}
      {...props}
    >
      {children}
    </label>
  );
}
