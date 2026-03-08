"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import CinematicReveal from "@/components/CinematicReveal";
import StaggeredBlurText from "@/components/StaggeredBlurText";
import IslandCard from "@/components/IslandCard";
import { Landmark, BarChart3, Users, PiggyBank, ArrowRight } from "lucide-react";

const services = [
    {
        icon: Landmark,
        title: "Fixed Income",
        description: "Institutional-grade bond portfolios calibrated for capital preservation and reliable income generation across cycles.",
        href: "/wealth-strategies/fixed-income",
    },
    {
        icon: BarChart3,
        title: "Strategic Equities",
        description: "Concentrated conviction portfolios built on fundamental analysis with a margin-of-safety discipline.",
        href: "/wealth-strategies/equities",
    },
    {
        icon: Users,
        title: "Family Office",
        description: "Holistic multi-generational wealth advisory encompassing succession, governance, and philanthropic strategy.",
        href: "/wealth-strategies/family-office",
    },
    {
        icon: PiggyBank,
        title: "Retirement Planning",
        description: "Tax-optimised retirement income strategies designed to sustain lifestyle with capital longevity.",
        href: "/wealth-strategies/retirement",
    },
];

export default function ServicesSection() {
    return (
        <section
            className="island-section noise-overlay"
            style={{
                position: "relative",
                overflow: "hidden",
                background: "linear-gradient(135deg, rgba(26,26,46,0.95), rgba(10,10,10,0.98))",
            }}
        >
            {/* Background */}
            <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
                <Image
                    src="/images/sections/services_cards.png"
                    alt="Verde Marble"
                    fill
                    style={{ objectFit: "cover", opacity: 0.06 }}
                />
            </div>

            {/* Watermark */}
            <span className="section-watermark">02</span>

            <div className="container-noble section-padding" style={{ position: "relative", zIndex: 2 }}>
                {/* Section Label */}
                <CinematicReveal type="fadeUp">
                    <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                        <span
                            style={{
                                fontSize: "0.65rem",
                                letterSpacing: "0.25em",
                                textTransform: "uppercase",
                                color: "var(--color-noble-gold-muted)",
                                fontFamily: "var(--font-body)",
                                fontWeight: 500,
                            }}
                        >
                            Core Disciplines
                        </span>
                    </div>
                </CinematicReveal>

                <CinematicReveal type="fadeUp" delay={0.1}>
                    <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                        <StaggeredBlurText
                            text="Strategic Investment Solutions."
                            as="h2"
                            style={{ justifyContent: "center" }}
                        />
                    </div>
                </CinematicReveal>

                <CinematicReveal type="fadeUp" delay={0.2}>
                    <div className="gold-divider" style={{ margin: "0 auto 3rem" }} />
                </CinematicReveal>

                {/* Grid */}
                <div
                    className="services-grid"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "1.5rem",
                        perspective: 1500,
                    }}
                >
                    {services.map((service, i) => {
                        const Icon = service.icon;
                        return (
                            <CinematicReveal key={service.title} type="fadeUp" delay={0.15 * i + 0.3}>
                                <IslandCard tiltIntensity={6} floatIdle={i % 2 === 0}>
                                    <Link href={service.href} style={{ textDecoration: "none", display: "block" }}>
                                        <div style={{ padding: "2.5rem 2rem" }}>
                                            {/* Icon at deepest Z */}
                                            <div style={{ transform: "translateZ(15px)" }}>
                                                <Icon
                                                    size={32}
                                                    style={{ color: "var(--color-noble-gold)", marginBottom: "1.5rem" }}
                                                    strokeWidth={1.5}
                                                />
                                            </div>
                                            <h3
                                                style={{
                                                    fontFamily: "var(--font-heading)",
                                                    fontSize: "1.375rem",
                                                    fontWeight: 600,
                                                    color: "var(--color-noble-ivory)",
                                                    marginBottom: "1rem",
                                                    transform: "translateZ(10px)",
                                                }}
                                            >
                                                {service.title}
                                            </h3>
                                            <p
                                                style={{
                                                    fontSize: "0.9rem",
                                                    color: "var(--color-noble-slate)",
                                                    lineHeight: 1.7,
                                                    marginBottom: "1.5rem",
                                                }}
                                            >
                                                {service.description}
                                            </p>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "0.5rem",
                                                    fontSize: "0.75rem",
                                                    fontWeight: 600,
                                                    letterSpacing: "0.1em",
                                                    textTransform: "uppercase",
                                                    color: "var(--color-noble-gold)",
                                                    transform: "translateZ(5px)",
                                                }}
                                            >
                                                Explore Strategy <ArrowRight size={14} />
                                            </div>
                                        </div>
                                    </Link>
                                </IslandCard>
                            </CinematicReveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
