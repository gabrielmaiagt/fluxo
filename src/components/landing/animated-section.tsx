
"use client";

import { type ReactNode, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type AnimationType = 'fade-up' | 'zoom-in';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: AnimationType;
  delay?: number;
}

export function AnimatedSection({ children, className, animation = 'fade-up', delay = 0 }: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  const animationClasses: Record<AnimationType, string> = {
    'fade-up': 'opacity-0 translate-y-8',
    'zoom-in': 'opacity-0 scale-95',
  };

  const visibleClasses: Record<AnimationType, string> = {
    'fade-up': 'opacity-100 translate-y-0',
    'zoom-in': 'opacity-100 scale-100',
  };

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-600 ease-out',
        isVisible ? visibleClasses[animation] : animationClasses[animation],
        className
      )}
    >
      {children}
    </div>
  );
}
