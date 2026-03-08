"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const footerColumns = [
    {
        title: "The Firm",
        links: [
            { label: "Heritage", href: "/the-firm" },
            { label: "Philosophy", href: "/the-firm#philosophy" },
            { label: "Executive Committee", href: "/the-firm#team" },
            { label: "Awards", href: "/the-firm#awards" },
        ],
    },
    {
        title: "Strategies",
        links: [
            { label: "Fixed Income", href: "/wealth-strategies/fixed-income" },
            { label: "Strategic Equities", href: "/wealth-strategies/equities" },
            { label: "Family Office", href: "/wealth-strategies/family-office" },
            { label: "Retirement Planning", href: "/wealth-strategies/retirement" },
        ],
    },
    {
        title: "Resources",
        links: [
            { label: "Journal", href: "/insights" },
            { label: "Market Insights", href: "/insights" },
            { label: "FAQs", href: "/#faq" },
        ],
    },
    {
        title: "Compliance",
        links: [
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Financial Services Guide", href: "/fsg" },
            { label: "Scam & Fraud Alert", href: "/scam-alert" },
        ],
    },
];

export default function V3Footer() {
    const footerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: footerRef,
        offset: ["start end", "end end"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-15%", "0%"]);

    return (
        <footer
            ref={footerRef}
            style={{
                position: "relative",
                overflow: "hidden",
                padding: "0 clamp(0.5rem, 2vw, 2rem)",
                paddingBottom: "clamp(0.5rem, 2vw, 2rem)",
            }}
        >
            {/* Footer Island */}
            <div
                className="noise-overlay"
                style={{
                    position: "relative",
                    background: "rgba(15, 15, 25, 0.95)",
                    borderRadius: "clamp(16px, 3vw, 32px)",
                    border: "1px solid rgba(201, 168, 76, 0.08)",
                    boxShadow: "var(--shadow-island-elevated)",
                    overflow: "hidden",
                }}
            >
                {/* Background */}
                <motion.div
                    style={{
                        position: "absolute",
                        inset: "-20% 0 0 0",
                        backgroundImage: "url('/images/sections/footer.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        opacity: 0.1,
                        y,
                        zIndex: 0,
                        mixBlendMode: "luminosity"
                    }}
                />

                {/* Top gold edge glow */}
                <div style={{
                    position: "absolute",
                    top: 0,
                    left: "10%",
                    right: "10%",
                    height: "1px",
                    background: "linear-gradient(90deg, transparent, rgba(201, 168, 76, 0.3), transparent)",
                    zIndex: 2,
                }} />

                <div style={{ position: "relative", zIndex: 1 }}>
                    {/* Main Footer Content */}
                    <div className="section-padding" style={{ paddingBottom: "2rem" }}>
                        <div className="container-noble">
                            {/* Top: Logo + Tagline */}
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "1rem",
                                    marginBottom: "3rem",
                                }}
                            >
                                <div
                                    style={{
                                        width: "48px",
                                        height: "48px",
                                        border: "1.5px solid var(--color-noble-gold)",
                                        borderRadius: "50%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontFamily: "var(--font-heading)",
                                        fontSize: "1.25rem",
                                        fontWeight: 700,
                                        color: "var(--color-noble-gold)",
                                        flexShrink: 0,
                                        boxShadow: "0 0 16px rgba(201, 168, 76, 0.1)",
                                    }}
                                >
                                    NR
                                </div>
                                <div>
                                    <div
                                        style={{
                                            fontFamily: "var(--font-heading)",
                                            fontSize: "1.125rem",
                                            fontWeight: 700,
                                            color: "var(--color-noble-ivory)",
                                            letterSpacing: "0.15em",
                                            textTransform: "uppercase",
                                        }}
                                    >
                                        Noble Rock
                                    </div>
                                    <div
                                        style={{
                                            fontFamily: "var(--font-accent)",
                                            fontSize: "0.8rem",
                                            color: "var(--color-noble-gold-muted)",
                                            fontStyle: "italic",
                                        }}
                                    >
                                        Private Wealth
                                    </div>
                                </div>
                            </div>

                            {/* Columns Grid */}
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                                    gap: "2.5rem",
                                    marginBottom: "3rem",
                                }}
                            >
                                {footerColumns.map((col) => (
                                    <div key={col.title}>
                                        <h4
                                            style={{
                                                fontFamily: "var(--font-body)",
                                                fontSize: "0.7rem",
                                                fontWeight: 600,
                                                color: "var(--color-noble-gold)",
                                                letterSpacing: "0.15em",
                                                textTransform: "uppercase",
                                                marginBottom: "1.25rem",
                                            }}
                                        >
                                            {col.title}
                                        </h4>
                                        <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                                            {col.links.map((link) => (
                                                <li key={link.label}>
                                                    <Link
                                                        href={link.href}
                                                        style={{
                                                            fontFamily: "var(--font-body)",
                                                            fontSize: "0.85rem",
                                                            color: "var(--color-noble-slate)",
                                                            textDecoration: "none",
                                                            transition: "color 300ms ease",
                                                        }}
                                                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-noble-ivory)")}
                                                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-noble-slate)")}
                                                    >
                                                        {link.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            {/* Contact Info */}
                            <div className="gold-divider-wide" style={{ marginBottom: "2rem" }} />
                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "2rem",
                                    marginBottom: "2rem",
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                    <MapPin size={14} style={{ color: "var(--color-noble-gold-muted)" }} />
                                    <span style={{ fontSize: "0.8rem", color: "var(--color-noble-slate)" }}>
                                        Level 42, 1 Farrer Place, Sydney NSW 2000
                                    </span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                    <Phone size={14} style={{ color: "var(--color-noble-gold-muted)" }} />
                                    <span style={{ fontSize: "0.8rem", color: "var(--color-noble-slate)" }}>
                                        +61 2 8000 0000
                                    </span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                    <Mail size={14} style={{ color: "var(--color-noble-gold-muted)" }} />
                                    <span style={{ fontSize: "0.8rem", color: "var(--color-noble-slate)" }}>
                                        enquiries@noblerock.com.au
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Copyright Bar */}
                    <div
                        style={{
                            borderTop: "1px solid rgba(201, 168, 76, 0.06)",
                            padding: "1.25rem clamp(1.5rem, 5vw, 4rem)",
                        }}
                    >
                        <div
                            className="container-noble"
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: "1rem",
                            }}
                        >
                            <p style={{ fontSize: "0.7rem", color: "var(--color-noble-slate)", margin: 0, lineHeight: 1.6 }}>
                                © {new Date().getFullYear()} Noble Rock Private Wealth Pty Ltd. ABN 00 000 000 000. AFSL 000000. All rights reserved.
                            </p>
                            <p style={{ fontSize: "0.65rem", color: "rgba(107, 114, 128, 0.6)", margin: 0, maxWidth: "500px", lineHeight: 1.6 }}>
                                General advice only. Consider your objectives, financial situation and needs before acting. Past performance is not indicative of future returns.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
