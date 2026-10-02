# LOFTY — Portfolio Website

The personal website for **Lofty — Marketing Strategy × Systems**
(the practice of Mohamed Lotfy).

You do **not** need to be a programmer to run it or to update its content.
Everything you might want to change lives in simple text files inside the
`src/data` folder.

---

## 1. How to start the website

You only need two things installed on your computer: **Node.js**
(https://nodejs.org — download the LTS version) and a code editor such as
**VS Code** (https://code.visualstudio.com).

Then open a terminal (on Windows: search for "PowerShell") in this folder and
type:

```
npm install
npm run dev
```

- `npm install` only needs to be run once (or after dependencies change).
- `npm run dev` starts the website. The terminal will show an address like
  `http://localhost:5173` — copy it into your browser.
- To stop the website, press `Ctrl + C` in the terminal.

## 2. How to build it (make the final version for publishing)

```
npm run build
```

This creates a `dist` folder. That folder is the finished website — upload it
to your hosting provider (see section 8).

Before publishing, it is good practice to also run:

```
npm run typecheck
npm run lint
```

Both should finish without errors.

---

## 3. How to change your email address

1. Open the file `src/data/site.ts`.
2. Find the `contact` section and this line:
   `email: 'mohamedfuturemaker@gmail.com',`
3. Change it to your real email address.
4. If the `isPlaceholder` line below it says `true`, change it to `false` —
   this removes the "placeholder" note from the contact page.
5. Save the file. The website updates instantly while it is running.

## 4. How to add a project (case study)

1. Open `src/data/projects.ts`.
2. Copy one of the existing projects — start at `{` and end at `},` — and paste
   it directly below.
3. Change the details:
   - `slug` — the web address of the page (`/work/your-slug`). Use only
     letters, numbers, and hyphens.
   - `title` — the project name.
   - `description` — one short paragraph.
   - `meta` — role, year, client, etc.
   - `sample` — write `true` if the case study is illustrative, `false` if it
     is real and verified.
   - `stages` — the case-study steps, in this order (use only the ones the
     project supports):
     `context`, `problem`, `role`, `objective`, `approach`, `strategy`,
     `system`, `execution`, `interface`, `perspective`, `outcome`.
     If you do not have the text yet, keep `null` — the page will show
     "Detailed project information coming soon."
   - `takeaway` — the key lesson, or `null` for the same placeholder.
   - `takeawayLabel` — the heading above the takeaway (optional, e.g.
     `LESSONS`). It shows "KEY TAKEAWAY" when you leave it out.
4. Save. The new project appears on the Work page automatically, and the
   previous project links to it as "Next project".

## 5. How to add a system

1. Open `src/data/systems.ts`.
2. Copy an existing system block and paste it below.
3. Edit its details:
   - `tag` — the category, e.g. `PLANNING`.
   - `title` and `description`.
   - `problem`, `flow`, `tools`, `status` — optional. Leave them `null` (or
     `flow: []`) and those detail blocks are simply hidden.
4. Save. It appears on the Systems page automatically (the first three also
   appear on the homepage).

## 6. How to change social links (and availability)

Open `src/data/site.ts` and find the `contact` section.

To make a social label an actual link, give it a URL:

```
socials: [
  { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/your-name' },
],
```

A `href: null` shows the label without a link (a placeholder until the real
URL exists).

To show an availability line on the contact page, change:

```
availability: null,
```

to:

```
availability: 'OPEN TO SELECTED PROJECTS',
```

## 7. Other content you may want to change

| What you want to change | File |
| --- | --- |
| Headline sentence, intro copy, navigation labels, footer | `src/data/site.ts` |
| Projects / case studies | `src/data/projects.ts` |
| Systems | `src/data/systems.ts` |
| The pull-quote and selected topics (Thinking page) | `src/data/thinking.ts` |
| The PLAN → BUILD → RUN → LEARN stages | `src/data/process.ts` |
| About page: name, role, body, facts, work spans, approach — and the "What is Lofty?" home section | `src/data/about.ts` |
| Articles / notes (Thinking page) | `src/data/articles.ts` |

Articles: notes live in `src/data/articles.ts`. The file contains a ready-made
template — copy it, fill it in, and your article appears on the Thinking page
with its own address (`/thinking/your-slug`). The first note published is
"Sustainability" (`/thinking/designing-systems-with-sustainability-in-mind`).
Besides the opening paragraphs (`body`), an article can use ordered `blocks`
for section headings, extra paragraphs, and bullet lists.

## 8. How to deploy it

Run `npm run build`, then publish the contents of the `dist` folder.

- **Netlify** — drag the `dist` folder onto https://app.netlify.com/drop.
  (The file `public/_redirects` already handles page addresses.)
- **Vercel** — import the project; `vercel.json` is already configured.
- Any other host — upload `dist` and make sure unknown addresses fall back to
  `index.html` (this is an SPA "rewrite" rule).

Before going live, replace the placeholder domain `https://example.com/` in
`index.html`, `src/hooks/usePageMeta.ts`, `public/robots.txt`, and
`public/sitemap.xml` with your real domain.

---

## Project structure (for reference)

```
src/
  data/        ← all website text lives here (edit these first)
  pages/       ← one file per page (home, work, systems, thinking, about, contact)
  components/  ← reusable pieces (navigation, project cards, diagrams)
  hooks/       ← behaviour (theme, animations, page metadata)
  styles/      ← design tokens and global styles
```
