import logoUrl from "@/assets/pamho-logo.png";
import { Mail, Linkedin, Twitter, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="relative mt-24 bg-[oklch(0.18_0.08_305)] text-[oklch(0.95_0.02_85)]">
      <div className="kente-divider" />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="inline-flex items-center rounded-xl bg-cream px-4 py-3">
            <img src={logoUrl} alt="Pan-African Mental Health Organization" className="h-20 w-auto object-contain sm:h-24" />
          </div>
          <p className="mt-6 max-w-sm font-display text-2xl italic text-[oklch(0.88_0.11_78)]">
            Healthy Minds, Healthy Lives.
          </p>
          <p className="mt-4 max-w-sm text-sm text-white/70">
            Advancing mental health policy, research, and community care across the African continent.
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-[oklch(0.85_0.13_78)]">
            Explore
          </h4>
          <ul className="mt-5 space-y-3 text-sm text-white/80">
            <li><a href="/" className="hover:text-[oklch(0.85_0.13_78)]">Home</a></li>
            <li><a href="/about" className="hover:text-[oklch(0.85_0.13_78)]">About</a></li>
            <li><a href="/conversation" className="hover:text-[oklch(0.85_0.13_78)]">Apply to Speak</a></li>
            <li><a href="/join" className="hover:text-[oklch(0.85_0.13_78)]">Join the Conversation</a></li>
            <li><a href="/partners" className="hover:text-[oklch(0.85_0.13_78)]">Partner With Us</a></li>
            <li><a href="/ambassadors" className="hover:text-[oklch(0.85_0.13_78)]">Become an Ambassador</a></li>
            <li><a href="/contact" className="hover:text-[oklch(0.85_0.13_78)]">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-[oklch(0.85_0.13_78)]">
            Connect
          </h4>
          <p className="mt-5 text-sm text-white/70">www.pamhoafrica.org</p>
          <a
            href="mailto:hello@pamhoafrica.org"
            className="mt-2 inline-flex items-center gap-2 text-sm text-white/80 hover:text-[oklch(0.85_0.13_78)]"
          >
            <Mail className="h-4 w-4" /> hello@pamhoafrica.org
          </a>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li className="flex items-center gap-2"><Instagram className="h-4 w-4" /> @pamho_africa</li>
            <li className="flex items-center gap-2"><Twitter className="h-4 w-4" /> @pamho_africa</li>
            <li className="flex items-center gap-2"><Linkedin className="h-4 w-4" /> @pamho_africa</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 px-5 py-6 text-xs text-white/55 sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} Pan-African Mental Health Organization. All rights reserved.</p>
          <p>pamhoafrica.org</p>
        </div>
      </div>
    </footer>
  );
}