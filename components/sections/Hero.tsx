"use client";

import { motion } from "motion/react";
import { Mail, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import BlurText from "@/components/BlurText";
import { hero } from "@/lib/content";
import { fadeInUp, staggerContainer } from "@/lib/motion";

// lucide-react dropped all brand/social icons; no `Linkedin` export exists in
// this version, so the glyph is inlined here (matches lucide's old icon markup).
function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const nameWords = hero.name.split(" ");
const initials = (nameWords[0][0] + nameWords[nameWords.length - 1][0]).toUpperCase();

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
            <LinkedinIcon className="size-5" />
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
        <span className="font-heading text-5xl font-semibold text-white sm:text-6xl">
          {initials}
        </span>
      </motion.div>
    </section>
  );
}
