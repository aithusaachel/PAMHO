import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Reveal } from '../components/Reveal';
import { PAMHO_TEAMS, VOLUNTEER_CONFIG } from '../utils/volunteerData';

export default function VolunteerHub() {
  const romanNumerals = ['I', 'II', 'III', 'IV'];

  return (
    <div className="flex flex-col min-h-screen relative bg-[#030303]">
      <SEO
        title="Lead or Join a PAMHO Team — Volunteer Opportunities"
        description="PAMHO is growing its volunteer teams across Africa. Whether you want to lead a team or join one, you can apply here and work with us online from wherever you are on the continent."
      />
      <div className="grain-overlay"></div>

      {/* ============================================================ */}
      {/* 1. CINEMATIC HERO                                            */}
      {/* ============================================================ */}
      <section className="relative h-[80vh] min-h-[640px] w-full flex flex-col justify-center pt-24 border-b border-[rgba(245,242,233,0.05)]">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/programs_hero.jpg"
            alt="Pan-African Mental Health Organization Leadership"
            className="w-full h-full object-cover filter brightness-[0.28] contrast-[1.1] saturate-[0.7]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/60 to-[#030303]/30"></div>
        </div>

        <div className="canvas-container relative z-10 text-center flex flex-col items-center">
          <Reveal>
            <p className="font-serif italic text-xl md:text-2xl text-[rgba(245,242,233,0.7)] mb-4 font-light">
              Healthy Minds, Healthy Lives.
            </p>
            <h1 className="title-hero max-w-5xl mx-auto drop-shadow-lg mb-8">
              Lead or Join a <span className="italic text-[rgba(245,242,233,0.7)]">PAMHO Team.</span>
            </h1>
            <p className="text-body-large text-[rgba(245,242,233,0.65)] font-light max-w-3xl mx-auto leading-relaxed mb-12">
              PAMHO is growing its volunteer teams across Africa. Whether you want to lead a team or join one,
              you can apply here and work with us online from wherever you are on the continent.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/volunteer/lead" className="btn-cinematic">
                I want to lead a team
              </Link>
              <Link to="/volunteer/join" className="btn-cinematic">
                I want to join a team
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. OUR FOUR TEAMS                                            */}
      {/* ============================================================ */}
      <section className="py-28 md:py-36 bg-[#110E0C]">
        <div className="canvas-container">
          <Reveal>
            <div className="max-w-4xl mb-20">
              <h2 className="title-section mb-6">Our four teams.</h2>
              <p className="text-body-large text-[rgba(245,242,233,0.6)] font-light leading-relaxed">
                Our volunteer structure brings together dedicated professionals, researchers, creatives, and organizers working in four specialized continental teams.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
            {PAMHO_TEAMS.map((team, idx) => (
              <Reveal key={team.id} delay={idx * 100}>
                <div className="border-t border-[rgba(245,242,233,0.1)] pt-10">
                  <span className="font-serif text-[#8442FA] text-5xl mb-6 block opacity-40">
                    {romanNumerals[idx]}
                  </span>
                  <h3 className="font-serif text-3xl md:text-4xl text-[#F5F2E9] mb-4">
                    {team.name}
                  </h3>
                  <p className="font-sans font-light text-[rgba(245,242,233,0.7)] text-base md:text-lg leading-relaxed mb-8">
                    {team.description}
                  </p>

                  <div className="border-t border-[rgba(245,242,233,0.06)] pt-6">
                    <span className="label-tracking text-[rgba(245,242,233,0.4)] block mb-4">
                      Skills we are looking for
                    </span>
                    <ul className="space-y-2.5">
                      {team.skillsLookingFor.map((skill) => (
                        <li key={skill} className="flex items-start gap-3 text-sm text-[rgba(245,242,233,0.7)] font-light">
                          <span className="text-[#8442FA] mt-1 text-xs">&mdash;</span>
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. WHAT TO EXPECT                                            */}
      {/* ============================================================ */}
      <section className="py-28 md:py-36 bg-[#030303] border-t border-[rgba(245,242,233,0.05)]">
        <div className="canvas-container">
          <Reveal>
            <div className="max-w-4xl mb-20">
              <h2 className="title-section mb-6">What to expect.</h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            <Reveal delay={0}>
              <div className="border-t border-[rgba(245,242,233,0.1)] pt-8">
                <span className="label-tracking text-[rgba(245,242,233,0.4)] block mb-4">Commitment</span>
                <h4 className="font-serif text-2xl md:text-3xl text-[#F5F2E9] mb-4">
                  These are unpaid volunteer roles.
                </h4>
                <p className="font-sans font-light text-[rgba(245,242,233,0.55)] leading-relaxed">
                  Driven by purpose and solidarity, our volunteers contribute their skills to define a new standard of mental health across Africa.
                </p>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="border-t border-[rgba(245,242,233,0.1)] pt-8">
                <span className="label-tracking text-[rgba(245,242,233,0.4)] block mb-4">Probation & Growth</span>
                <h4 className="font-serif text-2xl md:text-3xl text-[#F5F2E9] mb-4">
                  Six-month probation, followed by a review.
                </h4>
                <p className="font-sans font-light text-[rgba(245,242,233,0.55)] leading-relaxed">
                  Every appointment begins with a six-month probation period to support your onboarding and confirm mutual alignment before formal renewal.
                </p>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="border-t border-[rgba(245,242,233,0.1)] pt-8">
                <span className="label-tracking text-[rgba(245,242,233,0.4)] block mb-4">Location</span>
                <h4 className="font-serif text-2xl md:text-3xl text-[#F5F2E9] mb-4">
                  All work is done online.
                </h4>
                <p className="font-sans font-light text-[rgba(245,242,233,0.55)] leading-relaxed">
                  Collaborate remotely from wherever you are based across the continent or diaspora through modern asynchronous workflows.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. HOW TO APPLY & TIMELINE                                   */}
      {/* ============================================================ */}
      <section className="py-28 md:py-36 bg-[#110E0C] border-t border-[rgba(245,242,233,0.05)]">
        <div className="canvas-container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
            <div className="md:col-span-5 relative">
              <Reveal className="sticky top-48">
                <h2 className="title-section mb-6">How to apply.</h2>
                <p className="font-sans font-light text-[rgba(245,242,233,0.6)] leading-relaxed mb-8">
                  We review applications on a rolling intake schedule. Please ensure you have sufficient uninterrupted time to complete your submission.
                </p>
                <div className="border-t border-[rgba(245,242,233,0.1)] pt-6 text-sm font-sans font-light text-[rgba(245,242,233,0.7)] space-y-2">
                  <p>Applications close on <strong className="text-[#F5F2E9] font-medium">{VOLUNTEER_CONFIG.closingDate}</strong>.</p>
                  <p>We will respond to every applicant by <strong className="text-[#F5F2E9] font-medium">{VOLUNTEER_CONFIG.responseDate}</strong>.</p>
                </div>
              </Reveal>
            </div>

            <div className="md:col-span-7 flex flex-col justify-center">
              <Reveal delay={200}>
                <div className="space-y-12">
                  <div className="border-t border-[rgba(245,242,233,0.1)] pt-8">
                    <span className="font-serif text-[#8442FA] text-3xl mb-3 block opacity-60">1.</span>
                    <h4 className="font-serif text-2xl text-[#F5F2E9] mb-3">
                      Choose whether you want to lead a team or join one.
                    </h4>
                    <p className="font-sans font-light text-[rgba(245,242,233,0.6)] leading-relaxed">
                      Determine if your background fits team leadership (strategic vision, 30-day roadmap, management) or specialist contributor roles (direct skill delivery).
                    </p>
                  </div>

                  <div className="border-t border-[rgba(245,242,233,0.1)] pt-8">
                    <span className="font-serif text-[#8442FA] text-3xl mb-3 block opacity-60">2.</span>
                    <h4 className="font-serif text-2xl text-[#F5F2E9] mb-3">
                      Complete the application form. It takes about one hour.
                    </h4>
                    <p className="font-sans font-light text-[rgba(245,242,233,0.6)] leading-relaxed">
                      Complete all five parts with care. Have your CV (PDF), work links or samples, and contact information for two referees on hand.
                    </p>
                  </div>

                  <div className="border-t border-[rgba(245,242,233,0.1)] pt-8">
                    <span className="font-serif text-[#8442FA] text-3xl mb-3 block opacity-60">3.</span>
                    <h4 className="font-serif text-2xl text-[#F5F2E9] mb-3">
                      Shortlisted applicants will be contacted by email for an interview.
                    </h4>
                    <p className="font-sans font-light text-[rgba(245,242,233,0.6)] leading-relaxed">
                      Every submission is carefully reviewed by the PAMHO executive council. We notify every applicant directly by the stated response date.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. CHOOSE YOUR APPLICATION                                   */}
      {/* ============================================================ */}
      <section className="py-32 md:py-48 bg-[#030303] text-center border-t border-[rgba(245,242,233,0.05)]">
        <div className="canvas-container flex flex-col items-center max-w-4xl mx-auto">
          <Reveal>
            <h2 className="title-section mb-8">Choose your application.</h2>
            <p className="text-body-large text-[rgba(245,242,233,0.5)] font-light mb-16 max-w-2xl mx-auto">
              Select the appropriate application portal below to begin your online submission.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl mx-auto">
              <div className="border border-[rgba(245,242,233,0.1)] p-10 bg-[#110E0C] text-left flex flex-col justify-between">
                <div>
                  <span className="label-tracking text-[rgba(245,242,233,0.4)] mb-4 block">Track I</span>
                  <h3 className="font-serif text-3xl text-[#F5F2E9] mb-4">Leadership Track</h3>
                  <p className="font-sans font-light text-[rgba(245,242,233,0.6)] text-sm leading-relaxed mb-8">
                    Direct strategy, build 30-day operational plans, and coordinate team deliverables.
                  </p>
                </div>
                <Link to="/volunteer/lead" className="btn-cinematic w-full text-center">
                  I want to lead a team
                </Link>
              </div>

              <div className="border border-[rgba(245,242,233,0.1)] p-10 bg-[#110E0C] text-left flex flex-col justify-between">
                <div>
                  <span className="label-tracking text-[rgba(245,242,233,0.4)] mb-4 block">Track II</span>
                  <h3 className="font-serif text-3xl text-[#F5F2E9] mb-4">Specialist Track</h3>
                  <p className="font-sans font-light text-[rgba(245,242,233,0.6)] text-sm leading-relaxed mb-8">
                    Contribute your specific skills in research, design, coding, grants, media, or operations.
                  </p>
                </div>
                <Link to="/volunteer/join" className="btn-cinematic w-full text-center">
                  I want to join a team
                </Link>
              </div>
            </div>

            <div className="mt-24 pt-8 border-t border-[rgba(245,242,233,0.05)] w-full">
              <p className="label-tracking !text-[10px] text-[rgba(245,242,233,0.3)]">
                Pan-African Mental Health Organization &middot; Healthy Minds, Healthy Lives.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
