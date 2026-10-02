import s from './HomePage.module.css';
import { Hero } from '../components/Hero';
import { SectionHeader } from '../components/SectionHeader';
import { ProjectCard } from '../components/ProjectCard';
import { SystemCard } from '../components/SystemCard';
import { ContactCTA } from '../components/ContactCTA';
import { usePageMeta } from '../hooks/usePageMeta';
import { useReveal } from '../hooks/useReveal';
import { projects } from '../data/projects';
import { systems } from '../data/systems';
import { thinkingQuote, topics } from '../data/thinking';
import { whatIsLofty } from '../data/about';
import { site } from '../data/site';

function ThinkingPreview() {
  const { revealProps } = useReveal<HTMLDivElement>();

  return (
    <div className={s.thinkingGrid} {...revealProps}>
      <blockquote className={s.quote}>
        <span className={s.quoteRule} aria-hidden="true" />
        <p>“{thinkingQuote}”</p>
      </blockquote>

      <div className={s.principles}>
        {topics.slice(0, 2).map((topic) => (
          <div key={topic.index} className={s.principle}>
            <span className={s.principleIndex}>{topic.index}</span>
            <div>
              <p className={s.principleTitle}>{topic.title}</p>
              <p className={s.principleText}>{topic.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WhatIsLofty() {
  const { revealProps } = useReveal<HTMLDivElement>();

  return (
    <div {...revealProps}>
      <div className={s.aboutGrid}>
        <div>
          <p className={s.areasLabel}>WORK AREAS</p>
          <ul className={s.areas}>
            {whatIsLofty.areas.map((area) => (
              <li key={area} className={s.area}>
                {area}
              </li>
            ))}
          </ul>
        </div>
        <div className={s.aboutBody}>
          {whatIsLofty.body.map((paragraph) => (
            <p key={paragraph} className={s.aboutCopy}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
      <p className={s.closing}>{whatIsLofty.closing}</p>
    </div>
  );
}

export function HomePage() {
  usePageMeta(site.title, site.description);

  return (
    <>
      <Hero />

      <section className="section" id="work" aria-labelledby="home-work-title">
        <div className="container">
          <SectionHeader
            index="01"
            label="SELECTED WORK"
            title="Strategic projects"
            titleId="home-work-title"
            link={{ to: '/work', label: 'View selected work' }}
          />
          <div className={s.stack}>
            {projects.slice(0, 2).map((project, index) => (
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

      <section className="section" id="systems" aria-labelledby="home-systems-title">
        <div className="container">
          <SectionHeader
            index="02"
            label="SYSTEMS"
            title="Systems I build"
            titleId="home-systems-title"
            link={{ to: '/systems', label: 'Explore systems' }}
          />
          <div className={s.systemGrid}>
            {systems.slice(0, 3).map((item, index) => (
              <SystemCard key={item.id} item={item} delay={index * 70} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="thinking" aria-labelledby="home-thinking-title">
        <div className="container">
          <SectionHeader
            index="03"
            label="THINKING"
            title="Thinking in systems."
            titleId="home-thinking-title"
            link={{ to: '/thinking', label: 'Read thinking' }}
          />
          <ThinkingPreview />
        </div>
      </section>

      <section className="section" id="about" aria-labelledby="home-about-title">
        <div className="container">
          <SectionHeader
            index="04"
            label="ABOUT"
            title={whatIsLofty.title}
            titleId="home-about-title"
            link={{ to: '/about', label: 'About Mohamed Lotfy' }}
          />
          <WhatIsLofty />
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
