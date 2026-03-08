"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import StaggeredBlurText from "@/components/StaggeredBlurText";
import CinematicReveal from "@/components/CinematicReveal";
import MagneticButton from "@/components/MagneticButton";
import IslandCard from "@/components/IslandCard";
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
    const [isHovered, setIsHovered] = useState(false);

    // Scroll Progress for Sticky Effect
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // Subtly scale and fade as user scrolls down (Sticky Stacking Effect)
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
    const y = useTransform(scrollYProgress, [0, 1], [0, 150]);

    // Mouse Tracking for the Monolith Tilting
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 200 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const rotateX = useTransform(springY, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(springX, [-0.5, 0.5], ["-5deg", "5deg"]);

    // Spotlight Center Tracking
    const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);

        setSpotlightPos({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
        });
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
    };

    return (
        <section
            ref={containerRef}
            style={{
                height: "120vh", // Extra height to allow scrolling up (sticky)
                position: "relative",
            }}
        >
            <motion.div
                style={{
                    position: "sticky",
                    top: 0,
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    scale,
                    opacity,
                    transformOrigin: "center center",
                }}
            >
                {/* 1. Deep Background with Initial Blur */}
                <motion.div
                    initial={{ filter: "blur(20px)", scale: 1.1 }}
                    animate={{ filter: "blur(0px)", scale: 1.05 }}
                    transition={{ duration: 2.5, ease: "easeOut" }}
                    style={{ position: "absolute", inset: "-10%", zIndex: 0 }}
                >
                    <Image
                        src="/images/hero/hero_banner.png"
                        alt="Noble Rock Heritage"
                        fill
                        style={{ objectFit: "cover" }}
                        priority
                        quality={90}
                    />
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(to bottom, rgba(10,10,15,0.85) 0%, rgba(10,10,15,0.7) 40%, rgba(10,10,15,0.95) 100%)",
                        }}
                    />
                </motion.div>

                {/* Massive Animated Watermark behind Monolith */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 2 }}
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 1,
                        width: "clamp(20rem, 40vw, 40rem)",
                        height: "clamp(20rem, 40vw, 40rem)",
                        opacity: 0.04,
                        pointerEvents: "none",
                        userSelect: "none",
                    }}
                >
                    <Image
                        src="/images/logo/logo-monogram.png"
                        alt=""
                        fill
                        style={{ objectFit: "contain", mixBlendMode: "luminosity" }}
                    />
                </motion.div>

                {/* 2. The Absolute Monolith */}
                <motion.div
                    className="hero-monolith"
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        position: "relative",
                        zIndex: 2,
                        width: "90%",
                        maxWidth: "1100px",
                        marginTop: "clamp(60px, 8vh, 100px)", /* Top clearance for fixed V3Header */
                        padding: "clamp(3rem, 6vw, 6rem) clamp(2rem, 4vw, 4rem)",
                        borderRadius: "32px",
                        background: "rgba(15, 20, 30, 0.5)",
                        backdropFilter: "blur(24px) saturate(1.2)",
                        WebkitBackdropFilter: "blur(24px) saturate(1.2)",
                        border: "1px solid rgba(201, 168, 76, 0.15)",
                        boxShadow: "var(--shadow-island-elevated)",
                        rotateX,
                        rotateY,
                        transformStyle: "preserve-3d",
                        perspective: 1500,
                    }}
                >
                    {/* Dark Noise Overlay inside Monolith */}
                    <div className="noise-overlay" style={{ position: "absolute", inset: 0, borderRadius: "inherit" }} />

                    {/* Spotlight Effect inside Monolith */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            borderRadius: "inherit",
                            background: isHovered
                                ? `radial-gradient(800px circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(201, 168, 76, 0.08), transparent 40%)`
                                : "none",
                            pointerEvents: "none",
                            zIndex: 1,
                            transition: "background 300ms ease",
                        }}
                    />

                    {/* Content Frame (Z-Depth) */}
                    <div className="hero-content-frame" style={{
                        position: "relative",
                        zIndex: 3,
                        transform: "translateZ(30px)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        minHeight: "400px"
                    }}>
                        {/* Typewriter/Reveal Badge */}
                        <CinematicReveal type="fadeUp" delay={0.6}>
                            <div
                                className="hero-badge"
                                style={{
                                    display: "inline-block",
                                    padding: "0.6rem 1.75rem",
                                    background: "rgba(201, 168, 76, 0.05)",
                                    border: "1px solid rgba(201, 168, 76, 0.2)",
                                    borderRadius: "100px",
                                    fontSize: "0.7rem",
                                    letterSpacing: "0.25em",
                                    textTransform: "uppercase",
                                    color: "var(--color-noble-gold)",
                                    fontFamily: "var(--font-body)",
                                    fontWeight: 600,
                                    marginBottom: "3rem",
                                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(201, 168, 76, 0.1)",
                                }}
                            >
                                Absolute Fiduciary Restraint
                            </div>
                        </CinematicReveal>

                        {/* Staggered Title coming aggressively from Z-axis */}
                        <motion.h1
                            style={{
                                fontFamily: "var(--font-heading)",
                                fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                                lineHeight: 1.1,
                                color: "var(--color-noble-ivory)",
                                marginBottom: "2.5rem",
                                transform: "translateZ(50px)",
                                textAlign: "center",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "0.2rem"
                            }}
                        >
                            <span style={{ display: "block" }}>
                                <StaggeredBlurText
                                    text="Preserving Legacy."
                                    as="span"
                                    style={{ justifyContent: "center" }}
                                    staggerDelay={0.08}
                                    delay={0.8}
                                />
                            </span>
                            <span style={{ display: "block", color: "var(--color-noble-gold)" }}>
                                <StaggeredBlurText
                                    text="Defending Capital."
                                    as="span"
                                    style={{ justifyContent: "center" }}
                                    staggerDelay={0.08}
                                    delay={1.4}
                                />
                            </span>
                        </motion.h1>

                        {/* CTAs */}
                        <CinematicReveal type="fadeUp" delay={2.2}>
                            <div className="hero-cta-row" style={{ display: "flex", gap: "1.25rem", justifyContent: "center", flexWrap: "wrap", marginTop: "1rem", transform: "translateZ(20px)" }}>
                                <MagneticButton as="a" href="/the-firm" className="btn-noble-primary" intensity={0.2} style={{ borderRadius: "100px" }}>
                                    Discover Our Heritage
                                </MagneticButton>
                                <MagneticButton as="a" href="/contact" className="btn-noble-secondary" intensity={0.2} style={{ borderRadius: "100px" }}>
                                    Request Audience
                                </MagneticButton>
                            </div>
                        </CinematicReveal>

                        {/* Integrated stat strip — replacing floating cards */}
                        <CinematicReveal type="fadeUp" delay={2.4}>
                            <div
                                className="hero-integrated-stats"
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "0",
                                    marginTop: "3rem",
                                    padding: "1.5rem 1rem",
                                    borderTop: "1px solid rgba(201, 168, 76, 0.2)",
                                    borderBottom: "1px solid rgba(201, 168, 76, 0.1)",
                                    transform: "translateZ(15px)",
                                }}
                            >
                                {[
                                    { value: 4.2, prefix: "$", suffix: "B+", label: "Assets Under Management" },
                                    { value: 1987, prefix: "", suffix: "", label: "Established" },
                                    { value: 100, prefix: "", suffix: "%", label: "ASIC Regulated" },
                                ].map((stat, i) => (
                                    <div
                                        key={stat.label}
                                        className="stat-item"
                                        style={{
                                            flex: 1,
                                            textAlign: "center",
                                            borderRight: i < 2 ? "1px solid rgba(201, 168, 76, 0.35)" : "none",
                                            padding: "0 1.5rem",
                                        }}
                                    >
                                        <div
                                            className="stat-value"
                                            style={{
                                                fontFamily: "var(--font-heading)",
                                                fontSize: "1.75rem",
                                                fontWeight: 700,
                                                color: "var(--color-noble-gold)",
                                                lineHeight: 1.2,
                                            }}
                                        >
                                            {stat.prefix === "$" ? (
                                                <AnimatedCounter target={stat.value} prefix="$" suffix="B+" />
                                            ) : stat.label === "Established" ? (
                                                <AnimatedCounter target={stat.value} />
                                            ) : (
                                                <AnimatedCounter target={stat.value} suffix="%" />
                                            )}
                                        </div>
                                        <div
                                            className="stat-label"
                                            style={{
                                                fontSize: "0.65rem",
                                                letterSpacing: "0.15em",
                                                textTransform: "uppercase",
                                                color: "rgba(255,255,255,0.5)",
                                                marginTop: "0.5rem",
                                                fontFamily: "var(--font-body)",
                                            }}
                                        >
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CinematicReveal>
                    </div>


                </motion.div>

                {/* 4. Glowing Scroll Ring */}
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
                            gap: "0.75rem",
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
                        {/* Glowing Ring Instead of Chevron */}
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 1, 0.3],
                                boxShadow: [
                                    "0 0 0px rgba(201,168,76,0)",
                                    "0 0 20px rgba(201,168,76,0.3)",
                                    "0 0 0px rgba(201,168,76,0)",
                                ]
                            }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            style={{
                                width: "12px",
                                height: "12px",
                                borderRadius: "50%",
                                border: "1.5px solid var(--color-noble-gold)",
                            }}
                        />
                        <div
                            style={{
                                width: "1px",
                                height: "30px",
                                background: "linear-gradient(to bottom, var(--color-noble-gold-muted), transparent)",
                            }}
                        />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
