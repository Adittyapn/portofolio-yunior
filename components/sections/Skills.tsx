import { skillCategories } from "@/lib/content";

export function Skills() {
  return (
    <section id="skills" aria-label="Skills" className="mx-auto w-full max-w-6xl px-6 py-24">
      <div className="mb-12 max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-pink">Working toolkit</p>
        <h2 className="mt-3 font-heading text-4xl font-extrabold tracking-[-0.04em] text-foreground sm:text-5xl">
          What I actually use.
        </h2>
        <p className="mt-4 text-muted-foreground">
          No arbitrary proficiency bars—just the disciplines and tools I use to move work from brief to publish.
        </p>
      </div>

      <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {skillCategories.map((category) => (
          <div key={category.name} className="border-t-2 border-foreground pt-4">
            <h3 className="font-heading text-lg font-bold text-foreground">{category.name}</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {category.skills.map((skill) => (
                <li key={skill.name} className="flex gap-2">
                  <span aria-hidden="true" className="text-brand-violet">↳</span>
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
