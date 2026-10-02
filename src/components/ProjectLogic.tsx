import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import s from './ProjectLogic.module.css';
import { useReveal } from '../hooks/useReveal';
import { projectFlows } from '../data/buildLogic';
import { getProjectBySlug } from '../data/projects';
import { cx } from '../lib/cx';

/** Stages that are not part of the six-step loop — shown as a divergence. */
const DIVERGENT = 'COMMUNICATE';

interface FlowRowProps {
  name: string;
  slug: string;
  stages: string[];
  index: number;
}

function FlowRow({ name, slug, stages, index }: FlowRowProps) {
  const { revealProps } = useReveal<HTMLLIElement>(index * 80);

  return (
    <li className={s.row} {...revealProps}>
      <div className={s.head}>
        <span className={s.num}>{String(index + 1).padStart(2, '0')}</span>
        <Link className={cx('link-line', s.name)} to={`/work/${slug}`}>
          {name}
        </Link>
        <span className={s.tag}>
          CASE STUDY
          <ArrowRight size={13} strokeWidth={2} aria-hidden="true" />
        </span>
      </div>

      <ol className={s.chain}>
        {stages.map((stage, stepIndex) => (
          <li key={`${stage}-${stepIndex}`} className={s.step}>
            {stepIndex > 0 ? (
              <span className={s.stepArrow} aria-hidden="true">
                →
              </span>
            ) : null}
            <span className={cx(s.stepName, stage === DIVERGENT && s.stepAlt)}>{stage}</span>
          </li>
        ))}
      </ol>
    </li>
  );
}

/** THE SAME LOGIC, DIFFERENT PROBLEMS — the framework as it appears in real work. */
export function ProjectLogic() {
  return (
    <ol className={s.list}>
      {projectFlows.map((flow, index) => {
        const project = getProjectBySlug(flow.slug);
        return (
          <FlowRow
            key={flow.slug}
            index={index}
            slug={flow.slug}
            name={project?.title ?? flow.slug}
            stages={flow.stages}
          />
        );
      })}
    </ol>
  );
}
