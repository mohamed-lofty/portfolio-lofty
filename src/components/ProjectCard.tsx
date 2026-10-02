import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import s from './ProjectCard.module.css';
import { useReveal } from '../hooks/useReveal';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  /** route for the case study, e.g. /work/namaa */
  to: string;
  delay?: number;
}

export function ProjectCard({ project, to, delay = 0 }: ProjectCardProps) {
  const { revealProps } = useReveal<HTMLDivElement>(delay);

  return (
    <div {...revealProps}>
      <article className={s.card} aria-labelledby={`${project.id}-title`}>
        <span className={s.bar} aria-hidden="true" />

        <div className={s.summary}>
          <p className={s.meta}>
            {project.meta.map((item) => (
              <span key={item.label} className={s.metaItem}>
                <span className={s.metaLabel}>{item.label}</span>
                <span aria-hidden="true">—</span>
                <span className={s.metaValue}>{item.value}</span>
              </span>
            ))}
            {project.sample ? (
              <span className={s.badge} title="Illustrative case study — placeholder detail">
                SAMPLE
              </span>
            ) : null}
          </p>

          <h3 className={s.title} id={`${project.id}-title`}>
            <Link className={s.titleLink} to={to}>
              <span className={s.titleText}>{project.title}</span>
              <ArrowUpRight className={s.arrow} size={20} strokeWidth={1.75} aria-hidden="true" />
            </Link>
          </h3>

          <p className={s.description}>{project.description}</p>
        </div>

        <dl className={s.stages}>
          {project.stages.map((stage) => (
            <div key={stage.id} className={s.stage}>
              <dt className={s.stageLabel}>{stage.label}</dt>
              <dd className={s.stageBody}>{stage.body ?? '—'}</dd>
            </div>
          ))}
        </dl>
      </article>
    </div>
  );
}
