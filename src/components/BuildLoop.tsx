import s from './BuildLoop.module.css';
import { buildStages, loopQuote } from '../data/buildLogic';
import { useReveal } from '../hooks/useReveal';

const NODE_X = 44;
const NODE_R = 8;
const FIRST_Y = 44;
const STEP_Y = 58;
const LAST_Y = FIRST_Y + 5 * STEP_Y;
const SPINE = `M${NODE_X} ${FIRST_Y} V${LAST_Y}`;
const RETURN_PATH = `M${NODE_X} ${LAST_Y + 10} V372 H16 V${FIRST_Y} H31`;

const nodeY = (index: number) => FIRST_Y + index * STEP_Y;

/**
 * THE LOOP — the closing diagram: understand → frame → structure → build →
 * test → learn, and the signal that carries learn back to understand.
 * Decorative; the meaning is carried by the accessible label.
 */
export function BuildLoop() {
  const { revealProps } = useReveal<HTMLDivElement>();

  return (
    <div className={s.wrap} {...revealProps}>
      <div className={s.text}>
        <p className={s.label}>THE LOOP</p>
        <span className={s.rule} aria-hidden="true" />
        <blockquote className={s.quote}>
          <p>“{loopQuote}”</p>
        </blockquote>
        <p className={s.return}>LEARN → UNDERSTAND</p>
      </div>

      <svg
        className={s.diagram}
        viewBox="0 0 340 400"
        fill="none"
        role="img"
        aria-label="The loop: understand, frame, structure, build, test, learn — and back to understand."
      >
        <path className={s.spine} d={SPINE} />

        {[0, 1, 2, 3, 4].map((index) => {
          const mid = FIRST_Y + index * STEP_Y + STEP_Y / 2;
          return (
            <path
              key={mid}
              className={s.chevron}
              d={`M${NODE_X - 4} ${mid - 4} L${NODE_X} ${mid} L${NODE_X + 4} ${mid - 4}`}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          );
        })}

        <path
          className={s.returnPath}
          d={RETURN_PATH}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className={s.arrow}
          d="M28 39.5 L35 44 L28 48.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {buildStages.map((stage, index) => {
          const y = nodeY(index);
          return (
            <g key={stage.index}>
              <circle className={s.ring} cx={NODE_X} cy={y} r={NODE_R} style={{ animationDelay: `${index * 600}ms` }} />
              <circle className={s.node} cx={NODE_X} cy={y} r={NODE_R} />
              <text className={s.num} x="64" y={y + 3.5}>
                {stage.index}
              </text>
              <text className={s.labelText} x="88" y={y + 4}>
                {stage.label}
              </text>
            </g>
          );
        })}

        <circle
          className={s.travelSpine}
          r="3.5"
          style={{ offsetPath: `path('${SPINE}')` }}
        />
        <circle
          className={s.travelReturn}
          r="3.5"
          style={{ offsetPath: `path('${RETURN_PATH}')` }}
        />
      </svg>
    </div>
  );
}
