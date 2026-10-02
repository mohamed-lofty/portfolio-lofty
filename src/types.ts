export interface NavLink {
  /** used for active-state matching */
  id: string;
  label: string;
  /** route path */
  to: string;
}

export interface ProcessStage {
  index: string;
  label: string;
  output: string;
}

export interface MetaItem {
  label: string;
  value: string;
}

export type StageId =
  | 'context'
  | 'problem'
  | 'role'
  | 'objective'
  | 'approach'
  | 'strategy'
  | 'system'
  | 'execution'
  | 'interface'
  | 'perspective'
  | 'outcome';

export interface ProjectStage {
  id: StageId;
  label: string;
  /** null renders an elegant "coming soon" placeholder instead of invented copy */
  body: string | null;
}

export interface Project {
  id: string;
  slug: string;
  index: string;
  title: string;
  description: string;
  meta: MetaItem[];
  /** true when the source material marks this case study as sample/placeholder data */
  sample: boolean;
  stages: ProjectStage[];
  /** key takeaway — null renders a placeholder */
  takeaway: string | null;
  /** heading for the takeaway section — defaults to "KEY TAKEAWAY" */
  takeawayLabel?: string;
}

export type SchematicKind = 'dashboard' | 'document' | 'app';

export interface SystemItem {
  id: string;
  /** reserved for future system detail pages: /systems/<slug> */
  slug: string;
  index: string;
  tag: string;
  title: string;
  description: string;
  schematic: SchematicKind;
  /** the problem this system solves */
  problem: string | null;
  /** conceptual flow, left → right */
  flow: string[];
  /** known tools only — null renders a placeholder */
  tools: string[] | null;
  /** null renders an editable placeholder */
  status: string | null;
}

export interface Principle {
  index: string;
  /** EDIT THIS: optional headline for the entry (shown bold above the text) */
  title?: string;
  text: string;
  /** EDIT THIS: optional slug — links the topic to a Thinking article */
  slug?: string;
}

/** One stage of the six-stage strategic build system on the Thinking page. */
export interface BuildStage {
  index: string;
  label: string;
  /** what this stage is for */
  statement: string;
  /** the single question the stage rests on */
  premise: string;
  /** the questions asked inside the stage */
  questions: string[];
  /** what the stage produces */
  output: string;
  /** long-term questions asked inside the stage (structure / build / learn) */
  lens?: string[];
}

/** How one project moves through the framework. */
export interface ProjectFlow {
  /** project slug — resolved against the work data */
  slug: string;
  stages: string[];
}

export interface Fact {
  label: string;
  value: string;
}

/** One ordered piece of an article body — keeps longer notes structured. */
export type ArticleBlock =
  | { kind: 'heading'; text: string }
  | { kind: 'paragraph'; text: string }
  | { kind: 'list'; items: string[] };

export interface Article {
  slug: string;
  title: string;
  /** standfirst under the title + in the Thinking list */
  excerpt: string;
  /** search-engine description — falls back to the excerpt when omitted */
  description?: string;
  date: string;
  tags: string[];
  /** opening paragraphs */
  body: string[];
  /** optional ordered blocks rendered after the body (headings, paragraphs, lists) */
  blocks?: ArticleBlock[];
}

export interface SocialLink {
  label: string;
  /** EDIT THIS: the real profile URL, or null to show the label without a link */
  href: string | null;
}
