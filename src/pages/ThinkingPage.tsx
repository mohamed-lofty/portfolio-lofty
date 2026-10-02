import { Fragment, useState } from 'react';
import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import s from './ThinkingPage.module.css';
import { SectionHeader } from '../components/SectionHeader';
import { Principle } from '../components/Principle';
import { ArticleCard } from '../components/ArticleCard';
import { Placeholder } from '../components/Placeholder';
import { BuildSystem } from '../components/BuildSystem';
import { BuildLoop } from '../components/BuildLoop';
import { ProjectLogic } from '../components/ProjectLogic';
import { SystemQuestions } from '../components/SystemQuestions';
import { usePageMeta } from '../hooks/usePageMeta';
import { useReveal } from '../hooks/useReveal';
import { thinkingQuote, topics } from '../data/thinking';
import { buildStages } from '../data/buildLogic';
import { articles } from '../data/articles';
import { cx } from '../lib/cx';

const SPEC_ROWS: Array<[string, string]> = [
  ['SYSTEM', 'THE BUILD LOGIC'],
  ['STAGES', '01 UNDERSTAND — 06 LEARN'],
  ['RETURN', 'LEARN → UNDERSTAND'],
  ['MODE', 'CONTINUOUS ITERATION'],
];

/** Editorial hero: the thinking statement next to the system spec. */
function EditorialHero() {
  const { revealProps } = useReveal<HTMLDivElement>();
  const quoteWords = thinkingQuote.split(/\s+/);

  return (
    <div className={s.hero} {...revealProps}>
      <blockquote className={s.quote}>
        <span className={s.quoteRule} aria-hidden="true" />
        <p>
          <span aria-hidden="true">“</span>
          {quoteWords.map((word, index) => (
            <Fragment key={`${word}-${index}`}>
              <span className={s.word} style={{ '--i': index } as CSSProperties}>
                {word}
              </span>{' '}
            </Fragment>
          ))}
          <span aria-hidden="true">”</span>
        </p>
      </blockquote>

      <dl className={s.spec}>
        {SPEC_ROWS.map(([key, value]) => (
          <div key={key} className={s.specRow}>
            <dt className={s.specKey}>{key}</dt>
            <dd className={s.specValue}>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

interface BuildLogicFlowProps {
  active: number;
  onSelect: (index: number) => void;
}

/** The six stages as a signal path — selecting one loads it in the system. */
function BuildLogicFlow({ active, onSelect }: BuildLogicFlowProps) {
  const { revealProps } = useReveal<HTMLDivElement>();

  return (
    <div className={s.flowWrap} {...revealProps}>
      <p className={s.flowLabel}>SYSTEM FLOW</p>
      <ol className={s.flow}>
        {buildStages.map((stage, index) => {
          const last = index === buildStages.length - 1;
          return (
            <li key={stage.index} className={s.flowItem}>
              <button
                type="button"
                className={cx(s.flowBtn, index === active && s.flowBtnActive)}
                aria-pressed={index === active}
                aria-controls="stage-panel"
                onClick={() => onSelect(index)}
              >
                <span className={s.flowNum}>{stage.index}</span>
                <span className={s.flowName}>{stage.label}</span>
              </button>
              <span
                className={cx(s.flowArrow, last && s.flowLoop)}
                aria-hidden="true"
              >
                {last ? '↺' : '→'}
              </span>
            </li>
          );
        })}
      </ol>
      <p className="visually-hidden">The loop returns from learn to understand.</p>
    </div>
  );
}

/** The long-term / sustainability questions, held inside the system. */
function LongTermLens() {
  const { revealProps } = useReveal<HTMLDivElement>();
  const lensStages = buildStages.filter((stage) => (stage.lens?.length ?? 0) > 0);

  return (
    <div className={s.lens} {...revealProps}>
      <div className={s.lensIntro}>
        <p className={s.lensText}>
          I’m interested in what happens beyond the immediate solution — how systems use resources,
          influence behavior, create repetition, and perform over time.
        </p>
        <p className={s.lensText}>
          So the questions are asked inside the system, not added after it: while the structure is
          being found, while the thing is being built, and when it comes back from reality.
        </p>
        <Link
          className={cx('link-line', s.lensLink)}
          to="/thinking/designing-systems-with-sustainability-in-mind"
        >
          Read the note — Sustainability
          <ArrowRight size={13} strokeWidth={2} aria-hidden="true" />
        </Link>
      </div>

      <ul className={s.lensStages}>
        {lensStages.map((stage) => (
          <li key={stage.index} className={s.lensStage}>
            <p className={s.lensStageHead}>
              <span className={s.lensStageNum}>{stage.index}</span>
              {stage.label}
            </p>
            <ul className={s.lensQuestions}>
              {stage.lens?.map((question) => (
                <li key={question} className={s.lensQuestion}>
                  {question}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Existing topics and published notes — the deeper explorations. */
function Notes() {
  return (
    <>
      <div className={s.block}>
        <p className={s.blockLabel}>SELECTED TOPICS</p>
        <ol className={s.topics}>
          {topics.map((topic, index) => (
            <Principle key={topic.index} principle={topic} delay={index * 60} />
          ))}
        </ol>
      </div>

      <div className={s.block}>
        <p className={s.blockLabel}>NOTES</p>
        {articles.length > 0 ? (
          <div className={s.articleList}>
            {articles.map((article, index) => (
              <ArticleCard key={article.slug} article={article} delay={index * 60} />
            ))}
          </div>
        ) : (
          <Placeholder text="New notes in progress — essays and frameworks will be published here." />
        )}
      </div>
    </>
  );
}

export function ThinkingPage() {
  usePageMeta(
    'Thinking in Systems — Mohamed Lotfy',
    'The build logic: understand, frame, structure, build, test, learn — a six-stage strategic system for turning ambiguity into structure, and structure into systems that can be tested and improved.',
  );

  const [activeStage, setActiveStage] = useState(0);

  /* selecting a stage from the flow loads it in the system below */
  const selectFromFlow = (index: number) => {
    setActiveStage(index);
    document.getElementById('build-system')?.scrollIntoView({ block: 'nearest' });
  };

  return (
    <>
      <section className="section" aria-labelledby="thinking-title">
        <div className="container">
          <SectionHeader
            index="03"
            label="THINKING"
            title="Thinking in systems."
            titleId="thinking-title"
            lede={
              'Marketing problems rarely exist in isolation.\n' +
              'A weak offer can look like a content problem.\n' +
              'A positioning problem can look like an advertising problem.\n' +
              'A workflow problem can look like a productivity problem.'
            }
          />
          <EditorialHero />
        </div>
      </section>

      <section className="section" aria-labelledby="build-logic-title">
        <div className="container">
          <SectionHeader
            index="03.1"
            label="THE BUILD LOGIC"
            title="I don’t start with tactics. I start with the *problem*."
            titleId="build-logic-title"
            lede={
              'Six stages: understand → frame → structure → build → test → learn.\n' +
              'Not a straight line — LEARN returns to UNDERSTAND.'
            }
          />

          <BuildLogicFlow active={activeStage} onSelect={selectFromFlow} />
          <BuildSystem active={activeStage} onChange={setActiveStage} />
        </div>
      </section>

      <section className="section" aria-labelledby="project-logic-title">
        <div className="container">
          <SectionHeader
            index="03.2"
            label="APPLICATION"
            title="The same logic, different *problems*."
            titleId="project-logic-title"
            lede={
              'The framework is not a theory.\n' +
              'It shows up in the work — and it bends when the problem demands it.'
            }
          />
          <ProjectLogic />
        </div>
      </section>

      <section className="section" aria-labelledby="premises-title">
        <div className="container">
          <SectionHeader
            index="03.3"
            label="PREMISES"
            title="The questions behind the *system*."
            titleId="premises-title"
            lede={
              'The stages describe the process.\n' +
              'These six questions explain why each stage exists.'
            }
          />
          <SystemQuestions />
        </div>
      </section>

      <section className="section" aria-labelledby="lens-title">
        <div className="container">
          <SectionHeader
            index="03.4"
            label="LONG-TERM LENS"
            title="Not a step. A *layer*."
            titleId="lens-title"
          />
          <LongTermLens />
        </div>
      </section>

      <section className="section" aria-labelledby="loop-title">
        <div className="container">
          <SectionHeader
            index="03.5"
            label="THE LOOP"
            title="And then it starts *again*."
            titleId="loop-title"
          />
          <BuildLoop />
        </div>
      </section>

      <section className="section" aria-labelledby="notes-title">
        <div className="container">
          <SectionHeader
            index="03.6"
            label="DEEPER EXPLORATIONS"
            title="Topics, notes, and *essays*."
            titleId="notes-title"
          />
          <Notes />
        </div>
      </section>
    </>
  );
}
