import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import s from './ContactCTA.module.css';
import { useReveal } from '../hooks/useReveal';
import { site } from '../data/site';

/** The closing block on the homepage — an inverted band with the contact CTA. */
export function ContactCTA() {
  const { revealProps } = useReveal<HTMLDivElement>();

  return (
    <section className={s.band} aria-labelledby="home-cta-title">
      <div className="container" {...revealProps}>
        <p className={s.kicker}>
          <span className={s.dot} aria-hidden="true" />
          05 — CONTACT
        </p>

        <h2 className={s.title} id="home-cta-title">
          {site.contact.title.split('*').map((part, index) =>
            index % 2 === 1 ? (
              <em key={index} className={s.accent}>
                {part}
              </em>
            ) : (
              <Fragment key={index}>{part}</Fragment>
            ),
          )}
        </h2>

        <div className={s.row}>
          <Link className="btn btn-primary" to="/contact">
            Start a conversation
            <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
          </Link>
          <a className={s.mail} href={`mailto:${site.contact.email}`}>
            {site.contact.email}
          </a>
        </div>
      </div>
    </section>
  );
}
