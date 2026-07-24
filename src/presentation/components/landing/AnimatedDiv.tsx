'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

interface AnimatedDivProps {
  children: ReactNode;
  className?: string;
  initial?: Record<string, number>;
  animate?: Record<string, number>;
  transition?: Record<string, number>;
  whileHover?: Record<string, number> | undefined;
}

export function AnimatedDiv({ children, className, initial, animate, transition, whileHover }: AnimatedDivProps) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduce ? false : initial}
      animate={shouldReduce ? false : animate}
      transition={transition}
      whileHover={shouldReduce ? undefined : whileHover}
      className={className}
    >
      {children}
    </motion.div>
  );
}
