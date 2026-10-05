import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface CardProps extends HTMLMotionProps<'div'> {
  hoverEffect?: boolean;
  activeBorder?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverEffect = true, activeBorder = false, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={hoverEffect ? { y: -5, transition: { duration: 0.2 } } : undefined}
        className={cn(
          'bg-bg-card rounded-lg border border-border-subtle p-6 transition-colors duration-200 shadow-dark-card',
          hoverEffect && 'hover:border-crimson/70',
          activeBorder && 'border-crimson',
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';
