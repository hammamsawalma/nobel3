'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";

export default function CTASection() {
    return (
        <section
            className="island-section noise-overlay"
            style={{
                position: "relative",
                overflow: "hidden",
                backgroundImage: "linear-gradient(rgba(10,10,10,0.75), rgba(15,27,45,0.9)), url(/images/sections/cta_banner.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Glow ring around CTA island */}
            <div style={{
                position: "absolute",
                inset: "-2px",
                borderRadius: "inherit",
                background: "linear-gradient(135deg, rgba(201, 168, 76, 0.08), transparent 30%, transparent 70%, rgba(201, 168, 76, 0.05))",
                pointerEvents: "none",
                zIndex: 0,
            }} />

            <div className="container-noble section-padding" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span style={{
                        color: "var(--color-noble-gold)",
                        textTransform: "uppercase",
                        fontSize: "0.85rem",
                        letterSpacing: "0.2em",
                        fontWeight: 600,
                        display: "block",
                        marginBottom: "1.5rem"
                    }}>
                        The Next Step
                    </span>
                    <h2 style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "clamp(2rem, 5vw, 3.5rem)",
                        color: "var(--color-noble-ivory)",
                        marginBottom: "1.5rem",
                        maxWidth: "700px",
                        margin: "0 auto 1.5rem"
                    }}>
                        Your Legacy Deserves Institutional Conviction
                    </h2>
                    <p style={{
                        color: "var(--color-noble-slate)",
                        fontSize: "1.1rem",
                        lineHeight: 1.8,
                        maxWidth: "600px",
                        margin: "0 auto 3rem"
                    }}>
                        Begin the conversation with a confidential, obligation-free consultation. We listen first, advise second.
                    </p>

                    <div style={{
                        display: "flex",
                        gap: "1.5rem",
                        justifyContent: "center",
                        flexWrap: "wrap"
                    }}>
                        <MagneticButton as="a" href="/contact" className="btn-noble-primary" intensity={0.25}>
                            Request Audience <ArrowRight size={16} />
                        </MagneticButton>
                        <MagneticButton as="a" href="/insights" className="btn-noble-secondary" intensity={0.25}>
                            <BookOpen size={16} /> Read The Journal
                        </MagneticButton>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
