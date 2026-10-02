import s from './WorkPage.module.css';
import { SectionHeader } from '../components/SectionHeader';
import { ProjectCard } from '../components/ProjectCard';
import { usePageMeta } from '../hooks/usePageMeta';
import { projects } from '../data/projects';

export function WorkPage() {
  usePageMeta(
    'Selected Work — Mohamed Lotfy',
    'A selection of projects exploring marketing, digital products, systems, creative strategy, and practical problem solving.',
  );

  return (
    <section className="section" aria-labelledby="work-title">
      <div className="container">
        <SectionHeader
          index="01"
          label="WORK"
          title="Selected Work"
          titleId="work-title"
          lede={
            'A selection of projects exploring marketing, digital products, systems, creative strategy, and practical problem solving.\n' +
            'Across different types of work, I’m interested in how better systems can reduce unnecessary friction, repetition, and wasted effort while making better decisions easier to repeat.'
          }
        />

        <div className={s.stack}>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              to={`/work/${project.slug}`}
              delay={index * 70}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
