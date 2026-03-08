import SubpageHero from "@/components/SubpageHero";
import CinematicReveal from "@/components/CinematicReveal";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: "The Firm | Noble Rock Private Wealth",
    description: "A heritage of institutional-grade wealth management formulated in 1987."
};

const timeline = [
    { year: "1987", title: "Foundation", desc: "Established in Sydney to serve three prominent family offices with a strict fiduciary mandate." },
    { year: "1999", title: "Global Expansion", desc: "Initiated direct global equity mandates and established international custodian relationships." },
    { year: "2008", title: "The GFC Resilience", desc: "Our Absolute Return framework successfully insulated client capital from systemic drawdowns." },
    { year: "2024", title: "Institutional Evolution", desc: "Launched enhanced Family Office administration services tailored for ultra-high-net-worth complexities." }
];

const committee = [
    { name: "Arthur Sterling", role: "Chief Executive Officer & Founder", image: "/images/sections/team_leadership.png" },
    { name: "Eleanor Vance", role: "Chief Investment Officer", image: "/images/sections/team_leadership.png" },
    { name: "William Thorne", role: "Head of Private Client Services", image: "/images/sections/team_leadership.png" },
];

export default function TheFirmPage() {
    return (
        <>
            <SubpageHero
                title="The Firm"
                subtitle="Generational Stewardship Since 1987."
                bgImage="/images/pages/heritage_history.png"
            />

            {/* Philosophy — Island */}
            <section className="island-section noise-overlay" style={{ background: "var(--color-noble-navy)", position: "relative", overflow: "hidden" }}>
                <span className="section-watermark">I</span>
                <div className="container-noble section-padding" style={{ maxWidth: "800px", textAlign: "center", position: "relative", zIndex: 2 }}>
                    <CinematicReveal>
                        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2.5rem", color: "var(--color-noble-gold)", marginBottom: "2rem" }}>
                            The Absolute Fiduciary Standard
                        </h2>
                        <p style={{ color: "var(--color-noble-slate)", fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "2rem" }}>
                            Noble Rock was established on a singular premise: that true wealth management requires the <span className="gold-highlight">complete elimination of conflicts of interest</span>. We do not sell products; we do not accept commissions. We sit on the same side of the table as our clients, deploying capital with <span className="gold-highlight">institutional rigor</span> and uncompromising conviction.
                        </p>
                    </CinematicReveal>
                </div>
            </section>

            {/* Heritage Timeline — Island with 3D Cards */}
            <section className="island-section noise-overlay" style={{ background: "var(--color-noble-black)", position: "relative", overflow: "hidden" }}>
                <span className="section-watermark">II</span>
                <div className="container-noble section-padding" style={{ position: "relative", zIndex: 2 }}>
                    <CinematicReveal>
                        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2.5rem", color: "var(--color-noble-ivory)", textAlign: "center", marginBottom: "4rem" }}>
                            A Heritage of <span className="text-gold-gradient">Resilience</span>
                        </h2>
                    </CinematicReveal>

                    {/* Horizontal Timeline Cards */}
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                        gap: "1.5rem",
                        position: "relative",
                    }}>
                        {/* Connecting line */}
                        <div style={{
                            position: "absolute",
                            top: "3.5rem",
                            left: "2rem",
                            right: "2rem",
                            height: "1px",
                            background: "linear-gradient(90deg, transparent, rgba(201, 168, 76, 0.3), rgba(201, 168, 76, 0.3), transparent)",
                            zIndex: 0,
                        }} />

                        {timeline.map((item, idx) => (
                            <CinematicReveal key={idx} type="fadeUp" delay={idx * 0.15}>
                                <div
                                    className="glass-card"
                                    style={{
                                        padding: "2rem",
                                        position: "relative",
                                        zIndex: 1,
                                        textAlign: "center",
                                    }}
                                >
                                    {/* Year dot */}
                                    <div style={{
                                        width: "16px",
                                        height: "16px",
                                        borderRadius: "50%",
                                        background: "var(--color-noble-gold)",
                                        margin: "0 auto 1.5rem",
                                        boxShadow: "0 0 16px rgba(201, 168, 76, 0.4)",
                                    }} />

                                    <div style={{ fontSize: "2rem", fontFamily: "var(--font-heading)", color: "var(--color-noble-gold)", marginBottom: "0.5rem", fontWeight: 700 }}>
                                        {item.year}
                                    </div>
                                    <h3 style={{ fontSize: "1.125rem", color: "var(--color-noble-ivory)", marginBottom: "0.75rem", fontFamily: "var(--font-heading)", fontWeight: 600 }}>
                                        {item.title}
                                    </h3>
                                    <p style={{ color: "var(--color-noble-slate)", fontSize: "0.9rem", lineHeight: 1.6 }}>{item.desc}</p>
                                </div>
                            </CinematicReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Executive Committee — Floating Portrait Islands */}
            <section className="island-section noise-overlay" style={{ background: "var(--color-noble-navy)", position: "relative", overflow: "hidden" }}>
                <span className="section-watermark">III</span>
                <div className="container-noble section-padding" style={{ position: "relative", zIndex: 2 }}>
                    <CinematicReveal>
                        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2.5rem", color: "var(--color-noble-gold)", textAlign: "center", marginBottom: "4rem" }}>
                            Executive Committee
                        </h2>
                    </CinematicReveal>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
                        {committee.map((person, idx) => (
                            <CinematicReveal key={idx} delay={idx * 0.2}>
                                <div className="glass-card" style={{ overflow: "hidden" }}>
                                    <div style={{ position: "relative", height: "300px", width: "100%", opacity: 0.6 }}>
                                        <Image src={person.image} alt={person.name} fill style={{ objectFit: "cover", filter: "grayscale(100%)" }} />
                                        {/* Gradient overlay */}
                                        <div style={{
                                            position: "absolute",
                                            inset: 0,
                                            background: "linear-gradient(to top, var(--color-noble-charcoal) 0%, transparent 60%)",
                                        }} />
                                    </div>
                                    <div style={{
                                        padding: "1.5rem",
                                        background: "var(--color-noble-charcoal)",
                                        borderTop: "1px solid rgba(201,168,76,0.12)",
                                    }}>
                                        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", color: "var(--color-noble-ivory)", marginBottom: "0.25rem" }}>{person.name}</h3>
                                        <p style={{ color: "var(--color-noble-gold-muted)", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>{person.role}</p>
                                    </div>
                                </div>
                            </CinematicReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Awards Showcase — Island */}
            <section className="island-section noise-overlay" style={{
                position: "relative",
                overflow: "hidden",
                backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.85), rgba(10, 10, 10, 0.95)), url('/branding_images/awards_recognition_background.png')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}>
                <div className="container-noble section-padding" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
                    <CinematicReveal>
                        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", color: "var(--color-noble-ivory)", marginBottom: "3rem" }}>
                            Industry Recognition
                        </h2>
                        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "3rem", color: "var(--color-noble-gold-muted)", fontFamily: "var(--font-heading)", fontSize: "1.25rem", letterSpacing: "0.05em" }}>
                            <div>&ldquo;Best Multi-Family Office 2023&rdquo;</div>
                            <div>&ldquo;Excellence in Fiduciary Advice&rdquo;</div>
                            <div>&ldquo;Top 50 Wealth Managers APAC&rdquo;</div>
                        </div>
                    </CinematicReveal>
                </div>
            </section>

            {/* CTA — Island */}
            <section className="island-section noise-overlay" style={{ background: "var(--color-noble-black)", position: "relative", overflow: "hidden", textAlign: "center", borderTop: "1px solid rgba(201, 168, 76, 0.06)" }}>
                <div className="container-noble section-padding" style={{ position: "relative", zIndex: 2 }}>
                    <CinematicReveal>
                        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2.5rem", color: "var(--color-noble-gold)", marginBottom: "1.5rem" }}>
                            Begin The Conversation
                        </h2>
                        <p style={{ color: "var(--color-noble-slate)", marginBottom: "3rem", fontSize: "1.1rem" }}>
                            Confidentiality and absolute discretion are the hallmarks of our initial engagements.
                        </p>
                        <Link href="/contact" className="btn-noble-primary" style={{ borderRadius: "100px" }}>
                            Request Audience
                        </Link>
                    </CinematicReveal>
                </div>
            </section>

        </>
    );
}
