import { useEffect } from 'react';

/**
 * Locks body scroll when a modal/overlay is open.
 * Prevents background content from scrolling on mobile.
 * Automatically restores scroll when the component unmounts or isLocked becomes false.
 */
export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return;

    // Save current scroll position and body style
    const scrollY = window.scrollY;
    const originalStyle = document.body.style.cssText;

    // Lock body scroll
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.overflow = 'hidden';

    return () => {
      // Restore body scroll
      document.body.style.cssText = originalStyle;
      window.scrollTo(0, scrollY);
    };
  }, [isLocked]);
}
