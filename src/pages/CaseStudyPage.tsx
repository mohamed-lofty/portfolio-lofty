import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import s from './CaseStudyPage.module.css';
import { StageRail } from '../components/StageRail';
import { Placeholder } from '../components/Placeholder';
import { usePageMeta } from '../hooks/usePageMeta';
import { useReveal } from '../hooks/useReveal';
import { getNextProject, getProjectBySlug } from '../data/projects';

function StageSection({
  id,
  label,
  index,
  total,
  body,
  delay = 0,
}: {
  id: string;
  label: string;
  index: number;
  total: number;
  body: string | null;
  delay?: number;
}) {
  const { revealProps } = useReveal<HTMLElement>(delay);

  return (
    <section className={s.stageSection} id={`stage-${id}`} {...revealProps}>
      <div className={s.stageHead}>
        <span className={s.stageIndex}>{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
        <h2 className={s.stageLabel}>{label}</h2>
      </div>
      {body ? <p className={s.stageText}>{body}</p> : <Placeholder />}
    </section>
  );
}

export function CaseStudyPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  usePageMeta(
    project ? `${project.title} — Lofty` : 'Case study not found — Lofty',
    project?.description,
  );

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  const next = getNextProject(project.slug);
  const railStages = project.stages.map((stage) => ({ id: stage.id, label: stage.label }));
  const total = project.stages.length + 1; // stages + key takeaway

  return (
    <article className={s.page}>
      <div className="container">
        <Link className={s.back} to="/work">
          <ArrowLeft size={13} strokeWidth={2} aria-hidden="true" />
          BACK TO WORK
        </Link>

        <header className={s.header}>
          <p className={s.kicker}>
            <span className={s.kickerIndex}>{project.index}</span>
            <span aria-hidden="true">—</span>
            CASE STUDY
            {project.sample ? (
              <span className={s.badge} title="Illustrative case study — placeholder detail">
                SAMPLE
              </span>
            ) : null}
          </p>

          <h1 className={s.title}>{project.title}</h1>
          <p className={s.lede}>{project.description}</p>

          <dl className={s.metaGrid}>
            {project.meta.map((item) => (
              <div key={item.label} className={s.metaItem}>
                <dt className={s.metaLabel}>{item.label}</dt>
                <dd className={s.metaValue}>{item.value}</dd>
              </div>
            ))}
          </dl>
        </header>

        <div className={s.body}>
          <div className={s.railWrap}>
            <StageRail stages={railStages} />
          </div>

          <div className={s.stages}>
            {project.stages.map((stage, index) => (
              <StageSection
                key={stage.id}
                id={stage.id}
                label={stage.label}
                index={index}
                total={total}
                body={stage.body}
                delay={index * 50}
              />
            ))}

            <StageSection
              id="takeaway"
              label={project.takeawayLabel ?? 'KEY TAKEAWAY'}
              index={project.stages.length}
              total={total}
              body={project.takeaway}
              delay={project.stages.length * 50}
            />
          </div>
        </div>

        <div className={s.next}>
          <p className={s.nextLabel}>NEXT PROJECT</p>
          <Link className={s.nextLink} to={`/work/${next.slug}`}>
            <span className={s.nextIndex}>{next.index}</span>
            <span className={s.nextTitle}>{next.title}</span>
            <ArrowRight className={s.nextArrow} size={22} strokeWidth={1.75} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
