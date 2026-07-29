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
