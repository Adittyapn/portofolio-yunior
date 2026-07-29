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
