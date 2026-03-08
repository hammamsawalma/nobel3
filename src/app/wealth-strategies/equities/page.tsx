"use client";

import SubpageHero from "@/components/SubpageHero";
import CinematicReveal from "@/components/CinematicReveal";
import Link from "next/link";
import { CheckCircle2, TrendingUp, Shield } from "lucide-react";
import ScrollSpyNav from "@/components/ScrollSpyNav";

export default function EquitiesPage() {
    const sections = [
        { id: "philosophy", label: "Philosophy" },
        { id: "allocation", label: "Allocation" },
        { id: "mandate", label: "Mandate" }
    ];

    return (
        <>
            <SubpageHero
                title="Strategic Equities"
                subtitle="Conviction-Driven, Fundamental Allocation."
                bgImage="/images/sections/investment_philosophy.png"
            />

            <section className="section-padding">
                <div className="container-noble scrollspy-layout" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "4rem" }}>

                    <ScrollSpyNav sections={sections} />

                    <div style={{ maxWidth: "800px" }}>
                        <CinematicReveal>
                            <div id="philosophy" style={{ marginBottom: "6rem", paddingTop: "2rem" }}>
                                <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2.5rem", color: "var(--color-noble-gold)", marginBottom: "2rem" }}>
                                    Margin of Safety
                                </h2>
                                <p style={{ color: "var(--color-noble-slate)", fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "2rem" }}>
                                    Our approach to equities is rooted in deep fundamental analysis and a strict 'Margin of Safety' discipline. We seek exceptional businesses with wide economic moats, formidable pricing power, and visionary leadership, acquiring them only when the market offers them at a discount to intrinsic value.
                                </p>
                            </div>
                        </CinematicReveal>

                        <div id="allocation" style={{ marginBottom: "6rem", paddingTop: "2rem" }}>
                            <CinematicReveal>
                                <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", color: "var(--color-noble-ivory)", marginBottom: "2rem" }}>
                                    Portfolio Allocation Structure
                                </h2>
                            </CinematicReveal>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
                                {[
                                    { icon: <Shield size={32} />, title: "Core Compounders", desc: "Long-term holdings in globally dominant franchises that generate superior returns on invested capital over decades." },
                                    { icon: <TrendingUp size={32} />, title: "Asymmetric Opportunities", desc: "Special situations and mispriced assets where the upside potential heavily outweighs downside risk." },
                                    { icon: <CheckCircle2 size={32} />, title: "Capital Distribution", desc: "Focus on entities with a proven track record of disciplined capital return through growing dividends and buybacks." }
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
                            <div id="mandate" style={{ paddingTop: "2rem" }}>
                                <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", color: "var(--color-noble-gold)", marginBottom: "2rem" }}>
                                    The Mandate
                                </h2>
                                <p style={{ color: "var(--color-noble-slate)", fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "2rem" }}>
                                    We do not track indices; we construct concentrated portfolios representing our highest conviction ideas. This absolute-return focus ensures that our clients&apos; capital is deployed only when the mathematical probability of long-term outperformance is historically significant.
                                </p>
                                <div style={{ borderLeft: "2px solid var(--color-noble-gold)", paddingLeft: "1.5rem", margin: "2rem 0" }}>
                                    <blockquote style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", fontSize: "1.25rem", color: "var(--color-noble-ivory)" }}>
                                        "Risk comes from not knowing what you're doing. Volatility is just the price of admission for long-term compounders."
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
