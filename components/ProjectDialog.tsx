"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { ProjectCaseStudy } from "@/lib/types";

const FIELDS: {
  key: "problem" | "goal" | "strategy" | "execution" | "results" | "lessons";
  label: string;
}[] = [
  { key: "problem", label: "Problem" },
  { key: "goal", label: "Goal" },
  { key: "strategy", label: "Strategy" },
  { key: "execution", label: "Execution" },
  { key: "results", label: "Results" },
  { key: "lessons", label: "Lessons Learned" },
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
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto rounded-none border-2 border-foreground bg-popover shadow-[7px_7px_0_#244bff]">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">{project.title}</DialogTitle>
          <DialogDescription>
            {project.company} · {project.period}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="rounded-none">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {project.images.map((image, index) => (
            <Image
              key={image}
              src={image}
              alt={`${project.title} documentation ${index + 1}`}
              width={480}
              height={640}
              sizes="(min-width: 640px) 296px, calc(50vw - 34px)"
              className="aspect-3/4 w-full border border-foreground/20 object-cover"
            />
          ))}
        </div>

        <div className="space-y-5">
          {FIELDS.map(({ key, label }) => (
            <div key={key}>
              <h3 className="mb-1 text-sm font-semibold uppercase tracking-wide text-brand-lilac">
                {label}
              </h3>
              <p className="leading-relaxed text-muted-foreground">{project[key]}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
