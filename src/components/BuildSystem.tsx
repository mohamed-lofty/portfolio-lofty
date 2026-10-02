import { Fragment } from 'react';
import type { CSSProperties, KeyboardEvent } from 'react';
import s from './BuildSystem.module.css';
import { buildStages } from '../data/buildLogic';
import { useReveal } from '../hooks/useReveal';
import { cx } from '../lib/cx';

const PANEL_ID = 'stage-panel';
const TOTAL = buildStages.length;
const TOTAL_LABEL = String(TOTAL).padStart(2, '0');

/* circuit geometry — top row 01 · 02 · 03, bottom row 06 · 05 · 04,
   the return path climbs the left side from LEARN back to UNDERSTAND */
const ROW_TOP = '26%';
const ROW_BOTTOM = '74%';

interface SegmentSpec {
  key: number;
  axis: 'h' | 'v';
  origin: string;
  style: CSSProperties;
}

const SEGMENTS: SegmentSpec[] = [
  {
    key: 1,
    axis: 'h',
    origin: 'left center',
    style: { left: '16.6%', top: ROW_TOP, width: '33.4%', height: '1px' },
  },
  {
    key: 2,
    axis: 'h',
    origin: 'left center',
    style: { left: '50%', top: ROW_TOP, width: '33.3%', height: '1px' },
  },
  {
    key: 3,
    axis: 'v',
    origin: 'center top',
    style: {
      left: '83.3%',
      top: ROW_TOP,
      width: '1px',
      height: `calc(${ROW_BOTTOM} - ${ROW_TOP})`,
    },
  },
  {
    key: 4,
    axis: 'h',
    origin: 'right center',
    style: { left: '50%', top: ROW_BOTTOM, width: '33.3%', height: '1px' },
  },
  {
    key: 5,
    axis: 'h',
    origin: 'right center',
    style: { left: '16.6%', top: ROW_BOTTOM, width: '33.4%', height: '1px' },
  },
];

const NODES = [
  { x: '16.6%', y: ROW_TOP, labelAbove: true },
  { x: '50%', y: ROW_TOP, labelAbove: true },
  { x: '83.3%', y: ROW_TOP, labelAbove: true },
  { x: '83.3%', y: ROW_BOTTOM, labelAbove: false },
  { x: '50%', y: ROW_BOTTOM, labelAbove: false },
  { x: '16.6%', y: ROW_BOTTOM, labelAbove: false },
];

interface NodeButtonProps {
  stageIndex: number;
  active: boolean;
  variant: 'map' | 'rail';
  onSelect: (index: number) => void;
}

function NodeButton({ stageIndex, active, variant, onSelect }: NodeButtonProps) {
  const stage = buildStages[stageIndex];

  return (
    <button
      type="button"
      className={cx(s.nodeBtn, active && s.nodeBtnActive, variant === 'rail' && s.nodeBtnRail)}
      aria-pressed={active}
      aria-controls={PANEL_ID}
      onClick={() => onSelect(stageIndex)}
    >
      <span className={s.dot}>{stage.index}</span>
      <span className={s.nodeLabel}>{stage.label}</span>
    </button>
  );
}

interface BuildSystemProps {
  active: number;
  onChange: (index: number) => void;
}

/**
 * The build logic as an explorable system: a circuit map (desktop), a stage
 * rail (mobile) and a detail panel. Arrow keys move between stages.
 */
export function BuildSystem({ active, onChange }: BuildSystemProps) {
  const { revealProps } = useReveal<HTMLDivElement>();
  const stage = buildStages[active];

  const handleListKeyDown = (event: KeyboardEvent<HTMLOListElement>) => {
    let next: number;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (active + 1) % TOTAL;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (active - 1 + TOTAL) % TOTAL;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = TOTAL - 1;
    else return;

    event.preventDefault();
    onChange(next);
    const buttons = event.currentTarget.querySelectorAll('button');
    buttons[next]?.focus();
  };

  return (
    <div className={s.console} id="build-system" {...revealProps}>
      <div className={s.head}>
        <span>BUILD LOGIC</span>
        <span className={s.headState}>
          <span className={s.liveDot} aria-hidden="true" />
          NODE {stage.index} / {TOTAL_LABEL}
        </span>
      </div>

      <div className={s.body}>
        <div className={s.mapWrap}>
          <div className={s.map}>
            <span className={cx(s.crop, s.cropTop)} aria-hidden="true" />
            <span className={cx(s.crop, s.cropBottom)} aria-hidden="true" />

            {SEGMENTS.map((segment) => {
              const lit = active >= segment.key;
              /* the path draws forward to the active stage and retracts in reverse */
              const delay = lit
                ? segment.key * 70
                : (SEGMENTS.length - segment.key) * 70;

              return (
                <Fragment key={segment.key}>
                  <span
                    className={cx(s.track, segment.axis === 'v' && s.vertical)}
                    style={segment.style}
                    aria-hidden="true"
                  />
                  <span
                    className={cx(
                      s.signal,
                      segment.axis === 'v' && s.vertical,
                      lit && s.lit,
                    )}
                    style={{
                      ...segment.style,
                      transformOrigin: segment.origin,
                      transitionDelay: `${delay}ms`,
                    }}
                    aria-hidden="true"
                  />
                </Fragment>
              );
            })}

            <span
              className={s.return}
              style={{
                left: '16.6%',
                top: ROW_TOP,
                height: `calc(${ROW_BOTTOM} - ${ROW_TOP})`,
              }}
              aria-hidden="true"
            >
              <span className={s.returnArrow} />
            </span>

            <ol className={s.mapNodes} onKeyDown={handleListKeyDown}>
              {NODES.map((node, index) => (
                <li
                  key={buildStages[index].index}
                  className={cx(s.node, node.labelAbove && s.nodeLabelAbove)}
                  style={{ left: node.x, top: node.y, '--i': index } as CSSProperties}
                >
                  <NodeButton
                    stageIndex={index}
                    active={index === active}
                    variant="map"
                    onSelect={onChange}
                  />
                </li>
              ))}
            </ol>
          </div>

          <ol className={s.rail} onKeyDown={handleListKeyDown}>
            {buildStages.map((stage, index) => (
              <li key={stage.index} className={s.railItem}>
                <NodeButton
                  stageIndex={index}
                  active={index === active}
                  variant="rail"
                  onSelect={onChange}
                />
              </li>
            ))}
            <li className={s.railReturn}>
              <span className={s.railReturnMark} aria-hidden="true">
                ↺
              </span>
              <span>LEARN → UNDERSTAND</span>
            </li>
          </ol>
        </div>

        <section className={s.panel} id={PANEL_ID} aria-label="Stage detail">
          <p className="visually-hidden" aria-live="polite">
            {`Stage ${stage.index} of ${TOTAL_LABEL} — ${stage.label}`}
          </p>

          <div key={stage.index} className={s.panelInner}>
            <p className={s.panelMeta}>
              <span className={s.panelStage}>STAGE {stage.index}</span>
              <span aria-hidden="true">/</span>
              <span>{TOTAL_LABEL}</span>
              <span className={s.panelTag}>SIGNAL ACTIVE</span>
            </p>

            <h3 className={s.panelTitle}>{stage.label}</h3>
            <p className={s.panelStatement}>{stage.statement}</p>

            <p className={s.panelLabel}>QUESTIONS</p>
            <ol className={s.questions}>
              {stage.questions.map((question, index) => (
                <li key={question} className={s.question}>
                  <span className={s.qIndex}>Q.{String(index + 1).padStart(2, '0')}</span>
                  <span className={s.qText}>{question}</span>
                </li>
              ))}
            </ol>

            <div className={s.output}>
              <p className={s.outputLabel}>DECISION / OUTPUT</p>
              <p className={s.outputValue}>{stage.output}</p>
            </div>

            {stage.lens?.length ? (
              <div className={s.lens}>
                <p className={s.lensLabel}>LONG-TERM LENS</p>
                <ul className={s.lensList}>
                  {stage.lens.map((question) => (
                    <li key={question} className={s.lensItem}>
                      {question}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      </div>

      <div className={s.foot}>
        <span>SELECT A STAGE TO INSPECT IT</span>
        <span className={s.footReturn}>RETURN PATH — LEARN → UNDERSTAND</span>
      </div>
    </div>
  );
}
