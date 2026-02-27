import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from './cn';

const buttonVariants = cva('inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition', {
  variants: {
    variant: {
      primary: 'bg-gradient-to-r from-nexus-eco to-nexus-glow text-nexus-midnight shadow-neon',
      ghost: 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
    }
  },
  defaultVariants: { variant: 'primary' }
});

export const Button = ({ asChild = false, className, variant, ...props }) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ variant }), className)} {...props} />;
};
