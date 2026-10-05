import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      children,
      icon,
      iconPosition = 'left',
      isLoading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed select-none';

    const variants = {
      primary: 'bg-crimson hover:bg-crimson-accent text-white shadow-crimson-sm hover:shadow-crimson-md border border-crimson',
      secondary: 'bg-bg-elevated hover:bg-bg-card text-text-primary border border-border-subtle hover:border-crimson/50',
      outline: 'bg-transparent text-text-primary hover:text-white border border-border-subtle hover:border-crimson hover:bg-crimson/10',
      ghost: 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-white/5',
      danger: 'bg-crimson-dark hover:bg-crimson text-white border border-crimson/50',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs gap-1.5',
      md: 'px-4 py-2 text-sm gap-2',
      lg: 'px-6 py-3 text-base gap-2.5 font-semibold',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={disabled || isLoading ? undefined : { scale: 1.02 }}
        whileTap={disabled || isLoading ? undefined : { scale: 0.98 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : (
          <>
            {icon && iconPosition === 'left' && <span className="inline-flex shrink-0">{icon}</span>}
            <span>{children}</span>
            {icon && iconPosition === 'right' && <span className="inline-flex shrink-0">{icon}</span>}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
