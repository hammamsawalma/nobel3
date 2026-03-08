"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import StaggeredBlurText from "@/components/StaggeredBlurText";
import CinematicReveal from "@/components/CinematicReveal";
import { ChevronDown } from "lucide-react";

function AnimatedCounter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started) {
                    setStarted(true);
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [started]);

    useEffect(() => {
        if (!started) return;
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);
        return () => clearInterval(timer);
    }, [started, target]);

    return (
        <span ref={ref}>
            {prefix}{count.toLocaleString()}{suffix}
        </span>
    );
}

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section
            ref={containerRef}
            style={{
                height: "100vh",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
            }}
        >
            {/* Parallax Background */}
            <motion.div
                style={{ y, position: "absolute", inset: "-10%", zIndex: 0 }}
                initial={{ scale: 1 }}
                animate={{ scale: 1.1 }}
                transition={{ duration: 30, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
            >
                <Image
                    src="/images/hero/hero_banner.png"
                    alt="Noble Rock Heritage Library"
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                    quality={90}
                />
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to bottom, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.4) 40%, rgba(10,10,10,0.85) 100%)",
                    }}
                />
            </motion.div>

            {/* Content */}
            <motion.div style={{ opacity, position: "relative", zIndex: 1, textAlign: "center", padding: "2rem", maxWidth: "900px" }}>
                {/* Badge */}
                <CinematicReveal type="fadeUp" delay={0.2}>

                    <div
                        style={{
                            display: "inline-block",
                            padding: "0.5rem 1.5rem",
                            border: "1px solid var(--color-noble-gold-muted)",
                            borderRadius: "100px",
                            fontSize: "0.65rem",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: "var(--color-noble-gold)",
                            fontFamily: "var(--font-body)",
                            fontWeight: 500,
                            marginBottom: "2rem",
                        }}
                    >
                        Absolute Fiduciary Restraint
                    </div>
                </CinematicReveal>

                {/* Title */}
                <StaggeredBlurText
                    text="Preserving Legacy. Defending Capital."
                    as="h1"
                    className="text-gold-gradient"
                    style={{ justifyContent: "center", marginBottom: "1.5rem" }}
                    staggerDelay={0.06}
                />

                {/* Stats */}
                <CinematicReveal type="fadeUp" delay={1}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "3rem",
                            flexWrap: "wrap",
                            marginBottom: "2.5rem",
                        }}
                    >
                        {[
                            { value: 4.2, suffix: "B+", prefix: "$", label: "Assets Under Management" },
                            { value: 1987, suffix: "", prefix: "", label: "Established" },
                            { value: 100, suffix: "%", prefix: "", label: "ASIC Regulated" },
                        ].map((stat) => (
                            <div key={stat.label} style={{ textAlign: "center" }}>
                                <div
                                    style={{
                                        fontFamily: "var(--font-heading)",
                                        fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                                        fontWeight: 700,
                                        color: "var(--color-noble-gold)",
                                    }}
                                >
                                    {stat.prefix === "$" ? (
                                        <><AnimatedCounter target={stat.value} prefix="$" suffix="B+" /></>
                                    ) : stat.label === "Established" ? (
                                        <AnimatedCounter target={stat.value} />
                                    ) : (
                                        <AnimatedCounter target={stat.value} suffix="%" />
                                    )}
                                </div>
                                <div
                                    style={{
                                        fontSize: "0.65rem",
                                        letterSpacing: "0.15em",
                                        textTransform: "uppercase",
                                        color: "var(--color-noble-slate)",
                                        marginTop: "0.25rem",
                                        fontFamily: "var(--font-body)",
                                    }}
                                >
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </CinematicReveal>

                {/* CTAs */}
                <CinematicReveal type="fadeUp" delay={1.4}>
                    <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                        <Link href="/the-firm" className="btn-noble-primary">
                            Discover Our Heritage
                        </Link>
                        <Link href="/portal" className="btn-noble-secondary">
                            Client Vault Access
                        </Link>
                    </div>
                </CinematicReveal>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                style={{ opacity }}
                className="scroll-indicator"
            >
                <div
                    style={{
                        position: "absolute",
                        bottom: "2.5rem",
                        left: "50%",
                        transform: "translateX(-50%)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "0.5rem",
                        zIndex: 1,
                    }}
                >
                    <span
                        style={{
                            fontSize: "0.6rem",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: "var(--color-noble-gold-muted)",
                            fontFamily: "var(--font-body)",
                        }}
                    >
                        Descend
                    </span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    >
                        <ChevronDown size={16} style={{ color: "var(--color-noble-gold-muted)" }} />
                    </motion.div>
                    <div
                        style={{
                            width: "1px",
                            height: "40px",
                            background: "linear-gradient(to bottom, var(--color-noble-gold-muted), transparent)",
                        }}
                    />
                </div>
            </motion.div>
        </section>
    );
}
