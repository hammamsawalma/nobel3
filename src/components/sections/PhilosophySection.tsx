"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import CinematicReveal from "@/components/CinematicReveal";
import StaggeredBlurText from "@/components/StaggeredBlurText";
import IslandCard from "@/components/IslandCard";
import { Eye, Shield, TrendingUp } from "lucide-react";

const themes = [
    {
        icon: Eye,
        title: "Capital Preservation",
        description: "Every allocation decision is weighed against a singular imperative — protect the permanent capital base against permanent loss.",
    },
    {
        icon: Shield,
        title: "Fiduciary Integrity",
        description: "As fee-only advisors, our recommendations carry no commission bias. Our interests are mathematically aligned with yours.",
    },
    {
        icon: TrendingUp,
        title: "Compound Discipline",
        description: "We harness the asymmetry of compounding — small, consistent returns, sheltered from catastrophic drawdowns, compound into extraordinary wealth.",
    },
];

const timeline = [
    { phase: "01", title: "Discovery & Assessment", desc: "Comprehensive review of your capital structure, risk tolerance, and generational objectives." },
    { phase: "02", title: "Strategy Architecture", desc: "Custom portfolio construction using institutional-grade asset allocation frameworks." },
    { phase: "03", title: "Disciplined Execution", desc: "Systematic deployment with staged entry protocols and risk-controlled position sizing." },
    { phase: "04", title: "Ongoing Stewardship", desc: "Quarterly reviews, tactical rebalancing, and proactive response to market regime changes." },
];

export default function PhilosophySection() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

    return (
        <section
            ref={containerRef}
            className="island-section noise-overlay"
            style={{
                position: "relative",
                overflow: "hidden",
                background: "linear-gradient(to bottom, var(--color-noble-charcoal), var(--color-noble-black))",
            }}
        >
            {/* Background Parallax Layer */}
            <motion.div style={{ position: "absolute", inset: "-15% 0 -15% 0", zIndex: 0, y }}>
                <Image
                    src="/images/sections/investment_philosophy.png"
                    alt="Investment Study"
                    fill
                    style={{ objectFit: "cover", opacity: 0.08 }}
                />
            </motion.div>

            {/* Watermark */}
            <span className="section-watermark">03</span>

            <div className="container-noble section-padding" style={{ position: "relative", zIndex: 2 }}>
                {/* Section Label */}
                <CinematicReveal type="fadeUp">
                    <div style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--color-noble-gold-muted)", fontWeight: 500, marginBottom: "1rem" }}>
                        Investment Philosophy
                    </div>
                </CinematicReveal>

                <CinematicReveal type="fadeUp" delay={0.1}>
                    <StaggeredBlurText text="The Noble Rock Protocol." as="h2" />
                </CinematicReveal>
                <CinematicReveal type="fadeUp" delay={0.2}>
                    <div className="gold-divider" style={{ margin: "1.5rem 0 3rem" }} />
                </CinematicReveal>

                {/* Macro Themes — Bento Grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gridTemplateRows: "auto auto",
                    gap: "1.5rem",
                    marginBottom: "4rem",
                }}>
                    {themes.map((theme, i) => {
                        const Icon = theme.icon;
                        const isFeature = i === 0;
                        return (
                            <CinematicReveal key={theme.title} type="fadeUp" delay={0.15 * i + 0.3}>
                                <IslandCard
                                    tiltIntensity={5}
                                    floatIdle={isFeature}
                                    style={isFeature ? { gridRow: "span 2" } : {}}
                                >
                                    <div style={{ padding: "2rem" }}>
                                        <div style={{
                                            width: "48px",
                                            height: "48px",
                                            borderRadius: "12px",
                                            background: "rgba(201, 168, 76, 0.08)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            marginBottom: "1.25rem",
                                            transform: "translateZ(15px)",
                                        }}>
                                            <Icon size={24} style={{ color: "var(--color-noble-gold)" }} strokeWidth={1.5} />
                                        </div>
                                        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: isFeature ? "1.5rem" : "1.25rem", fontWeight: 600, color: "var(--color-noble-ivory)", marginBottom: "0.75rem" }}>
                                            {theme.title}
                                        </h3>
                                        <p style={{ fontSize: "0.9rem", color: "var(--color-noble-slate)", lineHeight: 1.8 }}>
                                            {theme.description}
                                        </p>
                                    </div>
                                </IslandCard>
                            </CinematicReveal>
                        );
                    })}
                </div>

                {/* Execution Timeline */}
                <CinematicReveal type="fadeUp" delay={0.2}>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 600, color: "var(--color-noble-ivory)", marginBottom: "2rem" }}>
                        Execution Protocol
                    </h3>
                </CinematicReveal>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "1.25rem",
                }}>
                    {timeline.map((step, i) => (
                        <CinematicReveal key={step.phase} type="fadeUp" delay={0.15 * i + 0.3}>
                            <IslandCard tiltIntensity={4}>
                                <div style={{ padding: "1.75rem" }}>
                                    <div style={{
                                        fontSize: "2.5rem",
                                        fontFamily: "var(--font-heading)",
                                        fontWeight: 800,
                                        color: "rgba(201, 168, 76, 0.12)",
                                        lineHeight: 1,
                                        marginBottom: "0.75rem",
                                        transform: "translateZ(10px)",
                                    }}>
                                        {step.phase}
                                    </div>
                                    <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1.125rem", fontWeight: 600, color: "var(--color-noble-ivory)", marginBottom: "0.5rem" }}>
                                        {step.title}
                                    </h4>
                                    <p style={{ fontSize: "0.85rem", color: "var(--color-noble-slate)", lineHeight: 1.7 }}>
                                        {step.desc}
                                    </p>
                                </div>
                            </IslandCard>
                        </CinematicReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
