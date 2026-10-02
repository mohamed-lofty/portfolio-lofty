import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import s from './Hero.module.css';
import { ProcessDiagram } from './ProcessDiagram';
import { NetworkBackdrop } from './NetworkBackdrop';
import { IdentityPortrait } from './IdentityPortrait';
import { site } from '../data/site';

/** Splits the headline on *stars* so wrapped words get the accent style. */
function AccentText({ text }: { text: string }) {
  return (
    <>
      {text.split('*').map((part, index) =>
        index % 2 === 1 ? (
          <em key={index} className={s.accent}>
            {part}
          </em>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
    </>
  );
}

export function Hero() {
  return (
    <section className={s.hero} id="top" aria-labelledby="hero-title">
      {/* identity layer: photograph first, then the system map over it */}
      <IdentityPortrait variant="layer" eager className={s.identity} />
      <NetworkBackdrop className={s.system} />

      <div className={`container ${s.inner}`}>
        <div className={s.copy}>
          <p className={s.eyebrow}>
            <span className={s.dot} aria-hidden="true" />
            {site.eyebrow}
          </p>

          <h1 className={s.title} id="hero-title">
            <AccentText text={site.headline} />
          </h1>

          {site.lede.map((paragraph) => (
            <p key={paragraph} className={s.lede}>
              {paragraph}
            </p>
          ))}

          <div className={s.cta}>
            <Link className="btn btn-primary" to="/work">
              View selected work
              <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
            </Link>
            <Link className="btn btn-ghost" to="/thinking">
              How I think
              <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <ProcessDiagram />
      </div>
    </section>
  );
}
