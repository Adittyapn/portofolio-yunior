"use client";

import { useState } from "react";
import { motion } from "motion/react";
import SpotlightCard from "@/components/SpotlightCard";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { ProjectDialog } from "@/components/ProjectDialog";
import { projects } from "@/lib/content";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import type { ProjectCaseStudy } from "@/lib/types";

export function FeaturedProjects() {
  const [activeProject, setActiveProject] = useState<ProjectCaseStudy | null>(null);

  return (
    <section id="projects" aria-label="Featured projects" className="mx-auto w-full max-w-5xl px-6 py-24">
      <motion.h2
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mb-12 font-heading text-3xl font-semibold text-foreground sm:text-4xl"
      >
        Featured Projects
      </motion.h2>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid gap-6 sm:grid-cols-2"
      >
        {projects.map((project) => (
          <motion.div key={project.slug} variants={fadeInUp}>
            <SpotlightCard
              spotlightColor="rgba(108, 76, 241, 0.4)"
              className="!border-border !bg-card flex h-full flex-col justify-between"
            >
              <div>
                <p className="text-sm text-brand-lilac">{project.company}</p>
                <h3 className="mt-1 font-heading text-xl font-semibold text-foreground">{project.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{project.results}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveProject(project)}
                className={buttonVariants({ variant: "outline", className: "mt-6 self-start" })}
              >
                Read Case Study
              </button>
            </SpotlightCard>
          </motion.div>
        ))}
      </motion.div>

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
