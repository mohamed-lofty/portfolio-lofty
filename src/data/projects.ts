import type { Project } from '../types';

/* ============================================================================
   EDIT THIS FILE TO ADD, REMOVE, OR CHANGE PROJECTS / CASE STUDIES

   - slug  → the web address: /work/your-slug
   - sample: true  → shows a "SAMPLE" badge (use for illustrative case studies)
   - set a stage body to null → the page shows
     "Detailed project information coming soon."
   - takeaway: null → shows the same placeholder

   Suggested stage order (use only the ones the project supports):
   context → problem → objective → approach → system → execution →
   outcome → perspective  (long-term perspective)
   ============================================================================ */

export const projects: Project[] = [
  {
    id: 'namaa',
    slug: 'namaa',
    index: '01',
    title: 'Namaa',
    description: 'A lightweight marketing planning system for small businesses.',
    meta: [
      { label: 'ROLE', value: 'DESIGN & DEVELOPMENT' },
      { label: 'AREA', value: 'MARKETING PLANNING' },
    ],
    sample: false,
    stages: [
      {
        id: 'context',
        label: 'CONTEXT',
        body: "Small businesses often know they need to market themselves, but don't have a clear system for deciding what to do each week.",
      },
      {
        id: 'problem',
        label: 'PROBLEM',
        body: 'Marketing becomes reactive: random posts, disconnected ideas, and no consistent planning process.',
      },
      {
        id: 'objective',
        label: 'OBJECTIVE',
        body: "Create a simple system that turns a business's marketing needs into an actionable weekly plan.",
      },
      {
        id: 'approach',
        label: 'APPROACH',
        body: 'I approached Namaa as a product rather than a traditional marketing service. The focus was on simplifying the planning process and reducing the distance between strategy and execution.',
      },
      {
        id: 'system',
        label: 'SYSTEM / PROCESS',
        body: 'Business context → Marketing priorities → Weekly plan → Content actions → Execution.',
      },
      {
        id: 'execution',
        label: 'EXECUTION',
        body: 'I designed and developed a web-based prototype around the weekly marketing-planning workflow.',
      },
      {
        id: 'outcome',
        label: 'OUTCOME',
        body: 'A working prototype that demonstrates how marketing planning can be structured into a repeatable workflow.',
      },
      {
        id: 'perspective',
        label: 'LONG-TERM PERSPECTIVE',
        body: 'The broader idea behind the system is reducing unnecessary planning friction and repeated decision-making. A better system can make useful decisions easier to repeat without rebuilding the process from zero each week.',
      },
    ],
    takeaway:
      "Good marketing systems don't need to be complicated. The value comes from making the right decisions easier to repeat.",
    takeawayLabel: 'LESSONS',
  },
  {
    id: 'study-os',
    slug: 'study-os',
    index: '02',
    title: 'Study OS',
    description: 'A local desktop system for structured studying and planning.',
    meta: [
      { label: 'ROLE', value: 'DESIGN & DEVELOPMENT' },
      { label: 'AREA', value: 'STUDY PLANNING' },
    ],
    sample: false,
    stages: [
      {
        id: 'context',
        label: 'CONTEXT',
        body: 'Study planning can become fragmented across notes, calendars, task lists, and separate productivity tools.',
      },
      {
        id: 'problem',
        label: 'PROBLEM',
        body: 'There was a need for one structured environment that connects subjects, topics, tasks, deadlines, availability, and study sessions.',
      },
      {
        id: 'objective',
        label: 'OBJECTIVE',
        body: 'Build a desktop study-management system around structured planning rather than simple task tracking.',
      },
      {
        id: 'approach',
        label: 'APPROACH',
        body: 'The system was designed around the idea that planning should respond to the actual workload instead of treating every task equally.',
      },
      {
        id: 'system',
        label: 'SYSTEM / PROCESS',
        body: 'Subjects → Topics → Priority → Deadline → Difficulty → Workload → Availability → Study plan.',
      },
      {
        id: 'execution',
        label: 'EXECUTION',
        body: 'I built the system as a local Windows application with a structured database and planning logic. The interface includes a dashboard, study plan, tasks, subjects, calendar, statistics, settings, and pomodoro sessions.',
      },
      {
        id: 'outcome',
        label: 'OUTCOME',
        body: 'A functional local study-management system designed around structured planning and workload prioritization.',
      },
      {
        id: 'perspective',
        label: 'LONG-TERM PERSPECTIVE',
        body: 'The system explores how better planning can reduce unnecessary cognitive and operational friction by connecting information that would otherwise remain fragmented across different tools.',
      },
    ],
    takeaway:
      "A useful system doesn't simply store information. It should help transform information into decisions.",
    takeawayLabel: 'LESSONS',
  },
  {
    id: 'climatify',
    slug: 'climatify',
    index: '03',
    title: 'Climatify',
    description: 'Digital communication, events, and sustainability-focused experiences.',
    meta: [
      { label: 'ROLE', value: 'COMMUNICATION & EVENTS' },
      { label: 'AREA', value: 'SUSTAINABILITY' },
    ],
    sample: false,
    stages: [
      {
        id: 'context',
        label: 'CONTEXT',
        body: 'Climatify works around climate and sustainability education, communication, and youth engagement.',
      },
      {
        id: 'role',
        label: 'MY ROLE',
        body: 'I contributed to communication and event-related work within the Climatify environment.',
      },
      {
        id: 'approach',
        label: 'APPROACH',
        body: 'The focus was on making information easier to communicate, organize, and act upon across digital touchpoints.',
      },
      {
        id: 'execution',
        label: 'EXECUTION',
        body: 'Work included communication around events, participant coordination, and digital presence.',
      },
      {
        id: 'outcome',
        label: 'OUTCOME',
        body: 'Practical experience working within a real organization and communicating with an audience around sustainability-focused initiatives.',
      },
    ],
    takeaway:
      "Strategy doesn't exist separately from communication. The system only works when people can understand it and move through it.",
    takeawayLabel: 'LESSONS',
  },
];

export function getProjectBySlug(slug: string | undefined): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string | undefined): Project {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
