'use client';

import { motion } from "framer-motion";
import CinematicReveal from "@/components/CinematicReveal";
import IslandCard from "@/components/IslandCard";
import { Quote } from "lucide-react";

const testimonials = [
    {
        quote: "Noble Rock transformed our approach to generational wealth. Their fiduciary discipline is unmatched—they genuinely refuse to recommend anything that conflicts with our interests.",
        name: "The Ashworth Family",
        designation: "Multi-Generational Client Since 2004",
        initials: "AF"
    },
    {
        quote: "After the GFC, we moved our entire portfolio to Noble Rock. Their crisis-era performance wasn't luck—it was architecture. Our capital has never been more deliberately protected.",
        name: "James & Catherine Hargrove",
        designation: "Private Client, $15M+ Portfolio",
        initials: "JC"
    },
    {
        quote: "The quarterly reviews alone justify the relationship. Every position has a thesis, every allocation has a mandate. This is institutional rigour applied to private wealth.",
        name: "Principal, Sovereign Trust Group",
        designation: "Family Office Client",
        initials: "ST"
    },
    {
        quote: "We interviewed seven firms before choosing Noble Rock. They were the only ones who said 'no' to products that didn't align with our timeline. That integrity is rare.",
        name: "Dr. Helena Richter",
        designation: "Retirement Planning Client",
        initials: "HR"
    }
];

export default function TestimonialsSection() {
    return (
        <section
            className="island-section noise-overlay"
            style={{
                position: "relative",
                overflow: "hidden",
                backgroundImage: "linear-gradient(rgba(10,10,10,0.85), rgba(10,10,10,0.95)), url(/images/sections/awards_recognition.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Watermark */}
            <span className="section-watermark">05</span>

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
                            Client Testimonials
                        </span>
                        <h2 style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "clamp(2rem, 4vw, 3rem)",
                            color: "var(--color-noble-ivory)",
                            marginBottom: "1.5rem"
                        }}>
                            Voices of Conviction
                        </h2>
                        <div className="gold-divider" style={{ margin: "0 auto" }} />
                    </div>
                </CinematicReveal>

                {/* Asymmetric Grid: 1 large + 3 stacked */}
                <div className="testimonials-grid" style={{
                    display: "grid",
                    gridTemplateColumns: "1.2fr 1fr",
                    gridTemplateRows: "auto auto",
                    gap: "1.5rem",
                    maxWidth: "1200px",
                    margin: "0 auto"
                }}>
                    {testimonials.map((t, index) => (
                        <CinematicReveal key={index} type="fadeUp" delay={index * 0.1}>
                            <IslandCard
                                tiltIntensity={4}
                                floatIdle={index === 0}
                                style={index === 0 ? { gridRow: "span 2" } : {}}
                            >
                                <div style={{
                                    padding: "2.5rem",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    height: "100%",
                                    minHeight: index === 0 ? "400px" : "auto",
                                }}>
                                    <div>
                                        <Quote
                                            size={index === 0 ? 40 : 28}
                                            style={{
                                                color: "var(--color-noble-gold)",
                                                marginBottom: "1.5rem",
                                                opacity: 0.5,
                                                transform: "translateZ(10px)",
                                            }}
                                        />
                                        <p style={{
                                            color: "var(--color-noble-silver)",
                                            fontSize: index === 0 ? "1.15rem" : "1rem",
                                            lineHeight: 1.8,
                                            fontStyle: "italic",
                                            fontFamily: "var(--font-accent)"
                                        }}>
                                            &ldquo;{t.quote}&rdquo;
                                        </p>
                                    </div>

                                    <div style={{
                                        marginTop: "2rem",
                                        paddingTop: "1.5rem",
                                        borderTop: "1px solid rgba(201, 168, 76, 0.12)",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "1rem"
                                    }}>
                                        <div style={{
                                            width: "48px",
                                            height: "48px",
                                            borderRadius: "50%",
                                            background: "linear-gradient(135deg, var(--color-noble-gold-dark), var(--color-noble-gold))",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontFamily: "var(--font-heading)",
                                            color: "var(--color-noble-black)",
                                            fontSize: "0.9rem",
                                            fontWeight: 700,
                                            flexShrink: 0,
                                            transform: "translateZ(15px)",
                                        }}>
                                            {t.initials}
                                        </div>
                                        <div>
                                            <div style={{
                                                color: "var(--color-noble-ivory)",
                                                fontWeight: 600,
                                                fontSize: "0.95rem"
                                            }}>
                                                {t.name}
                                            </div>
                                            <div style={{
                                                color: "var(--color-noble-gold-muted)",
                                                fontSize: "0.8rem",
                                                textTransform: "uppercase",
                                                letterSpacing: "0.05em"
                                            }}>
                                                {t.designation}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </IslandCard>
                        </CinematicReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
