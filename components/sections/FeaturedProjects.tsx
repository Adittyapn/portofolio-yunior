"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProjectDialog } from "@/components/ProjectDialog";
import { projects } from "@/lib/content";
import type { ProjectCaseStudy } from "@/lib/types";

export function FeaturedProjects() {
  const [activeProject, setActiveProject] = useState<ProjectCaseStudy | null>(null);

  return (
    <section id="projects" aria-label="Featured projects" className="bg-foreground py-24 text-white">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="mb-14 grid gap-6 border-b border-white/30 pb-7 md:grid-cols-[1fr_24rem] md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-sun">Selected case files</p>
            <h2 className="mt-3 font-heading text-5xl font-extrabold tracking-[-0.05em] sm:text-6xl">
              Work, with receipts.
            </h2>
          </div>
          <p className="leading-relaxed text-white/65">
            The brief, the thinking, the execution, and what moved after the work shipped.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <article
              key={project.slug}
              className="flex h-full flex-col border-2 border-white bg-[#202329] p-4 shadow-[7px_7px_0_#244bff]"
            >
              <div className="mb-5 grid grid-cols-2 gap-2">
                {project.images.slice(0, 2).map((image, imageIndex) => (
                  <div key={image} className="relative aspect-4/3 overflow-hidden only:col-span-2">
                    <Image
                      src={image}
                      alt={`${project.title} documentation ${imageIndex + 1}`}
                      fill
                      sizes="(min-width: 768px) 250px, calc(50vw - 40px)"
                      className="object-cover grayscale-[15%] transition duration-300 hover:grayscale-0"
                    />
                    <span className="absolute left-2 top-2 bg-white px-2 py-1 text-[10px] font-bold text-foreground">
                      ASSET_{String(imageIndex + 1).padStart(2, "0")}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-1 flex-col px-1 pb-1">
                <div className="flex items-center justify-between gap-4 text-xs font-bold uppercase tracking-[0.12em]">
                  <span className="text-brand-sun">{project.company}</span>
                  <span className="text-white/50">CASE_{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-3 font-heading text-2xl font-bold leading-tight text-white">{project.title}</h3>
                <p className="mt-4 leading-relaxed text-white/65">{project.results}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="rounded-none border-white/30 text-white">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setActiveProject(project)}
                  className="mt-7 flex items-center justify-between border-t border-white/30 pt-4 text-left text-sm font-bold uppercase tracking-[0.1em] text-white hover:text-brand-sun"
                >
                  Open case file
                  <ArrowUpRight className="size-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {activeProject && (
        <ProjectDialog
          project={activeProject}
          open={activeProject !== null}
          onOpenChange={(open) => {
            if (!open) setActiveProject(null);
          }}
        />
      )}
    </section>
  );
}
