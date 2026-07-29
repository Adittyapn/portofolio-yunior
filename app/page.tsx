import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <About />
    </main>
  );
}
