'use client';

import { motion } from "framer-motion";
import CinematicReveal from "@/components/CinematicReveal";
import IslandCard from "@/components/IslandCard";
import Image from "next/image";
import { Shield, Lock, Eye, Server, FileCheck, AlertTriangle } from "lucide-react";

const securityFeatures = [
    { icon: Shield, title: "ASIC Regulated", description: "Operating under a valid Australian Financial Services Licence with full regulatory compliance and oversight." },
    { icon: Lock, title: "Bank-Grade Encryption", description: "256-bit AES encryption for all data in transit and at rest. Multi-factor authentication on all client portals." },
    { icon: Server, title: "Segregated Accounts", description: "Client assets are held in segregated custodial accounts—never commingled with Noble Rock operating capital." },
    { icon: Eye, title: "Independent Audit", description: "Annual independent audits conducted by Big Four firms. Full transparency reporting available to clients." },
    { icon: FileCheck, title: "AML/CTF Compliance", description: "Rigorous anti-money laundering and counter-terrorism financing protocols embedded in all client onboarding." },
    { icon: AlertTriangle, title: "Scam Protection", description: "Active monitoring for impersonation and fraudulent activity. We will never request funds via unsolicited communication." },
];

export default function SecuritySection() {
    return (
        <section
            className="island-section noise-overlay"
            style={{
                position: "relative",
                overflow: "hidden",
                background: "linear-gradient(180deg, var(--color-noble-black) 0%, rgba(15,27,45,0.9) 50%, var(--color-noble-black) 100%)",
            }}
        >
            <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
                <Image
                    src="/images/sections/faq_security_footer.png"
                    alt="Security Infrastructure"
                    fill
                    style={{ objectFit: "cover", opacity: 0.07 }}
                />
            </div>

            {/* Watermark */}
            <span className="section-watermark">07</span>

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
                            Security & Compliance
                        </span>
                        <h2 style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "clamp(2rem, 4vw, 3rem)",
                            color: "var(--color-noble-ivory)",
                            marginBottom: "1.5rem"
                        }}>
                            Your Security Is Our Priority
                        </h2>
                        <div className="gold-divider" style={{ margin: "0 auto" }} />
                    </div>
                </CinematicReveal>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                    gap: "1.25rem",
                    maxWidth: "1200px",
                    margin: "0 auto"
                }}>
                    {securityFeatures.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <CinematicReveal key={index} type="fadeUp" delay={index * 0.08}>
                                <IslandCard tiltIntensity={5}>
                                    <div style={{
                                        padding: "2rem",
                                        display: "flex",
                                        gap: "1.25rem",
                                        alignItems: "flex-start",
                                    }}>
                                        <div style={{
                                            width: "48px",
                                            height: "48px",
                                            borderRadius: "12px",
                                            background: "rgba(201, 168, 76, 0.08)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexShrink: 0,
                                            transform: "translateZ(20px)",
                                            boxShadow: "0 0 16px rgba(201, 168, 76, 0.06)",
                                        }}>
                                            <Icon size={22} style={{ color: "var(--color-noble-gold)" }} />
                                        </div>
                                        <div style={{ transform: "translateZ(10px)" }}>
                                            <h4 style={{
                                                fontFamily: "var(--font-heading)",
                                                fontSize: "1.1rem",
                                                color: "var(--color-noble-ivory)",
                                                marginBottom: "0.5rem"
                                            }}>
                                                {feature.title}
                                            </h4>
                                            <p style={{
                                                color: "var(--color-noble-slate)",
                                                fontSize: "0.95rem",
                                                lineHeight: 1.7
                                            }}>
                                                {feature.description}
                                            </p>
                                        </div>
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
