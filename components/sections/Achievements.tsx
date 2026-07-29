"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import CountUp from "@/components/CountUp";
import { achievements, certifications } from "@/lib/content";

export function Achievements() {
  return (
    <section id="achievements" aria-label="Achievements" className="mx-auto w-full max-w-6xl px-6 py-24">
      <div className="mb-12 max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-pink">Proof, not promises</p>
        <h2 className="mt-3 font-heading text-4xl font-extrabold tracking-[-0.04em] text-foreground sm:text-5xl">
          Outcomes & credentials.
        </h2>
      </div>

      <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {achievements.map((achievement) => (
          <div key={achievement.label} className="border-t-2 border-foreground pt-5">
            {achievement.countTo !== undefined && (
              <p className="font-heading text-4xl font-extrabold tracking-[-0.04em] text-brand-violet">
                <CountUp to={achievement.countTo} separator="," duration={2} />
                {achievement.countSuffix}
              </p>
            )}
            <p className="mt-2 font-heading text-lg font-bold text-foreground">{achievement.label}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{achievement.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-20 border-t-2 border-foreground pt-8">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h3 className="font-heading text-3xl font-extrabold tracking-[-0.03em] text-foreground">
              Certifications
            </h3>
            <p className="mt-2 text-muted-foreground">Open either document to inspect the full certificate.</p>
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-violet">Verified documents / 02</p>
        </div>

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {certifications.map((certification) => (
            <a
              key={certification.name}
              href={certification.image}
              target="_blank"
              rel="noopener noreferrer"
              className="group border-2 border-foreground bg-card p-3 shadow-[6px_6px_0_#ff5c7a] transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-violet"
            >
              <Image
                src={certification.image}
                alt={`${certification.name} awarded to Yunior Prassetia Putra`}
                width={1280}
                height={904}
                sizes="(min-width: 640px) 544px, calc(100vw - 72px)"
                className="aspect-7/5 w-full border border-foreground/20 bg-white object-cover"
              />
              <div className="flex items-start justify-between gap-4 px-2 pb-2 pt-5">
                <div>
                  <p className="font-heading font-bold text-foreground">{certification.name}</p>
                  <p className="mt-1 text-sm font-semibold text-brand-violet">{certification.date}</p>
                </div>
                <ArrowUpRight className="mt-0.5 size-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
