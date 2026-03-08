'use client';

import { motion } from "framer-motion";
import CinematicReveal from "@/components/CinematicReveal";
import IslandCard from "@/components/IslandCard";
import { Award, Star, Trophy, Shield, Globe, TrendingUp } from "lucide-react";

const awards = [
    { title: "Best Multi-Family Office 2023", org: "Wealth & Finance International", icon: Trophy, year: "2023" },
    { title: "Excellence in Fiduciary Advice", org: "Financial Planning Association", icon: Shield, year: "2023" },
    { title: "Top 50 Wealth Managers APAC", org: "Asian Investor Magazine", icon: Globe, year: "2022" },
    { title: "Best Risk-Adjusted Returns", org: "Morningstar Advisor Awards", icon: TrendingUp, year: "2022" },
    { title: "5-Star Rated Advisory Firm", org: "Canstar Financial Awards", icon: Star, year: "2021" },
    { title: "Innovation in Client Reporting", org: "WealthTech Awards Asia", icon: Award, year: "2021" },
];

export default function AwardsSection() {
    return (
        <section
            className="island-section noise-overlay"
            style={{
                position: "relative",
                overflow: "hidden",
                backgroundImage: "linear-gradient(rgba(10,10,10,0.9), rgba(15,27,45,0.95)), url(/images/sections/awards_recognition.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Watermark */}
            <span className="section-watermark">06</span>

            <div className="container-noble section-padding" style={{ position: "relative", zIndex: 2 }}>
                <CinematicReveal>
                    <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                        <span style={{
                            color: "var(--color-noble-gold)",
                            textTransform: "uppercase",
                            fontSize: "0.85rem",
                            letterSpacing: "0.2em",
                            fontWeight: 600,
                            display: "block",
                            marginBottom: "1.5rem"
                        }}>
                            Industry Recognition
                        </span>
                        <h2 style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "clamp(2rem, 4vw, 3rem)",
                            color: "var(--color-noble-ivory)",
                            marginBottom: "1.5rem"
                        }}>
                            A Record of Distinction
                        </h2>
                        <div className="gold-divider" style={{ margin: "0 auto" }} />
                    </div>
                </CinematicReveal>

                {/* Bento Grid: 2 large + 4 small */}
                <div className="awards-grid" style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "1.25rem",
                    maxWidth: "1100px",
                    margin: "0 auto"
                }}>
                    {awards.map((award, index) => {
                        const Icon = award.icon;
                        return (
                            <CinematicReveal key={index} type="fadeUp" delay={index * 0.08}>
                                <IslandCard tiltIntensity={5} floatIdle={index < 2}>
                                    <div style={{
                                        padding: "2rem",
                                        textAlign: "center",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: "0.75rem",
                                    }}>
                                        <div style={{
                                            width: "56px",
                                            height: "56px",
                                            borderRadius: "50%",
                                            background: "rgba(201, 168, 76, 0.08)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            marginBottom: "0.5rem",
                                            transform: "translateZ(15px)",
                                            boxShadow: "0 0 20px rgba(201, 168, 76, 0.06)",
                                        }}>
                                            <Icon size={24} style={{ color: "var(--color-noble-gold)" }} />
                                        </div>

                                        <h4 style={{
                                            fontFamily: "var(--font-heading)",
                                            fontSize: "1.1rem",
                                            color: "var(--color-noble-ivory)",
                                            lineHeight: 1.3
                                        }}>
                                            {award.title}
                                        </h4>

                                        <p style={{
                                            color: "var(--color-noble-slate)",
                                            fontSize: "0.85rem",
                                            lineHeight: 1.5
                                        }}>
                                            {award.org}
                                        </p>

                                        <span style={{
                                            color: "var(--color-noble-gold-muted)",
                                            fontSize: "0.8rem",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.1em",
                                            marginTop: "auto"
                                        }}>
                                            {award.year}
                                        </span>
                                    </div>
                                </IslandCard>
                            </CinematicReveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
