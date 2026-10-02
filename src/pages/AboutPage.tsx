import type { CSSProperties } from 'react';
import s from './AboutPage.module.css';
import { SectionHeader } from '../components/SectionHeader';
import { IdentityPortrait } from '../components/IdentityPortrait';
import { usePageMeta } from '../hooks/usePageMeta';
import { useReveal } from '../hooks/useReveal';
import { about, aboutFacts, approach, workSpans } from '../data/about';

function IndexedRow({
  label,
  index,
  delay = 0,
}: {
  label: string;
  index: number;
  delay?: number;
}) {
  const { revealProps } = useReveal<HTMLLIElement>(delay);

  return (
    <li className={s.row} {...revealProps}>
      <span className={s.rowIndex}>{String(index + 1).padStart(2, '0')}</span>
      <span className={s.rowLabel}>{label}</span>
    </li>
  );
}

export function AboutPage() {
  usePageMeta(
    'About Mohamed Lotfy',
    'Marketing strategist, systems builder, and developer working across marketing, technology, and creative problem-solving.',
  );

  const { revealProps: introProps } = useReveal<HTMLDivElement>();
  const { revealProps: philosophyProps } = useReveal<HTMLElement>();
  const { revealProps: factsProps } = useReveal<HTMLDListElement>();

  return (
    <section className="section" aria-labelledby="about-title">
      <div className="container">
        <SectionHeader
          index="04"
          label="ABOUT"
          title={about.title}
          titleId="about-title"
          lede={about.role}
        />

        <div className={s.introRow} {...introProps}>
          <div className={s.intro}>
            {about.body.map((paragraph) => (
              <p key={paragraph} className={s.introText}>
                {paragraph}
              </p>
            ))}
          </div>

          <IdentityPortrait variant="figure" className={s.portrait} />
        </div>

        <section className={s.philosophy} {...philosophyProps} aria-label="Approach">
          <p className={s.blockLabel}>APPROACH</p>
          <p className={s.philosophyText}>{approach.lead}</p>
          <ul className={s.approachSteps}>
            {approach.steps.map((step) => (
              <li key={step} className={s.approachStep}>
                {step}
              </li>
            ))}
          </ul>
        </section>

        <div className={s.grid}>
          <dl className={s.facts} {...factsProps}>
            {aboutFacts.map((fact, factIndex) => (
              <div
                key={fact.label}
                className={s.fact}
                style={{ '--i': factIndex } as CSSProperties}
              >
                <dt className={s.factLabel}>{fact.label}</dt>
                <dd className={s.factValue}>{fact.value}</dd>
              </div>
            ))}
          </dl>

          <div className={s.capabilities}>
            <p className={s.blockLabel}>WORK SPANS</p>
            <ul className={s.rows}>
              {workSpans.map((span, index) => (
                <IndexedRow key={span} label={span} index={index} delay={index * 55} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
