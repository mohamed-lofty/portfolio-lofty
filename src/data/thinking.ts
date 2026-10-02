import type { Principle } from '../types';

/* ============================================================================
   EDIT THIS FILE TO CHANGE THE THINKING PAGE

   - thinkingQuote → the large pull-quote (home preview + Thinking page)
   - topics        → the selected topics list (index, title, text)
   ============================================================================ */

/** EDIT THIS: the large pull-quote shown on the Thinking page and home preview */
export const thinkingQuote =
  'I use systems thinking to look beneath the visible problem and understand how the different parts affect each other.';

/** EDIT THIS: selected topics — one entry per row */
export const topics: Principle[] = [
  {
    index: '01',
    title: 'Why marketing systems matter more than isolated tactics',
    text: 'Marketing becomes fragile when every result depends on a single campaign, post, or idea.',
  },
  {
    index: '02',
    title: 'The difference between a strategy and a list of tactics',
    text: 'A strategy defines the decisions. Tactics are the actions that follow those decisions.',
  },
  {
    index: '03',
    title: 'Designing systems for repeatability',
    text: "The real value of a good process is not that it works once. It's that it can be repeated without rebuilding everything from zero.",
  },
  {
    index: '04',
    title: 'Technology as a marketing tool',
    text: 'Technology becomes useful when it removes friction between an idea and its execution.',
  },
  {
    index: '05',
    title: 'Designing systems with sustainability in mind',
    text: 'Sustainability can be considered at the system level — from the resources a process consumes to the behaviors it encourages and the decisions it makes easier.',
    slug: 'designing-systems-with-sustainability-in-mind',
  },
];
