import React from 'react';
import { motion } from 'motion/react';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  onClick,
  type = 'button',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-midnight active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none';

  const variants = {
    primary: 'bg-teal text-midnight hover:bg-[#11A393] focus:ring-teal shadow-lg shadow-teal/20 font-semibold',
    secondary: 'bg-midnight-card hover:bg-[#1E2E4A] text-warm-white border border-midnight-border hover:border-teal/50 focus:ring-teal',
    outline: 'border border-warm-white/20 hover:border-warm-white text-warm-white bg-transparent hover:bg-warm-white/5 focus:ring-warm-white/50',
    ghost: 'text-warm-white hover:text-teal hover:bg-warm-white/5 focus:ring-teal',
    gold: 'bg-gold text-midnight hover:bg-[#DDA938] focus:ring-gold shadow-lg shadow-gold/20 font-semibold',
    danger: 'bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 focus:ring-rose-500'
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-7 py-3.5 gap-2.5',
    icon: 'p-2.5 rounded-full'
  };

  return (
    <motion.button
      type={type}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </motion.button>
  );
}
