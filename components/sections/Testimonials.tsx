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
