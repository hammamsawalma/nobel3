'use client';

import { motion } from "framer-motion";
import CinematicReveal from "@/components/CinematicReveal";
import IslandCard from "@/components/IslandCard";
import MagneticButton from "@/components/MagneticButton";
import { Mail } from "lucide-react";
import { useState } from "react";

export default function NewsletterSection() {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setIsSubscribed(true);
            setEmail('');
            setTimeout(() => setIsSubscribed(false), 4000);
        }
    };

    return (
        <section
            className="island-section noise-overlay"
            style={{
                position: "relative",
                overflow: "hidden",
                background: "linear-gradient(180deg, var(--color-noble-black), var(--color-noble-navy))",
            }}
        >
            <div className="container-noble section-padding" style={{ position: "relative", zIndex: 2 }}>
                <div style={{ maxWidth: "700px", margin: "0 auto" }}>
                    <CinematicReveal>
                        <IslandCard tiltIntensity={3} floatIdle={true}>
                            <div style={{ padding: "3rem 2.5rem", textAlign: "center" }}>
                                <div style={{
                                    width: "56px",
                                    height: "56px",
                                    borderRadius: "50%",
                                    background: "rgba(201, 168, 76, 0.08)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    margin: "0 auto 1.5rem",
                                    transform: "translateZ(15px)",
                                }}>
                                    <Mail size={24} style={{ color: "var(--color-noble-gold)" }} />
                                </div>
                                <h2 style={{
                                    fontFamily: "var(--font-heading)",
                                    fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                                    color: "var(--color-noble-ivory)",
                                    marginBottom: "1rem"
                                }}>
                                    The Noble Rock Digest
                                </h2>
                                <p style={{
                                    color: "var(--color-noble-slate)",
                                    fontSize: "1.05rem",
                                    lineHeight: 1.8,
                                    marginBottom: "2.5rem"
                                }}>
                                    Receive institutional market intelligence, proprietary research summaries, and strategic allocation updates. Delivered quarterly. No noise.
                                </p>

                                <form
                                    onSubmit={handleSubmit}
                                    style={{
                                        display: "flex",
                                        gap: "0",
                                        maxWidth: "500px",
                                        margin: "0 auto"
                                    }}
                                >
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        style={{
                                            flex: 1,
                                            padding: "1rem 1.25rem",
                                            background: "rgba(26, 26, 46, 0.8)",
                                            border: "1px solid rgba(201, 168, 76, 0.15)",
                                            borderRight: "none",
                                            borderRadius: "12px 0 0 12px",
                                            color: "var(--color-noble-ivory)",
                                            fontFamily: "var(--font-body)",
                                            fontSize: "1rem",
                                            outline: "none",
                                        }}
                                    />
                                    <button
                                        type="submit"
                                        className="btn-noble-primary"
                                        style={{
                                            whiteSpace: "nowrap",
                                            borderRadius: "0 12px 12px 0",
                                        }}
                                    >
                                        {isSubscribed ? "Subscribed ✓" : "Subscribe"}
                                    </button>
                                </form>

                                <p style={{
                                    color: "var(--color-noble-slate)",
                                    fontSize: "0.8rem",
                                    marginTop: "1.5rem",
                                    opacity: 0.7
                                }}>
                                    By subscribing, you agree to our Privacy Policy. Unsubscribe at any time.
                                </p>
                            </div>
                        </IslandCard>
                    </CinematicReveal>
                </div>
            </div>
        </section>
    );
}
