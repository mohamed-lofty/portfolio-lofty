import type { CSSProperties } from 'react';
import s from './SystemQuestions.module.css';
import { buildStages } from '../data/buildLogic';
import { useReveal } from '../hooks/useReveal';

/**
 * THE QUESTIONS BEHIND THE SYSTEM — one premise per stage, laid out on the
 * same rail language as the build system so the two stay visually connected.
 */
export function SystemQuestions() {
  const { revealProps } = useReveal<HTMLOListElement>();

  return (
    <ol className={s.list} {...revealProps}>
      {buildStages.map((stage, index) => (
        <li key={stage.index} className={s.row} style={{ '--i': index } as CSSProperties}>
          <span className={s.node} aria-hidden="true" />
          <div className={s.body}>
            <span className={s.index}>{stage.index}</span>
            <span className={s.label}>{stage.label}</span>
            <span className={s.question}>{stage.premise}</span>
          </div>
        </li>
      ))}
    </ol>
  );
}
