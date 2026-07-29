import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { LinkedinIcon } from "@/components/icons/LinkedinIcon";
import { contact } from "@/lib/content";

export function Contact() {
  return (
    <section id="contact" aria-label="Contact" className="bg-brand-violet px-6 py-24 text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-12 md:grid-cols-[1fr_20rem] md:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-sun">Start a conversation</p>
          <h2 className="mt-4 max-w-4xl font-heading text-5xl font-extrabold leading-[0.98] tracking-[-0.055em] sm:text-7xl">
            {contact.heading}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">{contact.subtext}</p>
        </div>

        <div>
          <a
            href={`mailto:${contact.email}`}
            className="flex items-center justify-between border-2 border-white bg-brand-sun px-5 py-4 font-bold text-foreground shadow-[5px_5px_0_#17191f] transition-transform hover:-translate-y-1"
          >
            Email Yunior
            <ArrowUpRight className="size-5" />
          </a>
          <div className="mt-7 space-y-3 text-sm text-white/75">
            <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-white">
              <Mail className="size-4" /> {contact.email}
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white"
            >
              <LinkedinIcon className="size-4" /> LinkedIn
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="size-4" /> {contact.location}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
