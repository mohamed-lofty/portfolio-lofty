import s from './NetworkBackdrop.module.css';
import { cx } from '../lib/cx';

const LOOP = 'M60 80 L320 50 L420 240 L200 320 L40 260 Z';

const NODES = [
  { cx: 60, cy: 80, label: 'AUDIENCE', x: 60, y: 104, anchor: 'middle' as const },
  { cx: 320, cy: 50, label: 'CAMPAIGNS', x: 320, y: 32, anchor: 'middle' as const },
  { cx: 420, cy: 240, label: 'SYSTEMS', x: 432, y: 262, anchor: 'end' as const },
  { cx: 200, cy: 320, label: 'FEEDBACK', x: 200, y: 344, anchor: 'middle' as const },
  { cx: 40, cy: 260, label: 'GROWTH', x: 36, y: 284, anchor: 'start' as const },
];

/**
 * The system map behind the hero: audience → campaigns → systems →
 * feedback → growth, looping back. Nodes breathe slowly and a single
 * signal travels the loop. Purely decorative.
 */
export function NetworkBackdrop({ className }: { className?: string }) {
  return (
    <svg
      className={cx(s.network, className)}
      viewBox="0 0 460 360"
      fill="none"
      aria-hidden="true"
    >
      <path className={s.loop} d={LOOP} />
      {NODES.map((node, index) => (
        <g key={node.label} style={{ animationDelay: `${index * 900}ms` }}>
          <circle className={s.node} cx={node.cx} cy={node.cy} r="5" />
          <text
            className={s.label}
            x={node.x}
            y={node.y}
            textAnchor={node.anchor}
          >
            {node.label}
          </text>
        </g>
      ))}
      <circle className={s.traveler} r="3.5" />
    </svg>
  );
}
