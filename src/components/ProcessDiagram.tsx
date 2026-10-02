import { useEffect, useState } from 'react';
import s from './ProcessDiagram.module.css';
import { processStages } from '../data/process';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { cx } from '../lib/cx';

const INTERVAL_MS = 2800;
/** the diagram activates as the last beat of the hero entrance */
const ACTIVATE_MS = 360;

export function ProcessDiagram() {
  const [active, setActive] = useState(0);
  const [started, setStarted] = useState(() => !prefersReducedSnapshot());
  const [paused, setPaused] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  // entrance: no stage is active until the diagram has settled
  useEffect(() => {
    if (started) return;
    const timer = window.setTimeout(() => setStarted(true), ACTIVATE_MS);
    return () => window.clearTimeout(timer);
  }, [started]);

  // the loop: PLAN → BUILD → RUN → LEARN → PLAN
  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % processStages.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion]);

  const focusStage = (index: number) => {
    setPaused(true);
    setSelected(index);
    setActive(index);
  };

  const releaseStage = () => {
    setPaused(false);
    setSelected(null);
  };

  return (
    <div
      className={s.diagram}
      onMouseLeave={releaseStage}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className={s.head}>
        <span>PROCESS</span>
        <span>
          {processStages[active].index} — {processStages[processStages.length - 1].index}
        </span>
      </div>

      <ol className={s.stages}>
        {processStages.map((stage, index) => {
          const isActive = started && index === active;
          const isDimmed = selected !== null && index !== selected;
          return (
            <li
              key={stage.label}
              className={cx(s.stage, isActive && s.stageActive, isDimmed && s.stageDimmed)}
              onMouseEnter={() => focusStage(index)}
            >
              <span className={s.line} aria-hidden="true" />
              <span className={s.index}>{stage.index}</span>
              <span className={s.label}>{stage.label}</span>
              <span className={s.output}>
                <span aria-hidden="true">→ </span>
                {stage.output}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/**
 * Initial reduced-motion preference, read synchronously during the first
 * render so the entrance gate can open immediately when motion is reduced.
 */
function prefersReducedSnapshot(): boolean {
  return (
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );
}
