import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Routes, useLocation } from 'react-router-dom';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const EXIT_MS = 170;

/**
 * Route transitions.
 *
 * Current page exits (fast fade/slide) → a thin signal line sweeps the top of
 * the viewport → the new page enters. Total ≈ 450ms. Under reduced motion the
 * swap is instant. Also handles scroll-to-top and focus management so every
 * page navigation lands at the top and announces the new page.
 */
export function RouteTransition({ children }: { children: ReactNode }) {
  const location = useLocation();
  const reducedMotion = usePrefersReducedMotion();
  const [displayed, setDisplayed] = useState(location);
  const [signal, setSignal] = useState(0);
  const firstRender = useRef(true);
  const previousPath = useRef(location.pathname);

  // Same-page navigation (in-page anchors): swap silently during render.
  if (location.key !== displayed.key && location.pathname === displayed.pathname) {
    setDisplayed(location);
  }

  const crossPath = location.key !== displayed.key && location.pathname !== displayed.pathname;

  useEffect(() => {
    if (!crossPath) return;

    const swap = window.setTimeout(
      () => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        setDisplayed(location);
      },
      reducedMotion ? 0 : EXIT_MS,
    );

    if (reducedMotion) return () => window.clearTimeout(swap);

    const showSignal = window.setTimeout(() => setSignal((id) => id + 1), 0);
    return () => {
      window.clearTimeout(swap);
      window.clearTimeout(showSignal);
    };
  }, [crossPath, location, reducedMotion]);

  // Keep the signal line visible for its full sweep, even after the swap.
  useEffect(() => {
    if (signal === 0) return;
    const hide = window.setTimeout(() => setSignal(0), 720);
    return () => window.clearTimeout(hide);
  }, [signal]);

  // Announce the new page to assistive tech and move focus to the top.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      previousPath.current = displayed.pathname;
      return;
    }
    if (previousPath.current === displayed.pathname) return;
    previousPath.current = displayed.pathname;
    const main = document.getElementById('main');
    main?.focus({ preventScroll: true });
  }, [displayed]);

  return (
    <div className="route-frame" data-phase={crossPath ? 'exit' : 'enter'}>
      {signal > 0 ? (
        <span key={signal} className="route-signal" aria-hidden="true" />
      ) : null}
      <div key={displayed.key} className="route-view">
        <Routes location={displayed}>{children}</Routes>
      </div>
    </div>
  );
}
