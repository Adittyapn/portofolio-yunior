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
