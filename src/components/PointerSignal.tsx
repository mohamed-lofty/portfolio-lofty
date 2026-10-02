import { useEffect, useRef } from 'react';
import s from './PointerSignal.module.css';

const LERP = 0.2;

/**
 * A tiny accent point that follows the pointer — a visible signal that the
 * system is responding. Decorative only: disabled for touch devices, coarse
 * pointers, and prefers-reduced-motion. The native cursor stays untouched.
 */
export function PointerSignal() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const dot = dotRef.current;
    if (!dot) return;

    let targetX = -40;
    let targetY = -40;
    let x = -40;
    let y = -40;
    let frame = 0;
    let running = false;

    const tick = () => {
      x += (targetX - x) * LERP;
      y += (targetY - y) * LERP;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      frame = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = window.requestAnimationFrame(tick);
    };

    const stop = () => {
      if (!running) return;
      running = false;
      window.cancelAnimationFrame(frame);
      dot.removeAttribute('data-on');
      dot.removeAttribute('data-hot');
    };

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!running) {
        x = targetX;
        y = targetY;
        dot.setAttribute('data-on', '1');
        start();
      }
    };

    const onOver = (event: PointerEvent) => {
      if (!running) return;
      const target = event.target;
      const hot = target instanceof Element && target.closest('a, button') !== null;
      dot.setAttribute('data-hot', hot ? '1' : '0');
    };

    const onLeave = () => stop();

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    window.addEventListener('blur', onLeave);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('blur', onLeave);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={dotRef} className={s.dot} aria-hidden="true" />;
}
