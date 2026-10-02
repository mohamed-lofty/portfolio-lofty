import s from './LoopDiagram.module.css';

/**
 * LEARN → PLAN → START AGAIN — the closing loop of the contact page.
 * A signal crosses the plan line, returns along the arc, and each node
 * acknowledges it in turn. Purely decorative; stops under reduced motion.
 */
export function LoopDiagram() {
  return (
    <svg className={s.diagram} viewBox="0 0 440 176" fill="none" aria-hidden="true">
      <path className={s.line} d="M66 56h320" />
      <path className={s.arrow} d="M127 50l8 6-8 6M293 50l8 6-8 6" strokeLinecap="round" strokeLinejoin="round" />

      <path className={s.arc} d="M392 78c0 52-58 64-172 64S48 130 48 86" />
      <path className={s.arrow} d="M42 82l6-11 6 11" strokeLinecap="round" strokeLinejoin="round" />

      <circle className={s.node} cx="60" cy="56" r="6" />
      <circle className={s.node} cx="210" cy="56" r="6" />
      <circle className={s.nodeAccent} cx="392" cy="56" r="6" />

      <circle className={s.ring} cx="60" cy="56" r="6" style={{ animationDelay: '4.8s' }} />
      <circle className={s.ring} cx="210" cy="56" r="6" style={{ animationDelay: '1.2s' }} />
      <circle className={s.ring} cx="392" cy="56" r="6" style={{ animationDelay: '2.4s' }} />

      <circle className={s.travelLine} r="3.5" />
      <circle className={s.travelArc} r="3.5" />

      <text className={s.label} x="60" y="32" textAnchor="middle">
        LEARN
      </text>
      <text className={s.label} x="210" y="32" textAnchor="middle">
        PLAN
      </text>
      <text className={s.label} x="378" y="32" textAnchor="middle">
        START AGAIN
      </text>
      <text className={s.sub} x="220" y="170" textAnchor="middle">
        REPORTING LOOP → AUDIENCE MAP
      </text>
    </svg>
  );
}
