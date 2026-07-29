import { about } from "@/lib/content";

export function About() {
  return (
    <section
      id="about"
      aria-label="About me"
      className="mx-auto grid w-full max-w-6xl gap-10 border-t-2 border-foreground px-6 py-24 md:grid-cols-[15rem_1fr]"
    >
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-pink">Point of view</p>
        <h2 className="mt-3 font-heading text-4xl font-extrabold tracking-[-0.04em] text-foreground">
          Attention is earned.
        </h2>
      </div>
      <div className="max-w-3xl space-y-6">
        {about.paragraphs.map((paragraph, index) => (
          <p
            key={paragraph}
            className={
              index === 0
                ? "font-heading text-2xl font-semibold leading-snug text-foreground"
                : "text-lg leading-relaxed text-muted-foreground"
            }
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
