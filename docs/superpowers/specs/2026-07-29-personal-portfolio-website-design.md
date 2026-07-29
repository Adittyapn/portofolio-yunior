# Personal Portfolio Website — Design Spec

**Date:** 2026-07-29
**Owner:** Yunior Prassetia Putra

## Goal

A single-page, dark-mode-default portfolio (Next.js App Router + TypeScript + Tailwind + Framer Motion) that hooks HR/founders/marketing managers/agencies within ~10 seconds, styled Apple/Linear/Framer-premium. Not a resume clone — every section is rewritten into persuasive, honest copy grounded in the real resume (no invented metrics).

Audience: HR, startup founders, marketing managers, digital agencies.
Success criteria: recruiter can grasp "who this is, what they're good at, proof it worked" within the hero + first scroll, then dig into case studies if interested.

## Architecture

Single scrolling page (`app/page.tsx`) composed of section components. No CMS, no MDX, no global state manager, no contact-form backend — all explicitly out of scope per user decision (YAGNI: single-owner static content).

```
app/
  layout.tsx            — Inter + Manrope fonts, dark mode default, metadata/SEO tags
  page.tsx              — composes sections in order
components/
  sections/
    Hero.tsx
    About.tsx
    ExperienceTimeline.tsx
    FeaturedProjects.tsx
    Skills.tsx
    Achievements.tsx
    Testimonials.tsx
    Contact.tsx
    Footer.tsx
  ProjectDialog.tsx      — shadcn Dialog rendering one ProjectCaseStudy (case studies open inline)
  BackgroundAurora.tsx   — wraps react-bits `Aurora` as the floating gradient background
  ui/                    — shadcn primitives (button, dialog, badge, card, progress, separator)
lib/
  content.ts             — single source of truth: all resume-derived content, typed
  types.ts               — content shape types
  motion.ts              — shared Framer Motion variants (fadeIn, scrollReveal, stagger) reused by every section instead of redefining per component
```

## Data model (`lib/types.ts`)

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
  skills: { name: string; level: number }[]; // 0-100, self-rated proficiency for the progress bar — not a claimed business metric
};

export type Achievement = { label: string; description: string };
export type Certification = { name: string; date: string };
```

`lib/content.ts` exports typed constants for all of the above, populated with the copy below. This is the only place content lives — sections import from it, never hardcode copy inline.

## Content (approved)

### Hero
- Name: Yunior Prassetia Putra
- Title: Social Media Specialist & Digital Marketing Strategist
- Headline: "I Turn Scrolls Into Growth — One Story-Driven Campaign at a Time."
- Subtext: "I plan, create, and optimize content that turns casual scrollers into engaged audiences — blending data-driven strategy with storytelling across Instagram, TikTok, and beyond."
- CTAs: `Say Hello` (mailto:yuniorprassetia2@gmail.com, primary) · `View My Work` (scroll to Featured Projects, secondary)
- Socials: LinkedIn (linkedin.com/in/yuniorprassetia), Email
- Image: placeholder frame, swapped for a real photo later (user will provide file)

### About Me
> I'm Yunior — a Bandung-based digital marketer who's spent the last few years learning one thing: attention is earned, not assumed.
>
> My path started in a classroom studying digital marketing at Telkom University, but it took shape in the field — writing SEO-friendly articles for environmental campaigns, planning content calendars inside an advertising agency, and turning raw footage into scroll-stopping short-form videos for food creators on Instagram and TikTok. Along the way, I helped a national brand like Honda hit 43,000+ organic content views in three months, without paid boosts — just strategy and consistency.
>
> What pulls me toward this work is the mix of data and storytelling — the moment a post's numbers tell you exactly what a caption or hook is doing right. That curiosity took me outside marketing too: I led project coordination for a motorcycle-engine generator innovation project with Institut Teknologi Bandung and ParagonCorp, managing timelines and cross-functional teams from concept to exhibition.
>
> Whether I'm optimizing a caption or coordinating an engineering team, the throughline is the same: I care about the details that make people stop, notice, and stay.

### Experience Timeline (6 entries, impact summaries not bullets)

1. **Halma Advertisa** — Social Media Specialist Intern — *Feb 2026 – May 2026*
   Owned content planning and scheduling for client social accounts, translating brand identity into scroll-worthy Instagram and TikTok content. Tracked engagement and reach to keep campaigns aligned with what audiences actually responded to.
   Skills: Content Planning, Instagram, TikTok, Analytics, Campaign Execution

2. **Digital Marketing & SEO Support Intern** — *(company name TBD — user to confirm)* — *Jan 2025 – May 2025*
   Rebuilt article structures around real keyword research to lift organic visibility, while running Instagram content for environmental awareness campaigns — proving sustainability content can be both educational and genuinely engaging.
   Skills: SEO, Keyword Research, Instagram, Content Development

3. **Honda** — Digital Marketing — *Nov 2025 – Dec 2025*
   Owned organic content strategy for brand-awareness campaigns, driving 43,000+ content views in three months and turning that visibility into real customer conversions — all without paid media.
   Skills: Content Strategy, Organic Growth, Conversion-Focused Content, Analytics

4. **Food Review Content Creator (Freelance)** — Content Editor — *Dec 2025 – Present*
   Edits and restructures short-form food review content across multiple Instagram and TikTok accounts, sharpening hooks and pacing to grow watch time. Organic follower growth followed as a direct result of tighter storytelling and consistent posting cadence.
   Skills: Video Editing, Short-Form Storytelling, Hashtag Strategy, CapCut

5. **Telkom University** — Practicum Assistant, Marketing Management — *Jan 2024 – Jun 2024*
   Supported lecturers in running marketing management practicums, guiding students through real case-study discussions and evaluating strategy presentations — an early proving ground for breaking down marketing concepts clearly.
   Skills: Marketing Strategy, Teaching Support, Case Study Analysis

6. **Motorcycle Engine Generator Innovation Project** (ITB & ParagonCorp collaboration) — Project Manager — *Sep 2025 – May 2026*
   Led coordination for a motorcycle-engine-based power generator built for innovation exhibition, bridging final-year ITB engineering students, technical teams, and Paragon as an external partner. Owned the ECU-related workstream, task delegation, and timeline — carrying the project from concept to the exhibition floor.
   Skills: Project Management, Cross-functional Coordination, Timeline Ownership, Stakeholder Management

### Featured Projects — 4 case studies (Problem/Goal/Strategy/Execution/Results/Lessons)

**1. Honda — Organic Growth Without Ad Spend**
- Problem: Brand-awareness content wasn't cutting through organic feeds, and marketing needed proof that reach could grow without leaning on paid promotion.
- Goal: Build an organic content strategy that increased visibility and pushed viewers toward real conversions within a short campaign window.
- Strategy: Focused content around what audiences already engaged with, prioritized consistency over volume, and used performance data to double down on formats that worked.
- Execution: Planned, published, and iterated on organic content over a 3-month sprint, adjusting weekly based on engagement and reach trends.
- Results: 43,000+ content views generated organically in 3 months, with measurable customer conversions tied directly to the content.
- Lessons Learned: Consistency and audience-behavior analysis can outperform ad spend when the content actually earns attention.

**2. Freelance Food Content — Editing for Watch Time**
- Problem: Food review accounts were producing content, but weak hooks and pacing meant viewers dropped off before the payoff.
- Goal: Increase watch time and organic follower growth across multiple accounts through better editing, not more content.
- Strategy: Rebuilt each video around a stronger opening hook, tightened pacing for short-form attention spans, and tailored captions and hashtags to each platform's audience.
- Execution: Ongoing editing and format iteration across multiple Instagram and TikTok accounts using CapCut, testing hook styles against retention.
- Results: Measurable organic follower growth across managed accounts, driven directly by stronger storytelling and consistent posting.
- Lessons Learned: The first three seconds decide everything — editing is strategy, not just polish.

**3. Motorcycle Engine Generator — Leading Outside Marketing**
- Problem: A student-industry innovation project needed someone to hold together engineering timelines, cross-team communication, and exhibition deadlines — a role outside typical marketing work.
- Goal: Deliver a working motorcycle-engine-based power generator, exhibition-ready, on schedule and with all collaborators aligned.
- Strategy: Split ownership between technical development (ECU and generator integration) and coordination (task delegation, timeline tracking, partner communication with ITB and Paragon).
- Execution: Managed the project from development through exhibition prep, working directly with final-year ITB engineering students and Paragon as an external collaborator.
- Results: Delivered a functioning, exhibition-ready generator system on schedule, with all cross-functional teams aligned through to launch.
- Lessons Learned: The same skills that run a content calendar — timelines, communication, prioritization — scale to leading technical teams outside your home field.

**4. SEO & Digital Marketing Internship — Turning Articles Into Traffic**
- Problem: Website content wasn't structured to rank, and environmental campaign messaging needed a wider reach than organic search alone was providing.
- Goal: Improve organic visibility of website articles while growing engagement on environmental awareness campaigns via social.
- Strategy: Paired real keyword research with SEO-friendly article structuring, and ran a parallel Instagram content push to extend campaign reach beyond search.
- Execution: Rebuilt article structures around researched keywords, published SEO-optimized content, and scheduled Instagram content aligned with campaign themes.
- Results: Increased engagement and impressions across managed content, with stronger organic visibility for optimized articles.
- Lessons Learned: SEO and social aren't separate channels — they compound when the content strategy treats them as one system.

### Skills (8 categories, self-rated proficiency bars)
- Digital Marketing: Meta Ads, Campaign Execution, Brand Awareness Strategy
- SEO: SEO Basics, Keyword Research, SEO Content Structuring
- Social Media: Social Media Management, Instagram & TikTok Management, Content Scheduling
- Content Strategy: Content Planning, Content Editing, Copywriting
- Analytics: Social Media Analytics, Google Analytics, Performance Reporting
- Project Management: Project Management, Cross-functional Coordination, Timeline Management
- Tools: Canva, CapCut, Figma, Mailchimp, WordPress, Meta Ads Manager
- Soft Skills: Communication, Team Collaboration, Creative Thinking, Time Management, Problem Solving

### Achievements (confirmed facts only) + Certifications
- 43,000+ organic content views generated in 3 months — Honda
- Organic follower growth driven through content editing and storytelling — Freelance food content
- Increased organic visibility and engagement through SEO-optimized articles — SEO internship
- Led a cross-functional innovation project from concept to exhibition — ITB × ParagonCorp
- Certifications row: Lensetek AI-Driven Digital Marketing Certification (May 2025), Social Media Officer Intern Certification (April 2026)

### Testimonials
3 placeholder cards: quote icon, greyed "Testimonial coming soon" text, blank attribution line. No fabricated quotes.

### Contact
- Heading: "Let's Build Something Great Together."
- Subtext: "Have a brand that needs a stronger digital presence, or a project that needs someone who can turn strategy into content people actually stop for? I'd love to hear about it."
- Details: Email (yuniorprassetia2@gmail.com), LinkedIn, Bandung, Indonesia
- CTA: `Say Hello` → mailto

### Footer
"© 2026 Yunior Prassetia Putra." + LinkedIn/Email icons + "Back to top"

## Component mapping

**shadcn/ui:** Button, Dialog (project case-study detail), Badge (skill/tech tags), Card, Progress (skill bars), Separator.

**React Bits** (installed via `@react-bits` shadcn registry, `npx shadcn add @react-bits/<Name>-TS-TW`):
- `Aurora` — floating animated gradient background, wrapped in `BackgroundAurora.tsx`, fixed behind all sections (dark, subtle, using the `#6C4CF1`/`#9B7BFF` palette). This is the "floating gradient background / animated gradient blobs" requirement.
- `BlurText` (already installed) — Hero headline reveal on load.
- `CountUp` — animates the 43,000+ views stat in Achievements/Case Study 1 on scroll into view.
- `SpotlightCard` — hover-spotlight wrapper for Featured Project cards and Skill category cards (satisfies the "hover effects" requirement without hand-rolled CSS).

## Animation system (`lib/motion.ts`)

Three exported Framer Motion variant sets, reused everywhere instead of redefined per component:
- `fadeInUp` — used for hero text, section headings
- `scrollReveal` — `whileInView` fade+slide for cards/timeline entries as they enter viewport
- `staggerContainer` — parent variant for lists (timeline, skills, achievements) so children cascade in

Page transitions: shared `AnimatePresence` wrapper for a simple opacity crossfade — no route-based content here beyond the single page, but keeps it ready if a project detail route is ever added.

## Accessibility / Performance / SEO

- Semantic landmarks (`<header>`, `<main>`, `<section aria-label>`, `<footer>`), skip-to-content link.
- All interactive elements (Dialog triggers, nav links, CTA buttons) keyboard-reachable with visible focus states; Dialog uses shadcn's built-in focus trap.
- `next/image` for the profile placeholder/photo (priority-loaded), `next/font` for Inter + Manrope (no FOUT).
- Metadata: title, description, Open Graph tags in `layout.tsx` for link-preview quality when shared to recruiters.
- Aurora/gradient background rendered behind `will-change`-scoped layers only, `prefers-reduced-motion` respected (motion variants fall back to simple opacity fades).

## Self-check (ponytail requirement)

The one place a silent bug could break the page without a visible crash: malformed `lib/content.ts` data (empty required field, duplicate case-study slug, skill level out of 0–100 range). Add `lib/content.test.ts` — a small assertion-based check (no framework needed, run via `node --test` or a simple `tsx` script) verifying:
- every `ProjectCaseStudy` has non-empty `problem/goal/strategy/execution/results/lessons`
- all `slug` values are unique
- all skill `level` values are within 0–100

## Out of scope (explicit, per user decisions)

- Real profile photo (user provides file later; placeholder ships now)
- Contact form backend / email service (mailto + LinkedIn only)
- Resume PDF download button
- Separate per-project routes (case studies are inline dialogs on the single page)
- CMS/MDX content management, global state management, dark/light theme toggle
