import SubpageHero from "@/components/SubpageHero";
import CinematicReveal from "@/components/CinematicReveal";
import Link from "next/link";
import { Shield, TrendingUp, BarChart3 } from "lucide-react";
import ScrollSpyNav from "@/components/ScrollSpyNav";

export const metadata = {
    title: "Fixed Income Strategy",
    description: "Institutional-grade bond portfolios and capital preservation strategies for ultra-high-net-worth individuals."
};

const sections = [
    { id: "overview", label: "Overview" },
    { id: "methodology", label: "Methodology" },
    { id: "instruments", label: "Instruments" }
];

export default function FixedIncomePage() {
    return (
        <>
            <SubpageHero
                title="Fixed Income"
                subtitle="Asymmetric Risk, Assured Capital Preservation."
                bgImage="/images/sections/portfolio.png"
            />

            <section className="section-padding">
                <div className="container-noble scrollspy-layout" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "4rem" }}>

                    <ScrollSpyNav sections={sections} />

                    <div style={{ maxWidth: "800px" }}>
                        <CinematicReveal>
                            <div id="overview" style={{ marginBottom: "6rem", paddingTop: "2rem" }}>
                                <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2.5rem", color: "var(--color-noble-gold)", marginBottom: "2rem" }}>
                                    Defense Over Offense
                                </h2>
                                <p style={{ color: "var(--color-noble-slate)", fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "2rem" }}>
                                    At Noble Rock, our Fixed Income mandate is singular: absolute capital preservation. We construct bespoke bond portfolios utilizing sovereign debt, high-grade corporate credit, and municipal structures designed to immunize your capital from market volatility while generating tax-efficient yield.
                                </p>
                            </div>
                        </CinematicReveal>

                        <div id="methodology" style={{ marginBottom: "6rem", paddingTop: "2rem" }}>
                            <CinematicReveal>
                                <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", color: "var(--color-noble-ivory)", marginBottom: "2rem" }}>
                                    Core Methodology
                                </h2>
                            </CinematicReveal>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
                                {[
                                    { icon: <Shield size={32} />, title: "Sovereign Security", desc: "Anchored in AAA-rated global sovereign bonds to provide absolute liquidity and zero default risk during tail events." },
                                    { icon: <TrendingUp size={32} />, title: "Yield Optimization", desc: "Tactical duration management across the yield curve to capture premium without assuming proportional systemic risk." },
                                    { icon: <BarChart3 size={32} />, title: "Liability Matching", desc: "Custom cash-flow structuring engineered specifically to fund your legacy liabilities and generational lifestyle requirements." }
                                ].map((f, idx) => (
                                    <CinematicReveal key={idx} delay={idx * 0.2}>
                                        <div className="glass-card" style={{ padding: "3rem 2rem", textAlign: "center", height: "100%" }}>
                                            <div style={{ color: "var(--color-noble-gold)", marginBottom: "1.5rem", display: "flex", justifyContent: "center" }}>
                                                {f.icon}
                                            </div>
                                            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.35rem", color: "var(--color-noble-ivory)", marginBottom: "1rem" }}>{f.title}</h3>
                                            <p style={{ color: "var(--color-noble-slate)", lineHeight: 1.6, fontSize: "0.95rem" }}>{f.desc}</p>
                                        </div>
                                    </CinematicReveal>
                                ))}
                            </div>
                        </div>

                        <CinematicReveal>
                            <div id="instruments" style={{ paddingTop: "2rem" }}>
                                <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", color: "var(--color-noble-gold)", marginBottom: "2rem" }}>
                                    Targeted Instruments
                                </h2>
                                <p style={{ color: "var(--color-noble-slate)", fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "2rem" }}>
                                    We dynamically navigate across the fixed income spectrum. Our allocations span from highly liquid US Treasuries to specialized Senior Secured Syndicated Loans, always prioritising security of principal over marginal yield chasing.
                                </p>
                                <div style={{ borderLeft: "2px solid var(--color-noble-gold)", paddingLeft: "1.5rem", margin: "2rem 0" }}>
                                    <blockquote style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", fontSize: "1.25rem", color: "var(--color-noble-ivory)" }}>
                                        "Return of capital always supersedes return on capital."
                                    </blockquote>
                                </div>
                                <div style={{ marginTop: "4rem" }}>
                                    <Link href="/contact" className="noble-button">
                                        Request Audience
                                    </Link>
                                </div>
                            </div>
                        </CinematicReveal>
                    </div>
                </div>
            </section>
        </>
    );
}
