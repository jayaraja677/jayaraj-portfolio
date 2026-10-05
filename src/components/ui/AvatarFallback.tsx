import React, { useState } from 'react';
import { getInitials } from '../../lib/utils';

export interface AvatarFallbackProps {
  src?: string;
  alt: string;
  name: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const AvatarFallback: React.FC<AvatarFallbackProps> = ({
  src,
  alt,
  name,
  className = '',
  size = 'md',
}) => {
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    sm: 'w-10 h-10 text-xs',
    md: 'w-16 h-16 text-base',
    lg: 'w-32 h-32 md:w-40 md:h-40 text-2xl',
    xl: 'w-48 h-48 md:w-56 md:h-56 text-3xl',
  };

  const showFallback = !src || hasError;

  return (
    <div
      className={`relative inline-block rounded-2xl overflow-hidden bg-bg-card border-2 border-border-subtle group-hover:border-crimson transition-all duration-300 shadow-dark-card shrink-0 ${sizeClasses[size]} ${className}`}
    >
      {!showFallback ? (
        <img
          src={src}
          alt={alt}
          onError={() => setHasError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-bg-card to-bg-secondary p-2 select-none">
          <div className="w-full h-full flex items-center justify-center rounded-xl bg-crimson/10 border border-crimson/20">
            <span className="font-mono font-bold tracking-wider text-crimson-accent">
              {getInitials(name)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
