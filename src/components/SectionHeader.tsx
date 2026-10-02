import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import s from './SectionHeader.module.css';
import { useReveal } from '../hooks/useReveal';

interface SectionHeaderProps {
  index: string;
  label: string;
  /** wrap a word in *stars* to give it the accent style */
  title: string;
  titleId: string;
  note?: string;
  /** multiple lines are supported — separate them with \n */
  lede?: string;
  /** renders a "→ label" link aligned to the right of the header */
  link?: { to: string; label: string };
}

export function SectionHeader({
  index,
  label,
  title,
  titleId,
  note,
  lede,
  link,
}: SectionHeaderProps) {
  const { revealProps } = useReveal<HTMLDivElement>();

  return (
    <div className={s.head} {...revealProps}>
      <div className={s.titleGroup}>
        <p className={s.kicker}>
          <span className={s.num}>{index}</span>
          <span className={s.sep} aria-hidden="true">
            —
          </span>
          {label}
        </p>
        <h2 className={s.title} id={titleId}>
          {title.split('*').map((part, partIndex) =>
            partIndex % 2 === 1 ? (
              <em key={partIndex} className={s.accent}>
                {part}
              </em>
            ) : (
              <Fragment key={partIndex}>{part}</Fragment>
            ),
          )}
        </h2>
        {lede ? (
          <p className={s.lede}>
            {lede.split('\n').map((line, lineIndex) => (
              <Fragment key={line}>
                {lineIndex > 0 ? <br /> : null}
                {line}
              </Fragment>
            ))}
          </p>
        ) : null}
      </div>

      {note || link ? (
        <div className={s.aside}>
          {note ? <p className={s.note}>{note}</p> : null}
          {link ? (
            <Link className={s.link} to={link.to}>
              {link.label}
              <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
            </Link>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
