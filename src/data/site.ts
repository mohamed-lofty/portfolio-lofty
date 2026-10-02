import type { NavLink, SocialLink } from '../types';

/* ============================================================================
   EDIT THIS FILE TO CHANGE SITE-WIDE SETTINGS
   (navigation, email, social links, headline, footer)
   ============================================================================ */

export const site = {
  name: 'LOFTY',
  title: 'Mohamed Lotfy — Marketing Strategy × Systems',

  /** EDIT THIS: the standard description used for the homepage / search engines */
  description:
    'Mohamed Lotfy is a marketing strategist and systems builder working across marketing, technology, creative strategy, digital products, and systems thinking.',

  eyebrow: 'Marketing Strategy × Systems',

  /** The identity portrait — background identity layer on home, editorial crop on about.
      Served as-is from /public (no build-time image processing). */
  portrait: {
    src: '/images/lofty-portrait.jpg',
    width: 1280,
    height: 1126,
  },

  /** EDIT THIS: homepage headline. Wrap a word in *stars* to give it the accent style. */
  headline: 'I build marketing *systems* that turn ideas into something people can act on.',

  /** EDIT THIS: homepage supporting copy — one string per paragraph. */
  lede: [
    'Lofty is a marketing strategist and systems builder focused on positioning, creative strategy, content, and digital products.',
    'I work at the intersection of marketing, technology, and systems thinking — turning scattered ideas into clear strategies, structured experiences, and practical systems.',
    'I’m interested in building systems with a longer-term perspective — considering the resources they use, the friction they create, the behaviors they encourage, and how they can improve over time.',
  ],

  /** Navigation — the order here is the order shown in the menu */
  nav: [
    { id: '/', label: 'HOME', to: '/' },
    { id: '/work', label: 'WORK', to: '/work' },
    { id: '/systems', label: 'SYSTEMS', to: '/systems' },
    { id: '/thinking', label: 'THINKING', to: '/thinking' },
    { id: '/about', label: 'ABOUT', to: '/about' },
    { id: '/contact', label: 'CONTACT', to: '/contact' },
  ] satisfies NavLink[],

  /** EDIT THIS: everything shown in the site footer */
  footer: {
    brand: 'Lofty',
    descriptor: 'Marketing Strategy × Systems',
    statement: 'Built around thinking, structure, and execution.',
    /** optional second line — set to null to hide it */
    supporting: 'Useful things. Thoughtful systems. Long-term perspective.',
    copyright: '© 2026 Lofty. All rights reserved.',
  },

  contact: {
    /** EDIT THIS: contact page headline (also used on the homepage closing band).
        Wrap a word in *stars* to give it the accent style. */
    title: 'Have a problem worth *solving*?',

    /** EDIT THIS: intro copy on the contact page — one string per paragraph */
    body: [
      "Tell me what you're building, what isn't working, or what you're trying to figure out.",
      "I'll look at the problem first — then the solution.",
    ],

    /* EDIT THIS to change your email address. */
    email: 'mohamedfuturemaker@gmail.com',
    isPlaceholder: false,

    /* EDIT THIS to add social links, e.g.:
         { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/your-name' }
       href: null shows the label without a link (until the real URL is added). */
    socials: [
      { label: 'LINKEDIN', href: null },
      { label: 'GITHUB', href: null },
      { label: 'BEHANCE', href: null },
    ] as SocialLink[],

    /* EDIT THIS to show a status line on the contact page, e.g.:
         'OPEN TO SELECTED PROJECTS'
       Set to null ( no quotes ) to hide it. */
    availability: null as string | null,
  },
} as const;
