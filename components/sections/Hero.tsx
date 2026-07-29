"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowDownRight, Mail } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { LinkedinIcon } from "@/components/icons/LinkedinIcon";
import { hero } from "@/lib/content";
import photo from "@/public/photo.jpeg";

export function Hero() {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center gap-16 px-6 py-20 lg:grid-cols-[1fr_22rem]"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="max-w-3xl"
      >
        <div className="mb-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-[0.16em]">
          <span className="bg-brand-sun px-3 py-1.5">Available for work</span>
          <span className="text-muted-foreground">Bandung, Indonesia · 2026</span>
        </div>

        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-brand-violet">
          {hero.title}
        </p>
        <h1 className="max-w-4xl font-heading text-5xl font-extrabold leading-[0.96] tracking-[-0.06em] text-foreground sm:text-7xl">
          {hero.headline}
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {hero.subtext}
        </p>

        <div className="mt-9 flex flex-wrap gap-4">
          <a
            href={hero.primaryCta.href}
            className={buttonVariants({
              size: "lg",
              className:
                "h-12 rounded-none border-2 border-foreground bg-brand-violet px-6 text-white shadow-[4px_4px_0_var(--foreground)] hover:bg-brand-violet/90",
            })}
          >
            {hero.primaryCta.label}
            <ArrowDownRight className="ml-1 size-4" />
          </a>
          <a
            href={hero.secondaryCta.href}
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className:
                "h-12 rounded-none border-2 border-foreground bg-background px-6 shadow-[4px_4px_0_var(--foreground)] hover:bg-brand-sun",
            })}
          >
            {hero.secondaryCta.label}
          </a>
        </div>

        <div className="mt-8 flex items-center gap-5 text-muted-foreground">
          <a
            href={hero.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="transition-colors hover:text-brand-violet"
          >
            <LinkedinIcon className="size-5" />
          </a>
          <a
            href={`mailto:${hero.socials.email}`}
            aria-label="Send an email"
            className="transition-colors hover:text-brand-violet"
          >
            <Mail className="size-5" />
          </a>
        </div>
      </motion.div>

      <motion.figure
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
        className="relative mx-auto w-full max-w-72 lg:mx-0"
      >
        <div className="absolute inset-0 translate-x-3 translate-y-3 bg-brand-violet" />
        <div className="relative border-2 border-foreground bg-card p-2">
          <Image
            src={photo}
            alt={`Portrait of ${hero.name}`}
            preload
            sizes="(min-width: 1024px) 352px, 288px"
            className="aspect-3/4 w-full object-cover"
          />
          <figcaption className="flex items-center justify-between gap-4 border-t-2 border-foreground px-2 pt-3 text-[10px] font-bold uppercase tracking-[0.14em]">
            <span>Profile_001</span>
            <span>Yunior Prassetia Putra</span>
          </figcaption>
        </div>
        <span className="absolute -left-5 top-8 -rotate-6 bg-brand-pink px-3 py-2 text-xs font-bold uppercase tracking-wide text-white">
          Strategy + Story
        </span>
      </motion.figure>
    </section>
  );
}
