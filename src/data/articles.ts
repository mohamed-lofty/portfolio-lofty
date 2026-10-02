import type { Article } from '../types';

/* ============================================================================
   EDIT THIS FILE TO PUBLISH ARTICLES / NOTES

   The Thinking page lists whatever is in this list — nothing is invented.

   To add one, copy this template and fill it in:

   {
     slug: 'my-article-slug',          // address: /thinking/my-article-slug
     title: 'My article title',
     excerpt: 'One or two sentences shown in the list.',
     date: '2026-09-25',               // year-month-day
     tags: ['STRATEGY'],
     body: [
       'First paragraph.',
       'Second paragraph.',
     ],
     // optional — ordered blocks after the opening paragraphs:
     blocks: [
       { kind: 'heading', text: 'Section title' },
       { kind: 'paragraph', text: 'A paragraph.' },
       { kind: 'list', items: ['First point', 'Second point'] },
     ],
   },

   While this list is empty, the Thinking page shows a placeholder.
   ============================================================================ */

export const articles: Article[] = [
  {
    slug: 'designing-systems-with-sustainability-in-mind',
    title: 'Sustainability',
    excerpt: 'Building with a longer-term perspective.',
    description:
      'Exploring how marketing, technology, and systems can contribute to more sustainable ways of thinking, building, and operating.',
    date: '2026-09-28',
    tags: ['SYSTEMS', 'SUSTAINABILITY'],
    body: [
      "Sustainability is one of the areas I'm actively interested in exploring through my work.",
      "I don't see sustainability as something that should only exist in sustainability-focused projects.",
      'I want to explore how marketing, technology, and systems can contribute to more sustainable ways of thinking, building, and operating.',
      'Whenever I build a new project, product, or system, I try to ask:',
    ],
    blocks: [
      {
        kind: 'list',
        items: [
          'Can this solve the problem while creating less unnecessary waste, friction, or repetition?',
          'Can the system encourage better decisions over time?',
          'Can technology be used to make sustainable choices easier and more practical?',
        ],
      },
      {
        kind: 'paragraph',
        text: 'This means sustainability becomes a consideration in the way I approach new work — not a label added to the final product.',
      },
      { kind: 'heading', text: 'A question behind every new project' },
      {
        kind: 'paragraph',
        text: "How can what I'm building create value while also serving a more sustainable future?",
      },
      {
        kind: 'list',
        items: [
          'Sustainable business models',
          'Resource-efficient systems',
          'Digital solutions that reduce unnecessary processes',
          'Systems that encourage sustainable behavior',
          'Technology for climate and sustainability',
          'Long-term thinking in product and marketing decisions',
          'Designing processes that are easier to maintain and improve',
        ],
      },
      {
        kind: 'paragraph',
        text: "I don't claim that every project is inherently sustainable. The goal is to keep looking for ways to make each new system more useful, efficient, responsible, and sustainable.",
      },
      { kind: 'heading', text: 'The direction' },
      {
        kind: 'paragraph',
        text: 'Build useful things. Build them to last. And keep asking how they can serve something bigger than the immediate problem.',
      },
    ],
  },
];

export function getArticleBySlug(slug: string | undefined): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
