import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'crimson' | 'muted' | 'outline' | 'success';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'muted',
  size = 'sm',
  children,
  ...props
}) => {
  const variants = {
    crimson: 'bg-crimson/15 text-crimson-accent border-crimson/30',
    muted: 'bg-white/5 text-text-secondary border-border-subtle',
    outline: 'bg-transparent text-text-secondary border-border-subtle hover:border-crimson/40',
    success: 'bg-emerald-950/40 text-emerald-400 border-emerald-800/40',
  };

  const sizes = {
    sm: 'text-xs px-2.5 py-0.5 font-medium',
    md: 'text-sm px-3 py-1 font-medium',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border transition-colors select-none font-mono',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
