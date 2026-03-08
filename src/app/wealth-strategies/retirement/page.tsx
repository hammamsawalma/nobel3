"use client";

import SubpageHero from "@/components/SubpageHero";
import CinematicReveal from "@/components/CinematicReveal";
import Link from "next/link";
import { PiggyBank, Clock, Scale } from "lucide-react";
import ScrollSpyNav from "@/components/ScrollSpyNav";

export default function RetirementPage() {
    const sections = [
        { id: "philosophy", label: "Philosophy" },
        { id: "pillars", label: "Strategic Pillars" },
        { id: "longevity", label: "Longevity" }
    ];

    return (
        <>
            <SubpageHero
                title="Retirement Planning"
                subtitle="Sustaining Lifestyle. Outpacing Inflation."
                bgImage="/images/sections/portfolio.png"
            />

            <section className="section-padding">
                <div className="container-noble scrollspy-layout" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "4rem" }}>

                    <ScrollSpyNav sections={sections} />

                    <div style={{ maxWidth: "800px" }}>
                        <CinematicReveal>
                            <div id="philosophy" style={{ marginBottom: "6rem", paddingTop: "2rem" }}>
                                <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2.5rem", color: "var(--color-noble-gold)", marginBottom: "2rem" }}>
                                    Decumulation Protocol
                                </h2>
                                <p style={{ color: "var(--color-noble-slate)", fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "2rem" }}>
                                    The cognitive shift from accumulating capital to drawing down capital requires a fundamentally different architecture. Our retirement frameworks are engineered to solve the triad of retirement risks: longevity risk (outliving capital), inflation risk (purchasing power erosion), and sequence of returns risk (market drawdowns early in retirement).
                                </p>
                            </div>
                        </CinematicReveal>

                        <div id="pillars" style={{ marginBottom: "6rem", paddingTop: "2rem" }}>
                            <CinematicReveal>
                                <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", color: "var(--color-noble-ivory)", marginBottom: "2rem" }}>
                                    Strategic Pillars
                                </h2>
                            </CinematicReveal>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
                                {[
                                    { icon: <Clock size={32} />, title: "Sequence Mitigation", desc: "Constructing staggered liquidity reserves to ensure capital is never forcefully sold during equity market contractions." },
                                    { icon: <Scale size={32} />, title: "Tax Arbitrage", desc: "Sophisticated drawdown strategies across SMSFs, corporate entities, and personal structures to minimize systemic tax drag." },
                                    { icon: <PiggyBank size={32} />, title: "Income Reliability", desc: "Engineering portfolios that generate sustainable, inflation-adjusted, and tax-efficient yield independently of capital liquidation." }
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
                            <div id="longevity" style={{ paddingTop: "2rem" }}>
                                <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", color: "var(--color-noble-gold)", marginBottom: "2rem" }}>
                                    Capital Longevity
                                </h2>
                                <p style={{ color: "var(--color-noble-slate)", fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "2rem" }}>
                                    We model extreme scenarios, applying historical stress tests to your portfolio to ensure absolute confidence that your capital base will outlast your requirements, allowing you to focus entirely on the qualitative aspects of your post-career life.
                                </p>
                                <div style={{ borderLeft: "2px solid var(--color-noble-gold)", paddingLeft: "1.5rem", margin: "2rem 0" }}>
                                    <blockquote style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", fontSize: "1.25rem", color: "var(--color-noble-ivory)" }}>
                                        "The objective of retirement planning is not merely to survive financially, but to endure with uncompromised dignity and peace of mind."
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
