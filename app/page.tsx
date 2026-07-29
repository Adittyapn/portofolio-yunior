import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { Skills } from "@/components/sections/Skills";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { hero } from "@/lib/content";

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-foreground/15 bg-background/95 px-6 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between">
          <a href="#hero" className="font-heading text-xl font-extrabold tracking-[-0.05em]">
            YPP<span className="text-brand-pink">.</span>
          </a>
          <nav aria-label="Primary navigation" className="hidden items-center gap-7 text-sm font-medium sm:flex">
            <a href="#projects" className="hover:text-brand-violet">Work</a>
            <a href="#experience" className="hover:text-brand-violet">Experience</a>
            <a href="#about" className="hover:text-brand-violet">About</a>
          </nav>
          <a
            href={`mailto:${hero.socials.email}`}
            className="border-2 border-foreground bg-brand-sun px-4 py-2 text-sm font-semibold shadow-[3px_3px_0_var(--foreground)] transition-transform hover:-translate-y-0.5"
          >
            Let&apos;s talk
          </a>
        </div>
      </header>
      <main className="flex flex-1 flex-col">
        <Hero />
        <About />
        <ExperienceTimeline />
        <Skills />
        <FeaturedProjects />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
