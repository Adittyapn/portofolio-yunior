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
  headline: "Content people stop for. Strategy that keeps them around.",
  subtext:
    "Bandung-based social media specialist. I plan the calendar, shape the hook, edit the story, and read the numbers after it ships.",
  primaryCta: { label: "See the work", href: "#projects" },
  secondaryCta: { label: "Email me", href: "mailto:yuniorprassetia2@gmail.com" },
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
    images: [
      "/honda (1).jpeg",
      "/honda (2).jpeg",
      "/honda (3).jpeg",
      "/honda.jpeg",
    ],
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
    images: ["/shooting.jpeg"],
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
    images: [
      "/mesin  (2).jpeg",
      "/mesin  (3).jpeg",
      "/mesin  (4).jpeg",
      "/mesin  (5).jpeg",
      "/mesin  (6).jpeg",
    ],
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
    images: [
      "/dishut.jpeg",
      "/dishut (1).jpeg",
      "/dishut (2).jpeg",
      "/dishut (3).jpeg",
    ],
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
  {
    name: "Lensetek AI-Driven Digital Marketing Certification",
    date: "May 2025",
    image: "/lencetek.jpeg",
  },
  {
    name: "Social Media Officer Intern Certification",
    date: "April 2026",
    image: "/sosial media.jpeg",
  },
];

export const contact = {
  heading: "Have a campaign that needs a sharper story?",
  subtext:
    "Tell me what you are trying to move—attention, engagement, or action. I’ll bring the content plan and the follow-through.",
  email: "yuniorprassetia2@gmail.com",
  linkedin: "https://www.linkedin.com/in/yuniorprassetia/",
  location: "Bandung, Indonesia",
};
