import type { BuildStage, ProjectFlow } from '../types';

/* ============================================================================
   EDIT THIS FILE TO CHANGE THE BUILD LOGIC SYSTEM (Thinking page)

   - buildStages   → the six interactive stages (statement, questions, output,
                     lens = the long-term questions asked inside that stage)
   - projectFlows  → how the same framework appears across existing work
   - loopQuote     → the closing line under THE LOOP

   Stage 03, 04 and 06 carry a "lens" — the long-term / sustainability
   questions. Leave it out of a stage to keep that stage clean.
   ============================================================================ */

export const buildStages: BuildStage[] = [
  {
    index: '01',
    label: 'UNDERSTAND',
    statement: 'Before building anything, I need to understand what is actually happening.',
    premise: 'What is actually happening?',
    questions: [
      'What is the real problem?',
      'Who is experiencing it?',
      'What already exists?',
      'Where is the friction?',
    ],
    output: 'A REAL PROBLEM — NOT A SYMPTOM',
  },
  {
    index: '02',
    label: 'FRAME',
    statement: 'Turn a messy problem into a problem that can actually be worked on.',
    premise: 'What are we really trying to solve?',
    questions: [
      'What are we really trying to solve?',
      'What is inside the problem?',
      'What is outside it?',
      'What constraints matter?',
    ],
    output: 'A PROBLEM THAT CAN BE WORKED ON',
  },
  {
    index: '03',
    label: 'STRUCTURE',
    statement: 'Find the relationships between the parts.',
    premise: 'How do the parts affect each other?',
    questions: [
      'How do the parts affect each other?',
      'Where does information move?',
      'Where does friction appear?',
      'What should the system make easier?',
    ],
    output: 'A MAP OF PARTS, FLOWS, AND FRICTION',
    lens: ['Can this reduce unnecessary friction?', 'What behavior does it encourage?'],
  },
  {
    index: '04',
    label: 'BUILD',
    statement: 'Turn the structure into something usable.',
    premise: 'What should exist?',
    questions: [
      'What needs to exist?',
      'What is the simplest useful version?',
      'What should technology handle?',
      'What should remain human?',
    ],
    output: 'THE SIMPLEST USEFUL VERSION',
    lens: ['What resources does it consume?', 'Can it be maintained and improved?'],
  },
  {
    index: '05',
    label: 'TEST',
    statement: 'Put the system against reality.',
    premise: 'Does it work in reality?',
    questions: [
      'Does it actually work?',
      'Where does it break?',
      'What creates friction?',
      'What assumptions were wrong?',
    ],
    output: 'EVIDENCE — WHERE IT WORKS, WHERE IT BREAKS',
  },
  {
    index: '06',
    label: 'LEARN',
    statement: 'Keep what works. Change what doesn’t.',
    premise: 'What should change next?',
    questions: [
      'What did reality teach us?',
      'What should change?',
      'What should be repeated?',
      'What should become part of the next iteration?',
    ],
    output: 'WHAT TO KEEP, CHANGE, AND REPEAT',
    lens: ['Can this system remain useful over time?'],
  },
];

/** The same framework as it appears in existing work — nothing invented here. */
export const projectFlows: ProjectFlow[] = [
  {
    slug: 'namaa',
    stages: ['UNDERSTAND', 'FRAME', 'STRUCTURE', 'BUILD', 'TEST', 'LEARN'],
  },
  {
    slug: 'study-os',
    stages: ['UNDERSTAND', 'FRAME', 'STRUCTURE', 'BUILD', 'TEST', 'LEARN'],
  },
  {
    slug: 'climatify',
    stages: ['UNDERSTAND', 'FRAME', 'STRUCTURE', 'COMMUNICATE', 'LEARN'],
  },
];

/** Closing line under THE LOOP */
export const loopQuote =
  'I don’t believe good systems are finished. They become clearer through use.';
