import s from './IdentityPortrait.module.css';
import { cx } from '../lib/cx';
import { site } from '../data/site';

interface IdentityPortraitProps {
  /**
   * `layer`  — atmospheric background identity (home hero): blurred, low opacity,
   *            dissolved into the page behind the headline.
   * `figure` — editorial crop (about): sharper, closer to full strength.
   */
  variant?: 'layer' | 'figure';
  className?: string;
  /** load eagerly when the photograph sits above the fold */
  eager?: boolean;
}

/**
 * Mohamed Lotfy's photograph, treated as an identity layer rather than a
 * profile picture: monochrome, pulled into the forest/bone palette, softened
 * and dissolved at the edges so it reads as presence — never as content.
 */
export function IdentityPortrait({
  variant = 'layer',
  className,
  eager = false,
}: IdentityPortraitProps) {
  return (
    <div
      className={cx(s.root, variant === 'layer' ? s.layer : s.figure, className)}
      data-identity={variant}
      aria-hidden={variant === 'layer' ? 'true' : undefined}
    >
      <img
        className={s.img}
        src={site.portrait.src}
        alt=""
        width={site.portrait.width}
        height={site.portrait.height}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={eager ? 'high' : 'auto'}
      />

      {variant === 'layer' && <span className={s.grid} aria-hidden="true" />}

      <span className={s.scrim} aria-hidden="true" />

      {variant === 'figure' && (
        <span className={s.tag} aria-hidden="true">
          ID · 01
        </span>
      )}
    </div>
  );
}
