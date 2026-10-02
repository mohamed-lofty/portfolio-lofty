import s from './SystemCard.module.css';
import { useReveal } from '../hooks/useReveal';
import type { SchematicKind, SystemItem } from '../types';

interface SystemCardProps {
  item: SystemItem;
  /** preview = compact (home), full = expanded blocks (systems page) */
  variant?: 'preview' | 'full';
  delay?: number;
}

/* Each system gets its own tiny visual behaviour:
   dashboard → bars grow, a signal travels on hover
   document  → lines draw themselves, the arrow nudges on hover
   app       → rows draw, the accent dot pulses on hover               */
function Schematic({ kind }: { kind: SchematicKind }) {
  if (kind === 'dashboard') {
    return (
      <svg className={s.schematic} viewBox="0 0 84 46" fill="none" aria-hidden="true">
        <path className={s.stroke} d="M2 44h80" />
        <path className={s.strokeSoft} d="M2 10h80" strokeDasharray="3 4" />
        <circle className={s.signal} cx="2" cy="10" r="2.4" fill="currentColor" />
        <rect className={`${s.stroke} ${s.barGrow}`} x="8" y="30" width="12" height="14" style={{ animationDelay: '0ms' }} />
        <rect className={`${s.stroke} ${s.barGrow}`} x="26" y="22" width="12" height="22" style={{ animationDelay: '90ms' }} />
        <rect className={`${s.strokeAccent} ${s.barGrow}`} x="44" y="14" width="12" height="30" style={{ animationDelay: '180ms' }} />
        <rect className={`${s.stroke} ${s.barGrow}`} x="62" y="26" width="12" height="18" style={{ animationDelay: '270ms' }} />
      </svg>
    );
  }

  if (kind === 'document') {
    return (
      <svg className={s.schematic} viewBox="0 0 84 46" fill="none" aria-hidden="true">
        <rect className={s.stroke} x="6" y="3" width="34" height="40" rx="2" />
        <path className={`${s.strokeSoft} ${s.draw}`} pathLength={1} d="M13 14h20" style={{ animationDelay: '80ms' }} />
        <path className={`${s.strokeSoft} ${s.draw}`} pathLength={1} d="M13 21h20" style={{ animationDelay: '200ms' }} />
        <path className={`${s.strokeSoft} ${s.draw}`} pathLength={1} d="M13 28h13" style={{ animationDelay: '320ms' }} />
        <path
          className={`${s.strokeAccent} ${s.arrowPath}`}
          d="M48 23h24m-6-6 6 6-6 6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg className={s.schematic} viewBox="0 0 84 46" fill="none" aria-hidden="true">
      <rect className={s.stroke} x="3" y="5" width="78" height="36" rx="3" />
      <path className={s.stroke} d="M3 15h78" />
      <circle className={s.strokeAccentDot} cx="11" cy="10" r="2" />
      <circle className={s.stroke} cx="19" cy="10" r="2" />
      <circle className={s.stroke} cx="27" cy="10" r="2" />
      <path className={`${s.strokeSoft} ${s.draw}`} pathLength={1} d="M11 24h24" style={{ animationDelay: '80ms' }} />
      <path className={`${s.strokeSoft} ${s.draw}`} pathLength={1} d="M11 32h34" style={{ animationDelay: '220ms' }} />
      <path className={s.stroke} d="M56 20v21M56 24h22" />
      <path className={`${s.strokeSoft} ${s.draw}`} pathLength={1} d="M11 38h40" style={{ animationDelay: '360ms' }} />
      <path className={`${s.strokeAccent} ${s.progress}`} pathLength={1} d="M11 38h40" />
    </svg>
  );
}

export function SystemCard({ item, variant = 'preview', delay = 0 }: SystemCardProps) {
  const { revealProps } = useReveal<HTMLDivElement>(delay);
  const expanded = variant === 'full';

  const hasProblem = Boolean(item.problem);
  const hasFlow = item.flow.length > 0;
  const hasTools = Boolean(item.tools && item.tools.length > 0);
  const hasStatus = Boolean(item.status);
  /* detail blocks only render when the data exists — nothing invented, nothing empty */
  const hasDetails = expanded && (hasProblem || hasFlow || hasTools || hasStatus);

  return (
    <div {...revealProps} className={s.wrap}>
      <article className={s.card} aria-labelledby={`${item.id}-title`}>
      <div className={s.top}>
        <span className={s.tag}>{item.tag}</span>
        <span className={s.index}>{item.index}</span>
      </div>

      <Schematic kind={item.schematic} />

      <div>
        <h3 className={s.title} id={`${item.id}-title`}>
          {item.title}
        </h3>
        <p className={s.description}>{item.description}</p>
      </div>

      {hasDetails ? (
        <div className={s.details}>
          {hasProblem ? (
            <div className={s.detail}>
              <p className={s.detailLabel}>PROBLEM IT SOLVES</p>
              <p className={s.detailText}>{item.problem}</p>
            </div>
          ) : null}

          {hasFlow ? (
            <div className={s.detail}>
              <p className={s.detailLabel}>SYSTEM FLOW</p>
              <ol className={s.flow}>
                {item.flow.map((step) => (
                  <li key={step} className={s.flowStep}>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          ) : null}

          {hasTools || hasStatus ? (
            <div className={s.detailRow}>
              <div className={s.detail}>
                <p className={s.detailLabel}>TOOLS</p>
                {hasTools ? (
                  <ul className={s.chips}>
                    {item.tools?.map((tool) => (
                      <li key={tool} className={s.chip}>
                        {tool}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className={s.placeholderInline}>Not recorded yet — editable in data.</p>
                )}
              </div>

              <div className={s.detail}>
                <p className={s.detailLabel}>STATUS</p>
                {item.status ? (
                  <p className={s.statusText}>{item.status}</p>
                ) : (
                  <p className={s.placeholderInline}>Not recorded yet — editable in data.</p>
                )}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
      </article>
    </div>
  );
}
