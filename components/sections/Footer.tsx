import Link from "next/link";
import { Mail, ArrowUp } from "lucide-react";
import { LinkedinIcon } from "@/components/icons/LinkedinIcon";
import { contact } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t-2 border-foreground bg-background px-6 py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
        <p>&copy; 2026 Yunior Prassetia Putra.</p>
        <div className="flex items-center gap-4">
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-brand-lilac"
          >
            <LinkedinIcon className="size-4" />
          </a>
          <a
            href={`mailto:${contact.email}`}
            aria-label="Email"
            className="transition-colors hover:text-brand-lilac"
          >
            <Mail className="size-4" />
          </a>
          <Link href="#hero" aria-label="Back to top" className="flex items-center gap-1 transition-colors hover:text-brand-lilac">
            Back to top <ArrowUp className="size-3.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
