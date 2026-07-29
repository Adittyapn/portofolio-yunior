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
  images: string[];
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
  image: string;
};
