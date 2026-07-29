"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { ProjectCaseStudy } from "@/lib/types";

const FIELDS: {
  key: "problem" | "goal" | "strategy" | "execution" | "lessons";
  label: string;
}[] = [
  { key: "problem", label: "01 / Challenge" },
  { key: "goal", label: "02 / Goal" },
  { key: "strategy", label: "03 / Strategy" },
  { key: "execution", label: "04 / Execution" },
  { key: "lessons", label: "05 / What I learned" },
];

export function ProjectDialog({
  project,
  open,
  onOpenChange,
}: {
  project: ProjectCaseStudy;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-[calc(100dvh-1rem)] max-h-[56rem] max-w-[calc(100%-1rem)] overflow-y-auto rounded-none border-2 border-foreground bg-popover p-0 shadow-[7px_7px_0_#244bff] lg:h-[90dvh] lg:max-w-6xl lg:overflow-hidden">
        <div className="lg:grid lg:h-full lg:grid-cols-[20rem_1fr]">
          <aside className="flex flex-col bg-foreground p-6 text-white sm:p-8 lg:h-full lg:overflow-y-auto">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-sun">Case file / {project.period}</p>

            <DialogHeader className="mt-8 text-left">
              <DialogTitle className="font-heading text-3xl font-extrabold leading-[1.05] tracking-[-0.04em] text-white">
                {project.title}
              </DialogTitle>
              <DialogDescription className="pt-2 text-white/60">{project.company}</DialogDescription>
            </DialogHeader>

            <div className="mt-7 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="rounded-none border-white/30 text-white">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="mt-10 border-t border-white/30 pt-6 lg:mt-auto">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-pink">Outcome</p>
              <p className="mt-3 font-heading text-xl font-bold leading-snug text-white">{project.results}</p>
            </div>
          </aside>

          <div className="p-5 sm:p-8 lg:h-full lg:overflow-y-auto lg:p-10">
            <section aria-labelledby="evidence-heading">
              <div className="flex items-end justify-between gap-4 border-b-2 border-foreground pb-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-pink">Campaign evidence</p>
                  <h3 id="evidence-heading" className="mt-2 font-heading text-2xl font-extrabold tracking-[-0.03em]">
                    Source material
                  </h3>
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  {String(project.images.length).padStart(2, "0")} assets
                </p>
              </div>

              <div className="-mx-5 mt-5 flex snap-x gap-3 overflow-x-auto px-5 pb-3 sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10">
                {project.images.map((image, index) => (
                  <figure
                    key={image}
                    className="w-52 shrink-0 snap-start border border-foreground/25 bg-card p-2 sm:w-60"
                  >
                    <div className="relative aspect-3/4 overflow-hidden bg-muted">
                      <Image
                        src={image}
                        alt={`${project.title} documentation ${index + 1}`}
                        fill
                        sizes="240px"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="pt-2 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                      Asset_{String(index + 1).padStart(2, "0")}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>

            <section aria-labelledby="process-heading" className="mt-12">
              <div className="border-b-2 border-foreground pb-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-violet">Case narrative</p>
                <h3 id="process-heading" className="mt-2 font-heading text-2xl font-extrabold tracking-[-0.03em]">
                  From brief to result
                </h3>
              </div>

              <div className="grid gap-x-10 sm:grid-cols-2">
                {FIELDS.map(({ key, label }) => (
                  <div key={key} className="border-b border-foreground/20 py-7">
                    <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-brand-violet">{label}</h4>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{project[key]}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
