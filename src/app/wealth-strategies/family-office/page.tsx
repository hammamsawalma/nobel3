"use client";

import SubpageHero from "@/components/SubpageHero";
import CinematicReveal from "@/components/CinematicReveal";
import Link from "next/link";
import { Users, Building2, Key } from "lucide-react";
import ScrollSpyNav from "@/components/ScrollSpyNav";

export default function FamilyOfficePage() {
    const sections = [
        { id: "overview", label: "Overview" },
        { id: "services", label: "Core Services" },
        { id: "legacy", label: "Legacy" }
    ];

    return (
        <>
            <SubpageHero
                title="Family Office Services"
                subtitle="Multigenerational Wealth Stewardship & Governance."
                bgImage="/images/sections/services_cards.png"
            />

            <section className="section-padding">
                <div className="container-noble scrollspy-layout" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "4rem" }}>

                    <ScrollSpyNav sections={sections} />

                    <div style={{ maxWidth: "800px" }}>
                        <CinematicReveal>
                            <div id="overview" style={{ marginBottom: "6rem", paddingTop: "2rem" }}>
                                <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2.5rem", color: "var(--color-noble-gold)", marginBottom: "2rem" }}>
                                    Beyond Capital Management
                                </h2>
                                <p style={{ color: "var(--color-noble-slate)", fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "2rem" }}>
                                    Significant wealth brings profound complexity. Our Family Office advisory transcends traditional investment management to serve as the financial architect for your entire estate. We orchestrate tax, legal, philanthropic, and succession planning to ensure the unified continuity of your family&apos;s legacy across generations.
                                </p>
                            </div>
                        </CinematicReveal>

                        <div id="services" style={{ marginBottom: "6rem", paddingTop: "2rem" }}>
                            <CinematicReveal>
                                <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", color: "var(--color-noble-ivory)", marginBottom: "2rem" }}>
                                    Holistic Infrastructure
                                </h2>
                            </CinematicReveal>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
                                {[
                                    { icon: <Building2 size={32} />, title: "Estate Architecture", desc: "Coordination with tier-one legal and tax councils to engineer robust trust structures and asset protection frameworks." },
                                    { icon: <Users size={32} />, title: "Family Governance", desc: "Establishing formal family constitutions, investment committees, and educational programs for the succeeding generation." },
                                    { icon: <Key size={32} />, title: "Consolidated Reporting", desc: "Institutional-level aggregated reporting across all entities, private investments, and operating businesses." }
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
                            <div id="legacy" style={{ paddingTop: "2rem" }}>
                                <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", color: "var(--color-noble-gold)", marginBottom: "2rem" }}>
                                    Securing The Legacy
                                </h2>
                                <p style={{ color: "var(--color-noble-slate)", fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "2rem" }}>
                                    The greatest threat to generational wealth is rarely poor investment performance, but rather inadequate governance and preparation. We ensure that the mechanics of your wealth transfer are executed flawlessly, whilst preparing the heirs to be responsible custodians of the family capital.
                                </p>
                                <div style={{ borderLeft: "2px solid var(--color-noble-gold)", paddingLeft: "1.5rem", margin: "2rem 0" }}>
                                    <blockquote style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", fontSize: "1.25rem", color: "var(--color-noble-ivory)" }}>
                                        "Wealth preservation is 20% portfolio construction and 80% family governance."
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
