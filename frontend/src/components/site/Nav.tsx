import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Sparkles, ArrowRight } from "lucide-react";
import logoUrl from "@/assets/pamho-logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/join", label: "Join the Conversation" },
  { to: "/partners", label: "Partner With Us" },
  { to: "/ambassadors", label: "Become an Ambassador" },
  { to: "/contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      {/* Top Event Announcement Banner */}
      <div className="bg-primary px-4 py-2 text-center text-xs font-medium text-primary-foreground sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            The Pan-African Mental Health Conversation is coming soon!
          </span>
          <span className="hidden opacity-80 sm:inline">•</span>
          <span className="opacity-90">Speaker applications closed — Registration is open.</span>
          <a
            href="/join"
            className="inline-flex items-center gap-1 font-semibold text-accent underline underline-offset-2 hover:text-accent/90"
          >
            Register to Attend <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3 sm:px-8">
        <Link to="/" className="flex min-w-0 items-center" aria-label="PAMHO — Pan-African Mental Health Organization">
          <img
            src={logoUrl}
            alt="Pan-African Mental Health Organization"
            className="h-24 w-auto shrink-0 object-contain sm:h-28 lg:h-32"
          />
        </Link>
        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.to}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/join"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
          >
            Register to Attend
          </a>
        </nav>
        <button
          aria-label="Menu"
          className="rounded-md p-2 text-primary lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border/60 bg-background lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium text-foreground/85 hover:bg-muted"
              >
                {l.label}
              </a>
            ))}
            <a
              href="/join"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground"
            >
              Register to Attend
            </a>
          </div>
        </div>
      )}
      <div className="kente-divider" />
    </header>
  );
}