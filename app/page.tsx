import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { Skills } from "@/components/sections/Skills";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Achievements } from "@/components/sections/Achievements";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <main className="flex flex-1 flex-col">
        <Hero />
        <About />
        <ExperienceTimeline />
        <Skills />
        <FeaturedProjects />
        <Achievements />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
