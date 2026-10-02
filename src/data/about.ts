import type { Fact } from '../types';

/* ============================================================================
   EDIT THIS FILE TO CHANGE THE ABOUT PAGE + THE "WHAT IS LOFTY?" HOME SECTION
   ============================================================================ */

/** EDIT THIS: About page headline and role line */
export const about = {
  title: 'Mohamed Lotfy',
  role: 'Marketing Strategist · Systems Builder · Developer',
  /** EDIT THIS: intro copy — one string per paragraph */
  body: [
    'I work across marketing, technology, and creative problem-solving.',
    "My interest isn't limited to creating campaigns or content.",
    "I'm interested in understanding how things work, finding the structure behind a problem, and building systems that make better execution possible.",
    'I’m interested in building things that are useful today while remaining thoughtful about how they operate, consume resources, influence behavior, and improve over time.',
  ],
} as const;

/** EDIT THIS: fact rows shown in the left column of the About page */
export const aboutFacts: Fact[] = [
  { label: 'BASED', value: 'CAIRO, EG' },
  { label: 'LANGUAGES', value: 'ARABIC / ENGLISH' },
  { label: 'PRACTICE', value: 'LOFTY' },
  { label: 'FOCUS', value: 'MARKETING STRATEGY × SYSTEMS' },
];

/** EDIT THIS: work spans — the indexed list on the About page */
export const workSpans: string[] = [
  'Marketing strategy',
  'Positioning',
  'Brand strategy',
  'Content strategy',
  'Creative direction',
  'Digital products',
  'Systems design',
  'Programming',
];

/** EDIT THIS: the approach block on the About page */
export const approach = {
  lead: 'I approach projects as systems rather than isolated deliverables.',
  steps: ['Understand the problem.', 'Build the structure.', 'Make it usable.', 'Build it to last.'],
};

/** EDIT THIS: the "What is Lofty?" section on the homepage */
export const whatIsLofty = {
  title: 'What is Lofty?',
  body: [
    'Lofty is the personal practice of Mohamed Lotfy.',
    'It sits between marketing strategy and systems building.',
    "The goal isn't to make marketing look complicated. It's to understand the problem, find the underlying structure, and build something that can actually be used.",
    'I’m interested in systems that are not only useful today, but thoughtful about how they work over time.',
    'That means considering the resources a system consumes, the friction it creates, the behaviors it encourages, and whether it can be maintained and improved.',
  ],
  areas: [
    'Marketing strategy',
    'Positioning',
    'Brand thinking',
    'Content strategy',
    'Creative direction',
    'Digital products',
    'Systems & workflows',
    'Technology',
  ],
  closing: 'Strategy first. Systems second. Execution where it matters.',
};
