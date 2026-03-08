'use client';

import { motion } from "framer-motion";
import CinematicReveal from "@/components/CinematicReveal";
import IslandCard from "@/components/IslandCard";
import MagneticButton from "@/components/MagneticButton";
import { Send, Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        inquiryType: 'Portfolio Consultation',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 4000);
    };

    const inputStyle: React.CSSProperties = {
        width: "100%",
        padding: "1rem 1.25rem",
        background: "rgba(26, 26, 46, 0.8)",
        border: "1px solid rgba(201, 168, 76, 0.1)",
        borderRadius: "12px",
        color: "var(--color-noble-ivory)",
        fontFamily: "var(--font-body)",
        fontSize: "1rem",
        outline: "none",
        transition: "all 0.3s ease",
    };

    return (
        <section
            className="island-section noise-overlay"
            id="contact"
            style={{
                position: "relative",
                overflow: "hidden",
                backgroundImage: "linear-gradient(rgba(10,10,10,0.92), rgba(10,10,10,0.95)), url(/images/sections/contact.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Watermark */}
            <span className="section-watermark">09</span>

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
                            Begin The Conversation
                        </span>
                        <h2 style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "clamp(2rem, 4vw, 3rem)",
                            color: "var(--color-noble-ivory)",
                            marginBottom: "1.5rem"
                        }}>
                            Request Audience
                        </h2>
                        <div className="gold-divider" style={{ margin: "0 auto" }} />
                    </div>
                </CinematicReveal>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "4rem",
                    maxWidth: "1100px",
                    margin: "0 auto",
                }}>
                    {/* Form Island */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <IslandCard tiltIntensity={3} spotlightEffect={true}>
                            <form
                                onSubmit={handleSubmit}
                                style={{ display: "flex", flexDirection: "column", gap: "1.25rem", padding: "2rem" }}
                            >
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    style={inputStyle}
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    style={inputStyle}
                                    required
                                />
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    style={inputStyle}
                                />
                                <select
                                    value={formData.inquiryType}
                                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                                    style={{ ...inputStyle, cursor: "pointer" }}
                                >
                                    <option value="Portfolio Consultation">Portfolio Consultation</option>
                                    <option value="Fixed Income">Fixed Income Strategy</option>
                                    <option value="Equity Advisory">Equity Advisory</option>
                                    <option value="Family Office">Family Office Services</option>
                                    <option value="Retirement Planning">Retirement Planning</option>
                                    <option value="General Inquiry">General Inquiry</option>
                                </select>
                                <textarea
                                    placeholder="Your Message"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    style={{ ...inputStyle, minHeight: "150px", resize: "vertical" }}
                                    required
                                />
                                <MagneticButton
                                    as="button"
                                    className="btn-noble-primary"
                                    style={{ width: "100%", justifyContent: "center" }}
                                    intensity={0.15}
                                >
                                    {isSubmitted ? "Message Received" : <><Send size={16} /> Submit Inquiry</>}
                                </MagneticButton>
                            </form>
                        </IslandCard>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
                    >
                        <div>
                            <h3 style={{ fontFamily: "var(--font-heading)", color: "var(--color-noble-ivory)", marginBottom: "1rem", fontSize: "1.5rem" }}>
                                Noble Rock Private Wealth
                            </h3>
                            <p style={{ color: "var(--color-noble-slate)", lineHeight: 1.8 }}>
                                We welcome conversations with individuals and families whose financial ambitions require institutional-grade stewardship. Every engagement begins with discretion.
                            </p>
                        </div>

                        {[
                            { icon: MapPin, label: "Level 42, Governor Phillip Tower\n1 Farrer Place, Sydney NSW 2000" },
                            { icon: Phone, label: "+61 2 8000 0000" },
                            { icon: Clock, label: "Monday – Friday: 9:00 AM – 6:00 PM AEST" }
                        ].map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <IslandCard key={i} tiltIntensity={3} spotlightEffect={false}>
                                    <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: "1.25rem" }}>
                                        <div style={{
                                            width: "44px",
                                            height: "44px",
                                            borderRadius: "12px",
                                            background: "rgba(201, 168, 76, 0.08)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexShrink: 0,
                                            transform: "translateZ(10px)",
                                        }}>
                                            <Icon size={18} style={{ color: "var(--color-noble-gold)" }} />
                                        </div>
                                        <p style={{ color: "var(--color-noble-silver)", lineHeight: 1.8, whiteSpace: "pre-line" }}>
                                            {item.label}
                                        </p>
                                    </div>
                                </IslandCard>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
