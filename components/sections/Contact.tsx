"use client";

import { motion } from "motion/react";
import { Mail, MapPin } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { LinkedinIcon } from "@/components/icons/LinkedinIcon";
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
            <LinkedinIcon className="size-4" /> LinkedIn
          </a>
          <span className="flex items-center gap-2">
            <MapPin className="size-4" /> {contact.location}
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
