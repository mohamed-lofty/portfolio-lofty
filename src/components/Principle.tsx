import { Link } from 'react-router-dom';
import s from './Principle.module.css';
import { useReveal } from '../hooks/useReveal';
import type { Principle as PrincipleData } from '../types';

interface PrincipleProps {
  principle: PrincipleData;
  delay?: number;
}

export function Principle({ principle, delay = 0 }: PrincipleProps) {
  const { revealProps } = useReveal<HTMLLIElement>(delay);

  return (
    <li className={s.principle} {...revealProps}>
      <span className={s.index}>{principle.index}</span>
      <div>
        {principle.title ? (
          <p className={s.title}>
            {principle.slug ? (
              <Link className="link-line" to={`/thinking/${principle.slug}`}>
                {principle.title}
              </Link>
            ) : (
              principle.title
            )}
          </p>
        ) : null}
        <p className={s.text}>{principle.text}</p>
      </div>
    </li>
  );
}
