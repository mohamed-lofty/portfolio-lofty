import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

/**
 * Reveals an element the first time it enters the viewport.
 * Falls back to "always visible" when IntersectionObserver is unavailable,
 * and is rendered instantly under prefers-reduced-motion (via CSS).
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(delay = 0) {
  const ref = useRef<T | null>(null);
  // Without IntersectionObserver there is nothing to wait for — render visible.
  const [revealed, setRevealed] = useState(() => typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const revealProps = {
    ref,
    'data-reveal': revealed ? 'in' : 'out',
    style: { '--reveal-delay': `${delay}ms` } as CSSProperties,
  } as const;

  return { ref, revealed, revealProps };
}
