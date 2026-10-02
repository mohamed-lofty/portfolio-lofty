import { useState } from 'react';
import { ArrowRight, Check, Copy } from 'lucide-react';
import s from './ContactPage.module.css';
import { SectionHeader } from '../components/SectionHeader';
import { LoopDiagram } from '../components/LoopDiagram';
import { usePageMeta } from '../hooks/usePageMeta';
import { useReveal } from '../hooks/useReveal';
import { site } from '../data/site';
import { aboutFacts } from '../data/about';

export function ContactPage() {
  usePageMeta(
    'Contact — Mohamed Lotfy',
    "Tell me what you're building, what isn't working, or what you're trying to figure out. I'll look at the problem first — then the solution.",
  );

  const [copied, setCopied] = useState(false);
  const { title, body, email, isPlaceholder, socials, availability } = site.contact;
  const { revealProps } = useReveal<HTMLDivElement>();
  const { revealProps: loopProps } = useReveal<HTMLDivElement>(120);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard unavailable — the address stays selectable on screen */
    }
  };

  const locationFact = aboutFacts.find((fact) => fact.label === 'BASED');
  const languagesFact = aboutFacts.find((fact) => fact.label === 'LANGUAGES');

  return (
    <section className="section" aria-labelledby="contact-title">
      <div className="container">
        <SectionHeader
          index="05"
          label="CONTACT"
          title={title}
          titleId="contact-title"
        />

        <div className={s.body} {...revealProps}>
          <div className={s.intro}>
            {body.map((paragraph) => (
              <p key={paragraph} className={s.introText}>
                {paragraph}
              </p>
            ))}
          </div>

          <a className={s.email} href={`mailto:${email}`}>
            {email}
          </a>

          <div className={s.actions}>
            <a className="btn btn-primary" href={`mailto:${email}`}>
              Start a conversation
              <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
            </a>
            <button type="button" className={s.copy} onClick={copyEmail}>
              {copied ? (
                <Check size={13} strokeWidth={2} aria-hidden="true" />
              ) : (
                <Copy size={13} strokeWidth={2} aria-hidden="true" />
              )}
              <span>{copied ? 'COPIED' : 'COPY'}</span>
            </button>
          </div>

          <p className={s.status} role="status" aria-live="polite">
            {copied ? 'Email address copied to clipboard.' : ''}
          </p>

          {isPlaceholder ? (
            <p className={s.note}>PLACEHOLDER EMAIL — EDITABLE IN src/data/site.ts</p>
          ) : null}
        </div>

        <dl className={s.info}>
          <div className={s.infoItem}>
            <dt className={s.infoLabel}>EMAIL</dt>
            <dd className={s.infoValue}>
              <a href={`mailto:${email}`}>{email}</a>
            </dd>
          </div>

          <div className={s.infoItem}>
            <dt className={s.infoLabel}>{locationFact?.label ?? 'BASED'}</dt>
            <dd className={s.infoValue}>{locationFact?.value}</dd>
          </div>

          <div className={s.infoItem}>
            <dt className={s.infoLabel}>{languagesFact?.label ?? 'LANGUAGES'}</dt>
            <dd className={s.infoValue}>{languagesFact?.value}</dd>
          </div>

          <div className={s.infoItem}>
            <dt className={s.infoLabel}>AVAILABILITY</dt>
            <dd className={availability ? s.infoValue : s.infoPending}>
              {availability ?? 'To be listed.'}
            </dd>
          </div>

          <div className={s.infoItem}>
            <dt className={s.infoLabel}>SOCIALS</dt>
            <dd className={socials.length > 0 ? s.infoValue : s.infoPending}>
              {socials.length > 0 ? (
                <span className={s.socials}>
                  {socials.map((social) =>
                    social.href ? (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className={s.social}
                      >
                        {social.label}
                      </a>
                    ) : (
                      /* href not supplied yet — shown as a plain label, not a link */
                      <span key={social.label} className={s.socialPending}>
                        {social.label}
                      </span>
                    ),
                  )}
                </span>
              ) : (
                'To be added.'
              )}
            </dd>
          </div>
        </dl>

        <div className={s.loop} {...loopProps}>
          <LoopDiagram />
        </div>
      </div>
    </section>
  );
}
