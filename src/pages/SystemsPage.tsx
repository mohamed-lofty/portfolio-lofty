import s from './SystemsPage.module.css';
import { SectionHeader } from '../components/SectionHeader';
import { SystemCard } from '../components/SystemCard';
import { usePageMeta } from '../hooks/usePageMeta';
import { systems } from '../data/systems';

export function SystemsPage() {
  usePageMeta(
    'Systems — Mohamed Lotfy',
    'Marketing planning, content systems, customer journeys, digital products, internal workflows, strategy frameworks, and sustainable systems — the structure behind the outputs.',
  );

  return (
    <section className="section" aria-labelledby="systems-title">
      <div className="container">
        <SectionHeader
          index="02"
          label="SYSTEMS"
          title="I don't just create outputs. I build the structure behind them."
          titleId="systems-title"
          lede={
            'A campaign can generate attention.\n' +
            'A system determines what happens next.\n' +
            'I’m interested in systems that make decisions clearer, reduce unnecessary friction, and remain useful beyond a single execution.'
          }
        />

        <div className={s.list}>
          {systems.map((item, index) => (
            <SystemCard key={item.id} item={item} variant="full" delay={index * 70} />
          ))}
        </div>
      </div>
    </section>
  );
}
