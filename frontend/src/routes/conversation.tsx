import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import SEO from "@/components/SEO";
import pattern from "@/assets/pattern.svg";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Video, Calendar } from "lucide-react";

const EVENT_TARGET_DATE = new Date("2026-10-10T09:00:00Z").getTime();

export const Route = createFileRoute("/conversation")({
  head: () => ({
    meta: [
      { title: "The Pan-African Mental Health Conversation — PAMHO" },
      {
        name: "description",
        content:
          "PAMHO's inaugural continental online dialogue on mental health in Africa. Apply to speak, present, or join a panel.",
      },
      { property: "og:title", content: "The Pan-African Mental Health Conversation — PAMHO" },
      {
        property: "og:description",
        content:
          "An online continental dialogue on mental health in Africa.",
      },
    ],
  }),
  component: ConversationPage,
});

function ZoomStage() {
  const [meetingId, setMeetingId] = useState("9332105985");
  const [passcode, setPasscode] = useState("tcW3rK");
  const [userName, setUserName] = useState("PAMHO Participant");
  const [isJoined, setIsJoined] = useState(false);

  const cleanMeetingId = meetingId.replace(/\s+/g, "");
  const zoomEmbedUrl = `https://zoom.us/wc/join/${cleanMeetingId}?pwd=${passcode}&un=${encodeURIComponent(userName)}`;

  return (
    <section id="stage" className="py-16 bg-primary/5 border-y border-border/60">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Stage Preview
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-primary sm:text-4xl">
              Pan-African Mental Health Virtual Stage
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
              Join the live continental dialogue directly on the PAMHO platform. Enter your display name and passcode below to enter the live session.
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-primary/20 bg-card p-6 shadow-xl sm:p-8">
          {!isJoined ? (
            <div className="mx-auto max-w-md py-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Video className="h-8 w-8" />
              </div>
              <h3 className="mt-4 font-display text-2xl font-semibold text-primary">Enter the Live Stage</h3>
              <p className="mt-2 text-xs text-muted-foreground">
                Meeting ID: <code className="rounded bg-muted px-2 py-0.5 font-mono">{cleanMeetingId}</code>
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!passcode) {
                    toast.error("Please enter the Meeting Passcode from your Zoom invitation");
                    return;
                  }
                  setIsJoined(true);
                }}
                className="mt-6 space-y-4 text-left"
              >
                <div>
                  <label className="block text-xs font-semibold text-foreground/80 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground/80 mb-1">Meeting Passcode</label>
                  <input
                    type="password"
                    required
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter meeting passcode"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                >
                  Join Live Stage Now
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                    Connected to Stage (Meeting: {cleanMeetingId})
                  </span>
                  <span className="text-xs font-mono font-medium bg-muted px-2.5 py-1 rounded border border-border text-foreground">
                    Passcode: tcW3rK
                  </span>
                </div>
                <button
                  onClick={() => setIsJoined(false)}
                  className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted"
                >
                  Exit Stage
                </button>
              </div>
              <div className="relative overflow-hidden rounded-2xl border border-border bg-black aspect-video sm:h-[620px] w-full">
                <iframe
                  src={zoomEmbedUrl}
                  title="PAMHO Zoom Stage"
                  className="h-full w-full border-0"
                  allow="camera *; microphone *; display-capture *; autoplay *; clipboard-read *; clipboard-write *; fullscreen *"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ConversationPage() {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  function getTimeRemaining() {
    const total = EVENT_TARGET_DATE - new Date().getTime();
    const seconds = Math.max(0, Math.floor((total / 1000) % 60));
    const minutes = Math.max(0, Math.floor((total / 1000 / 60) % 60));
    const hours = Math.max(0, Math.floor((total / (1000 * 60 * 60)) % 24));
    const days = Math.max(0, Math.floor(total / (1000 * 60 * 60 * 24)));
    return { total, days, hours, minutes, seconds };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Show live stage if time left is less than or equal to 1 day
  const isEveOfEvent = timeLeft.total <= 24 * 60 * 60 * 1000;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="The Conversation — PAMHO Virtual Stage"
        description="Join the live Pan-African Mental Health Conversation stage."
      />
      <Toaster />
      <Nav />

      {/* Hero Header */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, oklch(0.32 0.13 305 / 0.18), transparent 60%), var(--background)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
          style={{ backgroundImage: `url(${pattern})`, backgroundSize: "320px" }}
        />
        <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-8 lg:py-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
            {isEveOfEvent ? (
              <>
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Stage Portal
              </>
            ) : (
              <>
                <Calendar className="h-3.5 w-3.5" />
                Upcoming Event
              </>
            )}
          </span>
          <h1 className="mt-6 font-display text-[2.4rem] font-semibold leading-[1.05] text-primary sm:text-5xl lg:text-[3.5rem]">
            The Pan-African Mental Health{" "}
            <span className="italic text-[oklch(0.45_0.16_305)]">Conversation</span>
          </h1>
          <p className="mt-4 font-display text-xl italic text-[oklch(0.45_0.16_305)]">
            An Online Continental Dialogue on Mental Health in Africa
          </p>
        </div>
      </section>

      {/* Conditional: Embedded Zoom Virtual Stage or Countdown */}
      {isEveOfEvent ? (
        <ZoomStage />
      ) : (
        <section className="py-20 bg-primary/5 border-y border-border/60">
          <div className="mx-auto max-w-4xl px-5 sm:px-8 text-center">
            <h2 className="font-display text-3xl font-semibold text-primary sm:text-4xl mb-12">
              The Continental Dialogue Begins In:
            </h2>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
              {[
                [timeLeft.days, "Days"],
                [timeLeft.hours, "Hours"],
                [timeLeft.minutes, "Minutes"],
                [timeLeft.seconds, "Seconds"],
              ].map(([val, label]) => (
                <div
                  key={label as string}
                  className="flex flex-col items-center justify-center rounded-3xl bg-card border border-primary/15 px-6 py-6 sm:px-10 sm:py-8 shadow-xl min-w-[110px] sm:min-w-[160px]"
                >
                  <span className="font-display text-5xl sm:text-7xl font-bold tracking-tight text-primary">
                    {String(val).padStart(2, "0")}
                  </span>
                  <span className="mt-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}