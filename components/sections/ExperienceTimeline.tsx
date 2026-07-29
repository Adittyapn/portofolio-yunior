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
