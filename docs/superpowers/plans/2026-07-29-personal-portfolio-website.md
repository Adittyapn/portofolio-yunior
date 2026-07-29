# Personal Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the single-page, dark-mode-default premium portfolio described in `docs/superpowers/specs/2026-07-29-personal-portfolio-website-design.md` — Hero through Footer, wired to real resume-derived content, styled Apple/Linear-premium with Framer Motion + React Bits animation.

**Architecture:** One scrolling `app/page.tsx` composed of section components (`components/sections/*`), all content sourced from a single typed `lib/content.ts`, shared Framer Motion variants in `lib/motion.ts`, case studies opening inline via a shadcn `Dialog`.

**Tech Stack:** Next.js 16.2.12 (App Router), React 19.2.4, TypeScript 5, Tailwind CSS v4, shadcn/ui (base: `@base-ui/react`), `motion` (Framer Motion successor, already installed), React Bits (`@react-bits` shadcn registry), lucide-react icons.

## Global Constraints

- Node is v24.15.0 — supports native TypeScript type-stripping, so `node --test some.test.ts` runs directly with zero extra dependencies (used for the one real test in this plan).
- This shadcn install uses **`@base-ui/react`, not Radix** — `components/ui/button.tsx` has **no `asChild` prop** (Base UI uses a different polymorphic API). Every "link styled as a button" in this plan uses the exported `buttonVariants()` cva helper directly on an `<a>`, never `asChild`.
- Tailwind v4 config lives in `app/globals.css` via `@theme inline` — there is no `tailwind.config.js`. New design tokens are added there.
- Dark mode is the **only** mode (no toggle, per spec's out-of-scope). It's applied by hardcoding the `dark` class on `<html>` in `app/layout.tsx` — no `next-themes`, no client-side toggle logic.
- Brand colors from the spec: `#6C4CF1` (violet), `#9B7BFF` (lilac), `#111111` (bg), `#FFFFFF` (fg). Wired as CSS vars `--brand-violet` / `--brand-lilac` and exposed as Tailwind utilities `bg-brand-violet`, `text-brand-lilac`, etc.
- Fonts: Inter as `--font-sans` (body), Manrope as `--font-heading` (headings), both via `next/font/google`.
- React Bits components are installed with `npx shadcn@latest add @react-bits/<Name>-TS-TW`. **Every React Bits file ships without a `"use client"` directive even though it uses hooks** — confirmed on `BlurText`, `Aurora`, `CountUp`, `SpotlightCard`. Add the directive as the first line immediately after installing, every time.
- The CLI flattens single-file registry components (confirmed: `BlurText-TS-TW` installed to `components/BlurText.tsx`, not `components/BlurText/BlurText.tsx`). Expect the same flat path for `Aurora`, `CountUp`, `SpotlightCard`; the install command's own console output confirms the exact path it wrote — check it before writing the import.
- Testing scope is intentionally limited to `lib/content.test.ts` (the spec's approved self-check on data integrity). Component tasks verify via `npx tsc --noEmit` plus a manual dev-server visual check — not unit tests. This is a deliberate, spec-approved scope decision, not a shortcut being taken silently.
- Single page, anchor-scroll navigation only (`href="#projects"` etc.) — no client-side routing, no separate project pages.
- Contact is mailto + LinkedIn only — no form, no backend, no email service.
- All copy lives only in `lib/content.ts`. No component hardcodes resume content inline.

---

### Task 1: Content data foundation + self-check

**Files:**
- Create: `lib/types.ts`
- Create: `lib/content.ts`
- Create: `lib/content.test.ts`
- Modify: `package.json` (add `test:content` script)

**Interfaces:**
- Produces: `ExperienceEntry`, `ProjectCaseStudy`, `SkillCategory`, `Achievement`, `Certification` types (`lib/types.ts`); `hero`, `about`, `experience`, `projects`, `skillCategories`, `achievements`, `certifications`, `testimonialsPlaceholderCount`, `contact` constants (`lib/content.ts`) — every later task imports from here.

- [ ] **Step 1: Create `lib/types.ts`**

```ts
export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  summary: string;
  skills: string[];
};

export type ProjectCaseStudy = {
  slug: string;
  title: string;
  company: string;
  period: string;
  problem: string;
  goal: string;
  strategy: string;
  execution: string;
  results: string;
  lessons: string;
  tags: string[];
};

export type SkillCategory = {
  name: string;
  skills: { name: string; level: number }[];
};

export type Achievement = {
  label: string;
  description: string;
  countTo?: number;
  countSuffix?: string;
};

export type Certification = {
  name: string;
  date: string;
};
```

- [ ] **Step 2: Write the failing test — `lib/content.test.ts`**

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { projects, skillCategories } from "./content.ts";

test("every project case study has non-empty case-study fields", () => {
  const fields = ["problem", "goal", "strategy", "execution", "results", "lessons"] as const;
  for (const project of projects) {
    for (const field of fields) {
      assert.ok(project[field].trim().length > 0, `${project.slug} is missing ${field}`);
    }
  }
});

test("project slugs are unique", () => {
  const slugs = projects.map((p) => p.slug);
  assert.equal(new Set(slugs).size, slugs.length, "duplicate project slug found");
});

test("skill levels are within 0-100", () => {
  for (const category of skillCategories) {
    for (const skill of category.skills) {
      assert.ok(
        skill.level >= 0 && skill.level <= 100,
        `${category.name} - ${skill.name} level out of range`
      );
    }
  }
});
```

- [ ] **Step 3: Run the test and confirm it fails**

Run: `node --test lib/content.test.ts`
Expected: FAIL — `Cannot find module './content.ts'`

- [ ] **Step 4: Create `lib/content.ts` with the full approved content**

```ts
import type {
  ExperienceEntry,
  ProjectCaseStudy,
  SkillCategory,
  Achievement,
  Certification,
} from "./types.ts";

export const hero = {
  name: "Yunior Prassetia Putra",
  title: "Social Media Specialist & Digital Marketing Strategist",
  headline: "I Turn Scrolls Into Growth — One Story-Driven Campaign at a Time.",
  subtext:
    "I plan, create, and optimize content that turns casual scrollers into engaged audiences — blending data-driven strategy with storytelling across Instagram, TikTok, and beyond.",
  primaryCta: { label: "Say Hello", href: "mailto:yuniorprassetia2@gmail.com" },
  secondaryCta: { label: "View My Work", href: "#projects" },
  socials: {
    linkedin: "https://www.linkedin.com/in/yuniorprassetia/",
    email: "yuniorprassetia2@gmail.com",
  },
};

export const about = {
  paragraphs: [
    "I'm Yunior — a Bandung-based digital marketer who's spent the last few years learning one thing: attention is earned, not assumed.",
    "My path started in a classroom studying digital marketing at Telkom University, but it took shape in the field — writing SEO-friendly articles for environmental campaigns, planning content calendars inside an advertising agency, and turning raw footage into scroll-stopping short-form videos for food creators on Instagram and TikTok. Along the way, I helped a national brand like Honda hit 43,000+ organic content views in three months, without paid boosts — just strategy and consistency.",
    "What pulls me toward this work is the mix of data and storytelling — the moment a post's numbers tell you exactly what a caption or hook is doing right. That curiosity took me outside marketing too: I led project coordination for a motorcycle-engine generator innovation project with Institut Teknologi Bandung and ParagonCorp, managing timelines and cross-functional teams from concept to exhibition.",
    "Whether I'm optimizing a caption or coordinating an engineering team, the throughline is the same: I care about the details that make people stop, notice, and stay.",
  ],
};

export const experience: ExperienceEntry[] = [
  {
    company: "Halma Advertisa",
    role: "Social Media Specialist Intern",
    period: "Feb 2026 – May 2026",
    summary:
      "Owned content planning and scheduling for client social accounts, translating brand identity into scroll-worthy Instagram and TikTok content. Tracked engagement and reach to keep campaigns aligned with what audiences actually responded to.",
    skills: ["Content Planning", "Instagram", "TikTok", "Analytics", "Campaign Execution"],
  },
  {
    company: "Digital Marketing & SEO Support Internship",
    role: "Intern",
    period: "Jan 2025 – May 2025",
    summary:
      "Rebuilt article structures around real keyword research to lift organic visibility, while running Instagram content for environmental awareness campaigns — proving sustainability content can be both educational and genuinely engaging.",
    skills: ["SEO", "Keyword Research", "Instagram", "Content Development"],
  },
  {
    company: "Honda",
    role: "Digital Marketing",
    period: "Nov 2025 – Dec 2025",
    summary:
      "Owned organic content strategy for brand-awareness campaigns, driving 43,000+ content views in three months and turning that visibility into real customer conversions — all without paid media.",
    skills: ["Content Strategy", "Organic Growth", "Conversion-Focused Content", "Analytics"],
  },
  {
    company: "Food Review Content Creator (Freelance)",
    role: "Content Editor",
    period: "Dec 2025 – Present",
    summary:
      "Edits and restructures short-form food review content across multiple Instagram and TikTok accounts, sharpening hooks and pacing to grow watch time. Organic follower growth followed as a direct result of tighter storytelling and consistent posting cadence.",
    skills: ["Video Editing", "Short-Form Storytelling", "Hashtag Strategy", "CapCut"],
  },
  {
    company: "Telkom University",
    role: "Practicum Assistant, Marketing Management",
    period: "Jan 2024 – Jun 2024",
    summary:
      "Supported lecturers in running marketing management practicums, guiding students through real case-study discussions and evaluating strategy presentations — an early proving ground for breaking down marketing concepts clearly.",
    skills: ["Marketing Strategy", "Teaching Support", "Case Study Analysis"],
  },
  {
    company: "Motorcycle Engine Generator Innovation Project (ITB & ParagonCorp)",
    role: "Project Manager",
    period: "Sep 2025 – May 2026",
    summary:
      "Led coordination for a motorcycle-engine-based power generator built for innovation exhibition, bridging final-year ITB engineering students, technical teams, and Paragon as an external partner. Owned the ECU-related workstream, task delegation, and timeline — carrying the project from concept to the exhibition floor.",
    skills: [
      "Project Management",
      "Cross-functional Coordination",
      "Timeline Ownership",
      "Stakeholder Management",
    ],
  },
];

export const projects: ProjectCaseStudy[] = [
  {
    slug: "honda-organic-growth",
    title: "Honda — Organic Growth Without Ad Spend",
    company: "Honda",
    period: "Nov 2025 – Dec 2025",
    problem:
      "Brand-awareness content wasn't cutting through organic feeds, and marketing needed proof that reach could grow without leaning on paid promotion.",
    goal: "Build an organic content strategy that increased visibility and pushed viewers toward real conversions within a short campaign window.",
    strategy:
      "Focused content around what audiences already engaged with, prioritized consistency over volume, and used performance data to double down on formats that worked.",
    execution:
      "Planned, published, and iterated on organic content over a 3-month sprint, adjusting weekly based on engagement and reach trends.",
    results:
      "43,000+ content views generated organically in 3 months, with measurable customer conversions tied directly to the content.",
    lessons:
      "Consistency and audience-behavior analysis can outperform ad spend when the content actually earns attention.",
    tags: ["Organic Strategy", "Content Optimization", "Conversion"],
  },
  {
    slug: "freelance-food-content",
    title: "Freelance Food Content — Editing for Watch Time",
    company: "Food Review Content Creator (Freelance)",
    period: "Dec 2025 – Present",
    problem:
      "Food review accounts were producing content, but weak hooks and pacing meant viewers dropped off before the payoff.",
    goal: "Increase watch time and organic follower growth across multiple accounts through better editing, not more content.",
    strategy:
      "Rebuilt each video around a stronger opening hook, tightened pacing for short-form attention spans, and tailored captions and hashtags to each platform's audience.",
    execution:
      "Ongoing editing and format iteration across multiple Instagram and TikTok accounts using CapCut, testing hook styles against retention.",
    results:
      "Measurable organic follower growth across managed accounts, driven directly by stronger storytelling and consistent posting.",
    lessons: "The first three seconds decide everything — editing is strategy, not just polish.",
    tags: ["Video Editing", "Short-Form Content", "Storytelling"],
  },
  {
    slug: "motorcycle-generator-project",
    title: "Motorcycle Engine Generator — Leading Outside Marketing",
    company: "ITB × ParagonCorp Collaboration",
    period: "Sep 2025 – May 2026",
    problem:
      "A student-industry innovation project needed someone to hold together engineering timelines, cross-team communication, and exhibition deadlines — a role outside typical marketing work.",
    goal: "Deliver a working motorcycle-engine-based power generator, exhibition-ready, on schedule and with all collaborators aligned.",
    strategy:
      "Split ownership between technical development (ECU and generator integration) and coordination (task delegation, timeline tracking, partner communication with ITB and Paragon).",
    execution:
      "Managed the project from development through exhibition prep, working directly with final-year ITB engineering students and Paragon as an external collaborator.",
    results:
      "Delivered a functioning, exhibition-ready generator system on schedule, with all cross-functional teams aligned through to launch.",
    lessons:
      "The same skills that run a content calendar — timelines, communication, prioritization — scale to leading technical teams outside your home field.",
    tags: ["Project Management", "Cross-functional Leadership", "Innovation"],
  },
  {
    slug: "seo-digital-marketing-internship",
    title: "SEO & Digital Marketing Internship — Turning Articles Into Traffic",
    company: "Digital Marketing & SEO Support Internship",
    period: "Jan 2025 – May 2025",
    problem:
      "Website content wasn't structured to rank, and environmental campaign messaging needed a wider reach than organic search alone was providing.",
    goal: "Improve organic visibility of website articles while growing engagement on environmental awareness campaigns via social.",
    strategy:
      "Paired real keyword research with SEO-friendly article structuring, and ran a parallel Instagram content push to extend campaign reach beyond search.",
    execution:
      "Rebuilt article structures around researched keywords, published SEO-optimized content, and scheduled Instagram content aligned with campaign themes.",
    results:
      "Increased engagement and impressions across managed content, with stronger organic visibility for optimized articles.",
    lessons:
      "SEO and social aren't separate channels — they compound when the content strategy treats them as one system.",
    tags: ["SEO", "Content Strategy", "Campaign Support"],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    name: "Digital Marketing",
    skills: [
      { name: "Meta Ads", level: 70 },
      { name: "Campaign Execution", level: 80 },
      { name: "Brand Awareness Strategy", level: 85 },
    ],
  },
  {
    name: "SEO",
    skills: [
      { name: "SEO Basics", level: 65 },
      { name: "Keyword Research", level: 70 },
      { name: "SEO Content Structuring", level: 70 },
    ],
  },
  {
    name: "Social Media",
    skills: [
      { name: "Social Media Management", level: 90 },
      { name: "Instagram & TikTok Management", level: 90 },
      { name: "Content Scheduling", level: 85 },
    ],
  },
  {
    name: "Content Strategy",
    skills: [
      { name: "Content Planning", level: 88 },
      { name: "Content Editing", level: 85 },
      { name: "Copywriting", level: 80 },
    ],
  },
  {
    name: "Analytics",
    skills: [
      { name: "Social Media Analytics", level: 80 },
      { name: "Google Analytics", level: 65 },
      { name: "Performance Reporting", level: 75 },
    ],
  },
  {
    name: "Project Management",
    skills: [
      { name: "Project Management", level: 85 },
      { name: "Cross-functional Coordination", level: 85 },
      { name: "Timeline Management", level: 80 },
    ],
  },
  {
    name: "Tools",
    skills: [
      { name: "Canva", level: 90 },
      { name: "CapCut", level: 90 },
      { name: "Figma", level: 70 },
      { name: "Mailchimp", level: 60 },
      { name: "WordPress", level: 65 },
      { name: "Meta Ads Manager", level: 65 },
    ],
  },
  {
    name: "Soft Skills",
    skills: [
      { name: "Communication", level: 90 },
      { name: "Team Collaboration", level: 90 },
      { name: "Creative Thinking", level: 88 },
      { name: "Time Management", level: 85 },
      { name: "Problem Solving", level: 82 },
    ],
  },
];

export const achievements: Achievement[] = [
  {
    label: "Organic Content Views (3 Months)",
    description: "Generated for Honda's brand-awareness campaign — zero paid boosts.",
    countTo: 43000,
    countSuffix: "+",
  },
  {
    label: "Organic Follower Growth",
    description:
      "Driven through sharper editing and storytelling across managed food-content accounts.",
  },
  {
    label: "Higher Organic Visibility",
    description:
      "Increased engagement and impressions through SEO-optimized articles and campaign content.",
  },
  {
    label: "Cross-Functional Leadership",
    description:
      "Led a motorcycle-engine generator innovation project from concept to exhibition with ITB and ParagonCorp.",
  },
];

export const certifications: Certification[] = [
  { name: "Lensetek AI-Driven Digital Marketing Certification", date: "May 2025" },
  { name: "Social Media Officer Intern Certification", date: "April 2026" },
];

export const testimonialsPlaceholderCount = 3;

export const contact = {
  heading: "Let's Build Something Great Together.",
  subtext:
    "Have a brand that needs a stronger digital presence, or a project that needs someone who can turn strategy into content people actually stop for? I'd love to hear about it.",
  email: "yuniorprassetia2@gmail.com",
  linkedin: "https://www.linkedin.com/in/yuniorprassetia/",
  location: "Bandung, Indonesia",
};
```

- [ ] **Step 5: Run the test and confirm it passes**

Run: `node --test lib/content.test.ts`
Expected: PASS — 3 tests passing

- [ ] **Step 6: Add a convenience script to `package.json`**

In the `"scripts"` object, add:

```json
"test:content": "node --test lib/content.test.ts"
```

- [ ] **Step 7: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 8: Commit**

```bash
git add lib/types.ts lib/content.ts lib/content.test.ts package.json
git commit -m "feat: add typed portfolio content with data-integrity check"
```

---

### Task 2: Global layout — fonts, dark theme, Aurora background, shared motion variants

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Create: `lib/motion.ts`
- Create: `components/BackgroundAurora.tsx`
- Install: React Bits `Aurora`

**Interfaces:**
- Produces: `fadeInUp`, `scrollReveal`, `staggerContainer` motion variants (`lib/motion.ts`); Tailwind utilities `bg-brand-violet`/`text-brand-lilac`/etc. and `font-heading`; `<BackgroundAurora />` mounted globally in the root layout (no section needs to import it itself).

- [ ] **Step 1: Install the Aurora background component**

Run: `npx shadcn@latest add @react-bits/Aurora-TS-TW`

Note the exact path the CLI prints (expected: `components/Aurora.tsx`, matching the `BlurText` install pattern).

- [ ] **Step 2: Add `"use client"` to the installed Aurora file**

Open the file the CLI just created and add as the very first line:

```ts
"use client";

```

- [ ] **Step 3: Update `app/globals.css` — brand color tokens**

In the `@theme inline` block, after the `--color-primary: var(--primary);` line, add:

```css
  --color-brand-violet: var(--brand-violet);
  --color-brand-lilac: var(--brand-lilac);
```

Change the existing line:

```css
  --font-heading: var(--font-sans);
```

to:

```css
  --font-heading: var(--font-heading);
```

- [ ] **Step 4: Update `app/globals.css` — dark theme colors**

In the `.dark { ... }` block, replace:

```css
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
```

with:

```css
  --background: #111111;
  --foreground: #ffffff;
```

Replace:

```css
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
```

with:

```css
  --primary: #6c4cf1;
  --primary-foreground: #ffffff;
```

Replace:

```css
  --ring: oklch(0.556 0 0);
```

with:

```css
  --ring: #9b7bff;
```

Add these two new lines at the end of the `.dark { ... }` block, just before its closing `}`:

```css
  --brand-violet: #6c4cf1;
  --brand-lilac: #9b7bff;
```

- [ ] **Step 5: Update `app/globals.css` — headings, smooth scroll, reduced motion**

In the existing `@layer base { ... }` block, add inside it (after the existing `html { @apply font-sans; }` rule):

```css
  h1,
  h2,
  h3,
  h4 {
    @apply font-heading;
  }
  html {
    scroll-behavior: smooth;
  }
```

After the closing `}` of `@layer base`, add a new top-level rule:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 6: Create `lib/motion.ts`**

```ts
import type { Variants } from "motion/react";

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const scrollReveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
```

- [ ] **Step 7: Create `components/BackgroundAurora.tsx`**

```tsx
"use client";

import Aurora from "@/components/Aurora";

export function BackgroundAurora() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 h-screen w-full opacity-60">
      <Aurora colorStops={["#6C4CF1", "#9B7BFF", "#111111"]} amplitude={0.9} blend={0.5} />
    </div>
  );
}
```

(If Step 1 installed Aurora to a different path than `components/Aurora.tsx`, update the import above to match.)

- [ ] **Step 8: Rewrite `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { BackgroundAurora } from "@/components/BackgroundAurora";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yunior Prassetia Putra — Social Media Specialist & Digital Marketing Strategist",
  description:
    "I plan, create, and optimize content that turns casual scrollers into engaged audiences — blending data-driven strategy with storytelling across Instagram, TikTok, and beyond.",
  openGraph: {
    title: "Yunior Prassetia Putra — Social Media Specialist & Digital Marketing Strategist",
    description:
      "I plan, create, and optimize content that turns casual scrollers into engaged audiences.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col bg-background text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <BackgroundAurora />
        <div id="main-content" className="relative z-10 flex flex-1 flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
```

- [ ] **Step 9: Type-check and visually verify**

Run: `npx tsc --noEmit` — expect no errors.

Run: `npm run dev`, open the site. Confirm: background is near-black (`#111111`) with a moving purple/violet aurora glow behind the (still-default) page content, page text renders in a humanist sans body font (Inter) once fonts load, and pressing Tab once from a fresh page load reveals a "Skip to content" pill in the top-left.

- [ ] **Step 10: Commit**

```bash
git add app/globals.css app/layout.tsx lib/motion.ts components/BackgroundAurora.tsx components/Aurora.tsx package.json package-lock.json
git commit -m "feat: apply dark brand theme, fonts, and animated aurora background"
```

---

### Task 3: Hero section

**Files:**
- Create: `components/sections/Hero.tsx`
- Modify: `app/page.tsx`
- Delete: `public/next.svg`, `public/vercel.svg`, `public/globe.svg`, `public/window.svg`, `public/file.svg`

**Interfaces:**
- Consumes: `hero` from `lib/content` (Task 1); `fadeInUp`, `staggerContainer` from `lib/motion` (Task 2); `BlurText` (`components/BlurText.tsx`, pre-existing); `buttonVariants` from `components/ui/button` (pre-existing).
- Produces: `<Hero />`, rendered first in `app/page.tsx`.

- [ ] **Step 1: Create `components/sections/Hero.tsx`**

```tsx
"use client";

import { motion } from "motion/react";
import { Mail, Linkedin, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import BlurText from "@/components/BlurText";
import { hero } from "@/lib/content";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export function Hero() {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="mx-auto flex min-h-screen w-full max-w-5xl flex-col-reverse items-center justify-center gap-12 px-6 py-24 sm:flex-row sm:justify-between"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="flex max-w-2xl flex-col items-center gap-6 text-center sm:items-start sm:text-left"
      >
        <motion.p
          variants={fadeInUp}
          className="text-sm font-medium uppercase tracking-wide text-brand-lilac"
        >
          {hero.title}
        </motion.p>

        <div>
          <h1 className="sr-only">{hero.headline}</h1>
          <div aria-hidden="true">
            <BlurText
              text={hero.headline}
              animateBy="words"
              className="font-heading text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-6xl"
            />
          </div>
        </div>

        <motion.p variants={fadeInUp} className="max-w-xl text-lg leading-relaxed text-muted-foreground">
          {hero.subtext}
        </motion.p>

        <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-4 sm:justify-start">
          <a
            href={hero.primaryCta.href}
            className={buttonVariants({
              size: "lg",
              className: "bg-brand-violet text-white hover:bg-brand-violet/90",
            })}
          >
            {hero.primaryCta.label}
            <ArrowRight className="ml-1 size-4" />
          </a>
          <a
            href={hero.secondaryCta.href}
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            {hero.secondaryCta.label}
          </a>
        </motion.div>

        <motion.div variants={fadeInUp} className="flex items-center gap-4 pt-2 text-muted-foreground">
          <a
            href={hero.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="transition-colors hover:text-brand-lilac"
          >
            <Linkedin className="size-5" />
          </a>
          <a
            href={`mailto:${hero.socials.email}`}
            aria-label="Send an email"
            className="transition-colors hover:text-brand-lilac"
          >
            <Mail className="size-5" />
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex size-48 shrink-0 items-center justify-center rounded-4xl border border-white/10 bg-gradient-to-br from-brand-violet to-brand-lilac shadow-[0_0_80px_-20px_rgba(108,76,241,0.6)] sm:size-64"
      >
        <span className="font-heading text-5xl font-semibold text-white sm:text-6xl">YP</span>
      </motion.div>
    </section>
  );
}
```

(This gradient initials block is the placeholder profile image per the spec — swap for a real photo with `next/image` once the file is provided.)

- [ ] **Step 2: Replace `app/page.tsx` with the real composition (Hero only for now)**

```tsx
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
    </main>
  );
}
```

- [ ] **Step 3: Delete the now-unused default Next.js icon assets**

```bash
git rm public/next.svg public/vercel.svg public/globe.svg public/window.svg public/file.svg
```

- [ ] **Step 4: Type-check and visually verify**

Run: `npx tsc --noEmit` — expect no errors.

Run: `npm run dev`. Confirm the hero fills the viewport: title label, headline blur-reveals in on load, subtext, two CTA buttons ("Say Hello" filled violet, "View My Work" outlined), LinkedIn/Mail icons, and a violet-to-lilac gradient "YP" avatar block on the right (below on mobile widths).

- [ ] **Step 5: Commit**

```bash
git add components/sections/Hero.tsx app/page.tsx public
git commit -m "feat: build Hero section with animated headline and CTAs"
```

---

### Task 4: About section

**Files:**
- Create: `components/sections/About.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `about` from `lib/content`; `fadeInUp`, `staggerContainer` from `lib/motion`.
- Produces: `<About />`, rendered after `<Hero />`.

- [ ] **Step 1: Create `components/sections/About.tsx`**

```tsx
"use client";

import { motion } from "motion/react";
import { about } from "@/lib/content";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export function About() {
  return (
    <section id="about" aria-label="About me" className="mx-auto w-full max-w-3xl px-6 py-24">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          variants={fadeInUp}
          className="mb-8 font-heading text-3xl font-semibold text-foreground sm:text-4xl"
        >
          About Me
        </motion.h2>
        <div className="space-y-6">
          {about.paragraphs.map((paragraph, index) => (
            <motion.p key={index} variants={fadeInUp} className="text-lg leading-relaxed text-muted-foreground">
              {paragraph}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into `app/page.tsx`**

```tsx
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <About />
    </main>
  );
}
```

- [ ] **Step 3: Type-check and visually verify**

Run: `npx tsc --noEmit` — expect no errors.

Run: `npm run dev`, scroll past the hero. Confirm the About heading and four paragraphs fade/slide in as they enter the viewport (scroll down and back up to re-trigger by reloading — the reveal uses `once: true`, so refresh between checks).

- [ ] **Step 4: Commit**

```bash
git add components/sections/About.tsx app/page.tsx
git commit -m "feat: build About section with scroll-reveal story copy"
```

---

### Task 5: Experience Timeline section

**Files:**
- Create: `components/sections/ExperienceTimeline.tsx`
- Modify: `app/page.tsx`
- Install: shadcn `badge`

**Interfaces:**
- Consumes: `experience` from `lib/content`; `fadeInUp`, `staggerContainer` from `lib/motion`; `Badge` from `components/ui/badge` (installed this task).
- Produces: `<ExperienceTimeline />`, rendered after `<About />`.

- [ ] **Step 1: Install the Badge component**

Run: `npx shadcn@latest add badge`

- [ ] **Step 2: Create `components/sections/ExperienceTimeline.tsx`**

```tsx
"use client";

import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { experience } from "@/lib/content";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export function ExperienceTimeline() {
  return (
    <section id="experience" aria-label="Work experience" className="mx-auto w-full max-w-4xl px-6 py-24">
      <motion.h2
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mb-12 font-heading text-3xl font-semibold text-foreground sm:text-4xl"
      >
        Experience
      </motion.h2>

      <motion.ol
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="relative space-y-10 border-l border-border pl-8"
      >
        {experience.map((entry) => (
          <motion.li key={`${entry.company}-${entry.period}`} variants={fadeInUp} className="relative">
            <span className="absolute -left-[calc(2rem+5px)] top-1.5 size-2.5 rounded-full bg-brand-violet" />
            <p className="text-sm font-medium text-brand-lilac">{entry.period}</p>
            <h3 className="mt-1 font-heading text-xl font-semibold text-foreground">{entry.role}</h3>
            <p className="text-sm text-muted-foreground">{entry.company}</p>
            <p className="mt-3 leading-relaxed text-muted-foreground">{entry.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {entry.skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
}
```

- [ ] **Step 3: Wire into `app/page.tsx`**

```tsx
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <About />
      <ExperienceTimeline />
    </main>
  );
}
```

- [ ] **Step 4: Type-check and visually verify**

Run: `npx tsc --noEmit` — expect no errors.

Run: `npm run dev`, scroll to Experience. Confirm 6 timeline entries with a violet dot + left border rail, each showing period, role, company, summary paragraph, and skill badges.

- [ ] **Step 5: Commit**

```bash
git add components/sections/ExperienceTimeline.tsx app/page.tsx components/ui/badge.tsx package.json package-lock.json
git commit -m "feat: build Experience timeline section"
```

---

### Task 6: Skills section

**Files:**
- Create: `components/sections/Skills.tsx`
- Modify: `app/page.tsx`
- Install: shadcn `progress`, React Bits `SpotlightCard`

**Interfaces:**
- Consumes: `skillCategories` from `lib/content`; `fadeInUp`, `staggerContainer` from `lib/motion`; `Progress` from `components/ui/progress` (installed this task); `SpotlightCard` (installed this task).
- Produces: `<Skills />`, rendered after `<ExperienceTimeline />`; `SpotlightCard` becomes available for Task 7 too.

- [ ] **Step 1: Install Progress and SpotlightCard**

Run: `npx shadcn@latest add progress`
Run: `npx shadcn@latest add @react-bits/SpotlightCard-TS-TW`

Note the path the second command prints (expected: `components/SpotlightCard.tsx`).

- [ ] **Step 2: Add `"use client"` to the installed SpotlightCard file**

Open the file and add as the first line:

```ts
"use client";

```

- [ ] **Step 3: Create `components/sections/Skills.tsx`**

```tsx
"use client";

import { motion } from "motion/react";
import SpotlightCard from "@/components/SpotlightCard";
import { Progress } from "@/components/ui/progress";
import { skillCategories } from "@/lib/content";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export function Skills() {
  return (
    <section id="skills" aria-label="Skills" className="mx-auto w-full max-w-5xl px-6 py-24">
      <motion.h2
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mb-12 font-heading text-3xl font-semibold text-foreground sm:text-4xl"
      >
        Skills
      </motion.h2>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid gap-6 sm:grid-cols-2"
      >
        {skillCategories.map((category) => (
          <motion.div key={category.name} variants={fadeInUp}>
            <SpotlightCard spotlightColor="rgba(155, 123, 255, 0.35)" className="!border-border !bg-card h-full">
              <h3 className="mb-5 font-heading text-lg font-semibold text-foreground">{category.name}</h3>
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="text-foreground">{skill.name}</span>
                      <span className="text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-1.5" />
                  </div>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 4: Wire into `app/page.tsx`**

```tsx
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { Skills } from "@/components/sections/Skills";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <About />
      <ExperienceTimeline />
      <Skills />
    </main>
  );
}
```

- [ ] **Step 5: Type-check and visually verify**

Run: `npx tsc --noEmit` — expect no errors.

Run: `npm run dev`, scroll to Skills. Confirm 8 category cards in a 2-column grid, each with skill rows + progress bars, and moving the mouse over a card shows a soft lilac spotlight glow following the cursor.

- [ ] **Step 6: Commit**

```bash
git add components/sections/Skills.tsx app/page.tsx components/ui/progress.tsx components/SpotlightCard.tsx package.json package-lock.json
git commit -m "feat: build Skills section with spotlight cards and progress bars"
```

---

### Task 7: Featured Projects + case-study dialog

**Files:**
- Create: `components/ProjectDialog.tsx`
- Create: `components/sections/FeaturedProjects.tsx`
- Modify: `app/page.tsx`
- Install: shadcn `dialog`

**Interfaces:**
- Consumes: `projects` from `lib/content`; `ProjectCaseStudy` type from `lib/types`; `fadeInUp`, `staggerContainer` from `lib/motion`; `SpotlightCard` (Task 6); `Badge` (Task 5); `buttonVariants` (pre-existing); `Dialog`/`DialogContent`/`DialogHeader`/`DialogTitle`/`DialogDescription` from `components/ui/dialog` (installed this task).
- Produces: `<FeaturedProjects />`, rendered after `<Skills />`.

- [ ] **Step 1: Install the Dialog component**

Run: `npx shadcn@latest add dialog`

- [ ] **Step 2: Create `components/ProjectDialog.tsx`**

```tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { ProjectCaseStudy } from "@/lib/types";

const FIELDS: {
  key: "problem" | "goal" | "strategy" | "execution" | "results" | "lessons";
  label: string;
}[] = [
  { key: "problem", label: "Problem" },
  { key: "goal", label: "Goal" },
  { key: "strategy", label: "Strategy" },
  { key: "execution", label: "Execution" },
  { key: "results", label: "Results" },
  { key: "lessons", label: "Lessons Learned" },
];

export function ProjectDialog({
  project,
  open,
  onOpenChange,
}: {
  project: ProjectCaseStudy;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">{project.title}</DialogTitle>
          <DialogDescription>
            {project.company} · {project.period}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="space-y-5">
          {FIELDS.map(({ key, label }) => (
            <div key={key}>
              <h3 className="mb-1 text-sm font-semibold uppercase tracking-wide text-brand-lilac">
                {label}
              </h3>
              <p className="leading-relaxed text-muted-foreground">{project[key]}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

- [ ] **Step 3: Create `components/sections/FeaturedProjects.tsx`**

```tsx
"use client";

import { useState } from "react";
import { motion } from "motion/react";
import SpotlightCard from "@/components/SpotlightCard";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { ProjectDialog } from "@/components/ProjectDialog";
import { projects } from "@/lib/content";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import type { ProjectCaseStudy } from "@/lib/types";

export function FeaturedProjects() {
  const [activeProject, setActiveProject] = useState<ProjectCaseStudy | null>(null);

  return (
    <section id="projects" aria-label="Featured projects" className="mx-auto w-full max-w-5xl px-6 py-24">
      <motion.h2
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mb-12 font-heading text-3xl font-semibold text-foreground sm:text-4xl"
      >
        Featured Projects
      </motion.h2>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid gap-6 sm:grid-cols-2"
      >
        {projects.map((project) => (
          <motion.div key={project.slug} variants={fadeInUp}>
            <SpotlightCard
              spotlightColor="rgba(108, 76, 241, 0.4)"
              className="!border-border !bg-card flex h-full flex-col justify-between"
            >
              <div>
                <p className="text-sm text-brand-lilac">{project.company}</p>
                <h3 className="mt-1 font-heading text-xl font-semibold text-foreground">{project.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{project.results}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveProject(project)}
                className={buttonVariants({ variant: "outline", className: "mt-6 self-start" })}
              >
                Read Case Study
              </button>
            </SpotlightCard>
          </motion.div>
        ))}
      </motion.div>

      {activeProject && (
        <ProjectDialog
          project={activeProject}
          open={activeProject !== null}
          onOpenChange={(open) => {
            if (!open) setActiveProject(null);
          }}
        />
      )}
    </section>
  );
}
```

- [ ] **Step 4: Wire into `app/page.tsx`**

```tsx
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { Skills } from "@/components/sections/Skills";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <About />
      <ExperienceTimeline />
      <Skills />
      <FeaturedProjects />
    </main>
  );
}
```

- [ ] **Step 5: Type-check and visually verify**

Run: `npx tsc --noEmit` — expect no errors.

Run: `npm run dev`, scroll to Featured Projects. Confirm 4 project cards; clicking "Read Case Study" opens a dialog with all 6 case-study fields and closes on Escape or clicking outside. Also click "View My Work" in the Hero and confirm it smooth-scrolls down to this section.

- [ ] **Step 6: Commit**

```bash
git add components/ProjectDialog.tsx components/sections/FeaturedProjects.tsx app/page.tsx components/ui/dialog.tsx package.json package-lock.json
git commit -m "feat: build Featured Projects section with case-study dialog"
```

---

### Task 8: Achievements + certifications

**Files:**
- Create: `components/sections/Achievements.tsx`
- Modify: `app/page.tsx`
- Install: React Bits `CountUp`

**Interfaces:**
- Consumes: `achievements`, `certifications` from `lib/content`; `fadeInUp`, `staggerContainer` from `lib/motion`; `CountUp` (installed this task).
- Produces: `<Achievements />`, rendered after `<FeaturedProjects />`.

- [ ] **Step 1: Install CountUp**

Run: `npx shadcn@latest add @react-bits/CountUp-TS-TW`

Note the printed path (expected: `components/CountUp.tsx`).

- [ ] **Step 2: Add `"use client"` to the installed CountUp file**

Open the file and add as the first line:

```ts
"use client";

```

- [ ] **Step 3: Create `components/sections/Achievements.tsx`**

```tsx
"use client";

import { motion } from "motion/react";
import CountUp from "@/components/CountUp";
import { achievements, certifications } from "@/lib/content";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export function Achievements() {
  return (
    <section id="achievements" aria-label="Achievements" className="mx-auto w-full max-w-5xl px-6 py-24">
      <motion.h2
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mb-12 font-heading text-3xl font-semibold text-foreground sm:text-4xl"
      >
        Achievements
      </motion.h2>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid gap-6 sm:grid-cols-2"
      >
        {achievements.map((achievement) => (
          <motion.div
            key={achievement.label}
            variants={fadeInUp}
            className="rounded-3xl border border-border bg-card p-8"
          >
            {achievement.countTo !== undefined && (
              <p className="font-heading text-3xl font-semibold text-brand-lilac">
                <CountUp to={achievement.countTo} separator="," duration={2} />
                {achievement.countSuffix}
              </p>
            )}
            <p
              className={
                achievement.countTo !== undefined
                  ? "mt-1 font-heading text-lg font-semibold text-foreground"
                  : "font-heading text-lg font-semibold text-foreground"
              }
            >
              {achievement.label}
            </p>
            <p className="mt-2 leading-relaxed text-muted-foreground">{achievement.description}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mt-12 flex flex-wrap items-center gap-4 border-t border-border pt-8"
      >
        {certifications.map((certification) => (
          <div
            key={certification.name}
            className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground"
          >
            {certification.name} <span className="text-brand-lilac">· {certification.date}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 4: Wire into `app/page.tsx`**

```tsx
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { Skills } from "@/components/sections/Skills";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Achievements } from "@/components/sections/Achievements";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <About />
      <ExperienceTimeline />
      <Skills />
      <FeaturedProjects />
      <Achievements />
    </main>
  );
}
```

- [ ] **Step 5: Type-check and visually verify**

Run: `npx tsc --noEmit` — expect no errors.

Run: `npm run dev`, scroll to Achievements. Confirm 4 cards; the first animates its number counting up to 43,000+ as it scrolls into view, and the two certification pills render below.

- [ ] **Step 6: Commit**

```bash
git add components/sections/Achievements.tsx app/page.tsx components/CountUp.tsx package.json package-lock.json
git commit -m "feat: build Achievements section with animated counter and certifications"
```

---

### Task 9: Testimonials section

**Files:**
- Create: `components/sections/Testimonials.tsx`
- Modify: `app/page.tsx`
- Install: shadcn `card`

**Interfaces:**
- Consumes: `testimonialsPlaceholderCount` from `lib/content`; `fadeInUp`, `staggerContainer` from `lib/motion`; `Card`/`CardContent` from `components/ui/card` (installed this task).
- Produces: `<Testimonials />`, rendered after `<Achievements />`.

- [ ] **Step 1: Install the Card component**

Run: `npx shadcn@latest add card`

- [ ] **Step 2: Create `components/sections/Testimonials.tsx`**

```tsx
"use client";

import { motion } from "motion/react";
import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { testimonialsPlaceholderCount } from "@/lib/content";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export function Testimonials() {
  return (
    <section id="testimonials" aria-label="Testimonials" className="mx-auto w-full max-w-5xl px-6 py-24">
      <motion.h2
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mb-12 font-heading text-3xl font-semibold text-foreground sm:text-4xl"
      >
        Testimonials
      </motion.h2>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid gap-6 sm:grid-cols-3"
      >
        {Array.from({ length: testimonialsPlaceholderCount }).map((_, index) => (
          <motion.div key={index} variants={fadeInUp}>
            <Card className="h-full border-dashed border-border/60 bg-card/50">
              <CardContent className="flex h-full flex-col items-center gap-4 pt-6 text-center">
                <Quote className="size-6 text-brand-lilac/60" />
                <p className="text-sm text-muted-foreground">Testimonial coming soon.</p>
                <div className="h-px w-12 bg-border" />
                <p className="text-xs text-muted-foreground/60">— Name, Role, Company</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 3: Wire into `app/page.tsx`**

```tsx
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { Skills } from "@/components/sections/Skills";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Achievements } from "@/components/sections/Achievements";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <About />
      <ExperienceTimeline />
      <Skills />
      <FeaturedProjects />
      <Achievements />
      <Testimonials />
    </main>
  );
}
```

- [ ] **Step 4: Type-check and visually verify**

Run: `npx tsc --noEmit` — expect no errors.

Run: `npm run dev`, scroll to Testimonials. Confirm 3 dashed-border placeholder cards in a row (stacked on mobile), each with a quote icon and "Testimonial coming soon." — no fabricated quotes.

- [ ] **Step 5: Commit**

```bash
git add components/sections/Testimonials.tsx app/page.tsx components/ui/card.tsx package.json package-lock.json
git commit -m "feat: build Testimonials placeholder section"
```

---

### Task 10: Contact section

**Files:**
- Create: `components/sections/Contact.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `contact` from `lib/content`; `fadeInUp`, `staggerContainer` from `lib/motion`; `buttonVariants` (pre-existing).
- Produces: `<Contact />`, rendered after `<Testimonials />`.

- [ ] **Step 1: Create `components/sections/Contact.tsx`**

```tsx
"use client";

import { motion } from "motion/react";
import { Mail, Linkedin, MapPin } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { contact } from "@/lib/content";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export function Contact() {
  return (
    <section id="contact" aria-label="Contact" className="mx-auto w-full max-w-3xl px-6 py-24 text-center">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col items-center gap-6"
      >
        <motion.h2 variants={fadeInUp} className="font-heading text-3xl font-semibold text-foreground sm:text-4xl">
          {contact.heading}
        </motion.h2>
        <motion.p variants={fadeInUp} className="max-w-xl leading-relaxed text-muted-foreground">
          {contact.subtext}
        </motion.p>
        <motion.a
          variants={fadeInUp}
          href={`mailto:${contact.email}`}
          className={buttonVariants({
            size: "lg",
            className: "bg-brand-violet text-white hover:bg-brand-violet/90",
          })}
        >
          Say Hello
        </motion.a>
        <motion.div
          variants={fadeInUp}
          className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm text-muted-foreground"
        >
          <a
            href={`mailto:${contact.email}`}
            className="flex items-center gap-2 transition-colors hover:text-brand-lilac"
          >
            <Mail className="size-4" /> {contact.email}
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-colors hover:text-brand-lilac"
          >
            <Linkedin className="size-4" /> LinkedIn
          </a>
          <span className="flex items-center gap-2">
            <MapPin className="size-4" /> {contact.location}
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into `app/page.tsx`**

```tsx
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { Skills } from "@/components/sections/Skills";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Achievements } from "@/components/sections/Achievements";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <About />
      <ExperienceTimeline />
      <Skills />
      <FeaturedProjects />
      <Achievements />
      <Testimonials />
      <Contact />
    </main>
  );
}
```

- [ ] **Step 3: Type-check and visually verify**

Run: `npx tsc --noEmit` — expect no errors.

Run: `npm run dev`, scroll to Contact. Confirm heading, subtext, a "Say Hello" button that opens the default mail client, and email/LinkedIn/location links below it.

- [ ] **Step 4: Commit**

```bash
git add components/sections/Contact.tsx app/page.tsx
git commit -m "feat: build Contact section"
```

---

### Task 11: Footer + final verification pass

**Files:**
- Create: `components/sections/Footer.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `contact` from `lib/content`.
- Produces: `<Footer />`, rendered as the final element on the page.

- [ ] **Step 1: Create `components/sections/Footer.tsx`**

```tsx
import Link from "next/link";
import { Mail, Linkedin, ArrowUp } from "lucide-react";
import { contact } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
        <p>&copy; 2026 Yunior Prassetia Putra.</p>
        <div className="flex items-center gap-4">
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-brand-lilac"
          >
            <Linkedin className="size-4" />
          </a>
          <a
            href={`mailto:${contact.email}`}
            aria-label="Email"
            className="transition-colors hover:text-brand-lilac"
          >
            <Mail className="size-4" />
          </a>
          <Link href="#hero" aria-label="Back to top" className="flex items-center gap-1 transition-colors hover:text-brand-lilac">
            Back to top <ArrowUp className="size-3.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Final `app/page.tsx`**

```tsx
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { Skills } from "@/components/sections/Skills";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Achievements } from "@/components/sections/Achievements";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <main className="flex flex-1 flex-col">
        <Hero />
        <About />
        <ExperienceTimeline />
        <Skills />
        <FeaturedProjects />
        <Achievements />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Full verification pass**

Run, in order:
1. `node --test lib/content.test.ts` — expect PASS
2. `npx tsc --noEmit` — expect no errors
3. `npx eslint .` — fix any reported issues
4. `npm run build` — expect a clean production build with no errors

- [ ] **Step 4: Manual QA in the browser (`npm run dev`)**

- Scroll the full page top to bottom; every section listed above should appear in order with its scroll-reveal animation.
- Click "Back to top" in the footer — confirm it smooth-scrolls to the Hero.
- Tab through the page using only the keyboard — confirm every link, button, and the "Read Case Study" trigger gets a visible focus ring, and the project dialog can be closed with Escape.
- Resize the browser to a narrow (mobile) width — confirm no horizontal scrollbar appears and all grids collapse to a single column.
- In DevTools, enable "Emulate CSS prefers-reduced-motion: reduce" — confirm animations become effectively instant rather than janky.

- [ ] **Step 5: Commit**

```bash
git add components/sections/Footer.tsx app/page.tsx
git commit -m "feat: build Footer and complete portfolio page composition"
```

## Self-Review Notes

- **Spec coverage:** Hero (Task 3), About (Task 4), Experience Timeline (Task 5), Skills (Task 6), Featured Projects (Task 7), Achievements (Task 8), Testimonials (Task 9), Contact (Task 10), Footer (Task 11), dark theme/fonts/Aurora background/animation primitives (Task 2), and the content self-check (Task 1) — every spec section has a task.
- **Type consistency:** `ProjectCaseStudy`, `ExperienceEntry`, `SkillCategory`, `Achievement`, `Certification` are defined once in `lib/types.ts` (Task 1) and referenced by the same names/shapes in every later task — no drift.
- **Known follow-ups (explicitly out of scope, not gaps):** swapping the Hero placeholder avatar for a real photo once the user provides the file; confirming the company name for the Jan–May 2025 SEO internship in `lib/content.ts` if the user supplies one later.
