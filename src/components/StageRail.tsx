import { useEffect, useState } from 'react';
import s from './StageRail.module.css';
import { cx } from '../lib/cx';

interface StageRailProps {
  stages: { id: string; label: string }[];
}

/**
 * Vertical case-study progress indicator.
 * Highlights the stage currently being read and fills the rail as you scroll.
 */
export function StageRail({ stages }: StageRailProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const marker = window.scrollY + window.innerHeight * 0.34;
      let current = 0;

      stages.forEach((stage, index) => {
        const element = document.getElementById(`stage-${stage.id}`);
        if (!element) return;
        const top = element.getBoundingClientRect().top + window.scrollY;
        if (top <= marker) current = index;
      });

      setActiveIndex((previous) => (previous === current ? previous : current));
    };

    const onScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame !== 0) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [stages]);

  const progress = stages.length > 1 ? activeIndex / (stages.length - 1) : 1;

  return (
    <nav className={s.rail} aria-label="Case study stages">
      <span className={s.track} aria-hidden="true">
        <span className={s.fill} style={{ transform: `scaleY(${progress})` }} />
      </span>

      <ol className={s.list}>
        {stages.map((stage, index) => {
          const isActive = index === activeIndex;
          const isPassed = index <= activeIndex;
          return (
            <li key={stage.id} className={cx(s.item, isPassed && s.passed, isActive && s.itemActive)}>
              <span className={s.dot} aria-hidden="true" />
              <a
                className={cx(s.label, isActive && s.labelActive)}
                href={`#stage-${stage.id}`}
                aria-current={isActive ? 'step' : undefined}
              >
                {stage.label}
              </a>
              {index < stages.length - 1 ? (
                <span className={s.arrow} aria-hidden="true">
                  ↓
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
