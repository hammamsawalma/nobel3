"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import CinematicReveal from "@/components/CinematicReveal";
import StaggeredBlurText from "@/components/StaggeredBlurText";
import IslandCard from "@/components/IslandCard";
import { Shield, TrendingUp, Building2, Award } from "lucide-react";

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setStarted(true); },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!started) return;
        let current = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) { setCount(target); clearInterval(timer); }
            else setCount(Math.floor(current));
        }, 33);
        return () => clearInterval(timer);
    }, [started, target]);

    return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
    { icon: Shield, value: 25, suffix: "+", label: "Years Heritage", desc: "of institutional wealth stewardship" },
    { icon: TrendingUp, value: 100, suffix: "%", label: "Unbiased", desc: "fee-only fiduciary advice" },
    { icon: Building2, value: 0, suffix: "", label: "Tier-1 Custodians", desc: "segregated institutional accounts" },
    { icon: Award, value: 0, suffix: "", label: "ASIC Regulated", desc: "full regulatory compliance" },
];

export default function AboutSection() {
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
                background: "linear-gradient(to right, var(--color-noble-black), rgba(15,27,45,0.9), var(--color-noble-black))",
            }}
        >
            {/* Background Parallax Layer */}
            <motion.div style={{ position: "absolute", inset: "-15% 0 -15% 0", zIndex: 0, y }}>
                <Image
                    src="/images/sections/about_us.png"
                    alt="Noble Rock Estate"
                    fill
                    style={{ objectFit: "cover", opacity: 0.1 }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, var(--color-noble-black) 0%, rgba(10,10,10,0.5) 50%, var(--color-noble-black) 100%)" }} />
            </motion.div>

            {/* Watermark */}
            <span className="section-watermark">01</span>

            <div className="container-noble section-padding" style={{ position: "relative", zIndex: 2 }}>
                {/* Label */}
                <CinematicReveal type="fadeUp">
                    <div
                        style={{
                            fontSize: "0.65rem",
                            letterSpacing: "0.25em",
                            textTransform: "uppercase",
                            color: "var(--color-noble-gold-muted)",
                            fontFamily: "var(--font-body)",
                            fontWeight: 500,
                            marginBottom: "1rem",
                        }}
                    >
                        The Firm
                    </div>
                </CinematicReveal>

                {/* Title */}
                <CinematicReveal type="fadeUp" delay={0.1}>
                    <StaggeredBlurText
                        text="Architects of Generational Prosperity."
                        as="h2"
                    />
                </CinematicReveal>

                <CinematicReveal type="fadeUp" delay={0.3}>
                    <div className="gold-divider" style={{ margin: "1.5rem 0" }} />
                </CinematicReveal>

                {/* Description */}
                <CinematicReveal type="fadeUp" delay={0.4}>
                    <div style={{ maxWidth: "700px" }}>
                        <p style={{ marginBottom: "1.5rem" }}>
                            For over two decades, Noble Rock Private Wealth has served as the quiet
                            counsel behind some of Australia&apos;s most discerning investors. Our mandate
                            is singular: <span className="gold-highlight">preserve and grow family capital</span> with institutional-grade discipline.
                        </p>
                        <p>
                            As absolute fiduciaries, we operate outside the conflicts of commission-based
                            models. Every recommendation is measured against a single criterion —
                            does it serve the <span className="gold-highlight">long-term prosperity</span> of our clients&apos; capital?
                        </p>
                    </div>
                </CinematicReveal>

                {/* Stats Grid — Asymmetric: 1 large + 3 small */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gridTemplateRows: "auto",
                        gap: "1.5rem",
                        marginTop: "3rem",
                    }}
                >
                    {stats.map((stat, i) => {
                        const Icon = stat.icon;
                        const isFeature = i === 0;
                        return (
                            <CinematicReveal key={stat.label} type="fadeUp" delay={0.2 * i + 0.5}>
                                <IslandCard
                                    tiltIntensity={5}
                                    floatIdle={isFeature}
                                    style={isFeature ? { gridColumn: "span 1" } : {}}
                                >
                                    <div style={{ padding: "2rem", textAlign: "center" }}>
                                        <Icon
                                            size={28}
                                            style={{ color: "var(--color-noble-gold)", marginBottom: "1rem" }}
                                            strokeWidth={1.5}
                                        />
                                        <div
                                            style={{
                                                fontFamily: "var(--font-heading)",
                                                fontSize: isFeature ? "2.5rem" : "2rem",
                                                fontWeight: 700,
                                                color: "var(--color-noble-gold)",
                                                marginBottom: "0.25rem",
                                                transform: "translateZ(15px)",
                                            }}
                                        >
                                            {stat.value > 0 ? (
                                                <Counter target={stat.value} suffix={stat.suffix} />
                                            ) : (
                                                "✓"
                                            )}
                                        </div>
                                        <div
                                            style={{
                                                fontSize: "0.75rem",
                                                fontWeight: 600,
                                                letterSpacing: "0.1em",
                                                textTransform: "uppercase",
                                                color: "var(--color-noble-ivory)",
                                                marginBottom: "0.5rem",
                                            }}
                                        >
                                            {stat.label}
                                        </div>
                                        <p style={{ fontSize: "0.8rem", color: "var(--color-noble-slate)", margin: 0 }}>
                                            {stat.desc}
                                        </p>
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
