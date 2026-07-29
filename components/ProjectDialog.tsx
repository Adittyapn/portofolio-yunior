"use client";

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
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">{project.title}</DialogTitle>
          <DialogDescription>
            {project.company} · {project.period}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
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
