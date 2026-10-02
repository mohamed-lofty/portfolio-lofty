import type { SystemItem } from '../types';

/* ============================================================================
   EDIT THIS FILE TO ADD, CHANGE, OR REMOVE SYSTEMS

   - flow    → the steps shown as chips (left → right); empty = block hidden
   - tools   → only add tools you actually know, or leave null (block hidden)
   - status  → e.g. 'ACTIVE' / 'IN PROGRESS', or null (block hidden)
   ============================================================================ */

export const systems: SystemItem[] = [
  {
    id: 'marketing-planning',
    slug: 'marketing-planning',
    index: '01',
    tag: 'PLANNING',
    title: 'Marketing Planning',
    description: 'Turning goals and business context into actionable marketing priorities.',
    schematic: 'dashboard',
    problem: null,
    flow: [],
    tools: null,
    status: null,
  },
  {
    id: 'content-systems',
    slug: 'content-systems',
    index: '02',
    tag: 'CONTENT',
    title: 'Content Systems',
    description: 'Creating a structure for generating, organizing, and distributing content.',
    schematic: 'document',
    problem: null,
    flow: [],
    tools: null,
    status: null,
  },
  {
    id: 'customer-journeys',
    slug: 'customer-journeys',
    index: '03',
    tag: 'JOURNEYS',
    title: 'Customer Journeys',
    description: 'Mapping the path from attention to action.',
    schematic: 'app',
    problem: null,
    flow: [],
    tools: null,
    status: null,
  },
  {
    id: 'digital-products',
    slug: 'digital-products',
    index: '04',
    tag: 'PRODUCTS',
    title: 'Digital Products',
    description: 'Turning ideas into usable digital experiences.',
    schematic: 'app',
    problem: null,
    flow: [],
    tools: null,
    status: null,
  },
  {
    id: 'internal-workflows',
    slug: 'internal-workflows',
    index: '05',
    tag: 'WORKFLOWS',
    title: 'Internal Workflows',
    description: 'Reducing repetitive work through structured processes and tools.',
    schematic: 'document',
    problem: null,
    flow: [],
    tools: null,
    status: null,
  },
  {
    id: 'strategy-frameworks',
    slug: 'strategy-frameworks',
    index: '06',
    tag: 'FRAMEWORKS',
    title: 'Strategy Frameworks',
    description: 'Breaking complex marketing problems into clear decisions.',
    schematic: 'dashboard',
    problem: null,
    flow: [],
    tools: null,
    status: null,
  },
  {
    id: 'sustainable-systems',
    slug: 'sustainable-systems',
    index: '07',
    tag: 'SUSTAINABILITY',
    title: 'Sustainable Systems',
    description:
      'Considering how systems consume resources, create friction, influence behavior, and perform over time.',
    schematic: 'document',
    problem: null,
    flow: [],
    tools: null,
    status: null,
  },
];

export function getSystemBySlug(slug: string | undefined): SystemItem | undefined {
  return systems.find((system) => system.slug === slug);
}
