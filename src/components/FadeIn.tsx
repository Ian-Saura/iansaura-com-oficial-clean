import React, { useRef, useEffect, useState, CSSProperties } from 'react';

/**
 * Lightweight replacement for framer-motion's scroll-triggered animations.
 * Uses Intersection Observer + CSS transitions instead of a 130KB library.
 */

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Direction to animate from: 'up', 'down', 'left', 'right', or 'none' */
  from?: 'up' | 'down' | 'left' | 'right' | 'none';
  /** Distance in pixels to animate from */
  distance?: number;
  /** Delay in milliseconds */
  delay?: number;
  /** Duration in milliseconds */
  duration?: number;
  /** Only animate once when entering viewport */
  once?: boolean;
  /** Intersection Observer threshold (0-1) */
  threshold?: number;
}

export default function FadeIn({
  children,
  className = '',
  style,
  from = 'up',
  distance = 30,
  delay = 0,
  duration = 600,
  once = true,
  threshold = 0.1,
}: FadeInProps & { key?: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, threshold]);

  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0)';
    switch (from) {
      case 'up': return `translate3d(0, ${distance}px, 0)`;
      case 'down': return `translate3d(0, -${distance}px, 0)`;
      case 'left': return `translate3d(-${distance}px, 0, 0)`;
      case 'right': return `translate3d(${distance}px, 0, 0)`;
      case 'none': return 'translate3d(0, 0, 0)';
    }
  };

  const animStyle: CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: getTransform(),
    transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
    willChange: 'opacity, transform',
    ...style,
  };

  return (
    <div
      ref={ref}
      className={className}
      style={animStyle}
    >
      {children}
    </div>
  );
}

/** Simplified fade-in for inline elements */
export function FadeInSpan({
  children,
  className = '',
  delay = 0,
  duration = 400,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}) {
  return (
    <FadeIn
      from="up"
      distance={15}
      delay={delay}
      duration={duration}
      className={className}
      style={{ display: 'inline-block' }}
    >
      {children}
    </FadeIn>
  );
}
