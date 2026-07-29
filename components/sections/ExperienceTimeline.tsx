import { Badge } from "@/components/ui/badge";
import { experience } from "@/lib/content";

export function ExperienceTimeline() {
  return (
    <section id="experience" aria-label="Work experience" className="mx-auto w-full max-w-6xl px-6 py-24">
      <div className="mb-12 flex items-end justify-between border-b-2 border-foreground pb-5">
        <h2 className="font-heading text-4xl font-extrabold tracking-[-0.04em] text-foreground sm:text-5xl">
          Experience
        </h2>
        <p className="hidden text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground sm:block">
          Field notes / 2024—Now
        </p>
      </div>

      <ol>
        {experience.map((entry) => (
          <li
            key={`${entry.company}-${entry.period}`}
            className="grid gap-4 border-b border-foreground/20 py-8 md:grid-cols-[10rem_15rem_1fr]"
          >
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-violet">{entry.period}</p>
            <div>
              <h3 className="font-heading text-xl font-bold text-foreground">{entry.role}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{entry.company}</p>
            </div>
            <div>
              <p className="leading-relaxed text-muted-foreground">{entry.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {entry.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="rounded-none border-foreground/25 bg-transparent">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
