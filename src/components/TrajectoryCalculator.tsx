"use client";

import { useState, useRef, useEffect } from "react";
import CinematicReveal from "./CinematicReveal";
import V3DataChart from "./V3DataChart";
import { motion, useSpring, useTransform, useInView } from "framer-motion";

const protocols = [
    { label: "Conservative", rate: 0.04 },
    { label: "Balanced", rate: 0.07 },
    { label: "Aggressive", rate: 0.10 },
];

function MotionCounter({ value, prefix = "", isPlus = false }: { value: number; prefix?: string; isPlus?: boolean }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const springValue = useSpring(0, {
        stiffness: 40,
        damping: 20,
        mass: 1
    });

    useEffect(() => {
        if (isInView) {
            springValue.set(value);
        }
    }, [value, springValue, isInView]);

    const display = useTransform(springValue, (current) =>
        `${isPlus ? '+' : ''}${prefix}${Math.round(current).toLocaleString()}`
    );

    return <motion.span ref={ref}>{display}</motion.span>;
}

export default function TrajectoryCalculator() {
    const [monthly, setMonthly] = useState(5000);
    const [years, setYears] = useState(15);
    const [rate, setRate] = useState(0.07);

    // Calculate final numbers
    const finalContributions = monthly * 12 * years;
    let finalBalance = 0;
    const monthlyRate = rate / 12;
    for (let m = 0; m < years * 12; m++) {
        finalBalance += monthly;
        finalBalance *= (1 + monthlyRate);
    }
    const growth = finalBalance - finalContributions;

    return (
        <section className="section-padding" style={{ background: "var(--color-noble-navy)" }}>
            <div className="container-noble">
                <CinematicReveal type="fadeUp">
                    <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                        <span style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--color-noble-gold-muted)", fontWeight: 500 }}>
                            Wealth Projection
                        </span>
                        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--color-noble-ivory)", margin: "1rem 0" }}>
                            The Mathematics of <span className="text-gold-gradient">Compounding</span>
                        </h2>
                        <div className="gold-divider" style={{ margin: "0 auto" }} />
                    </div>
                </CinematicReveal>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "4rem", alignItems: "center" }} className="calc-grid">
                    {/* Controls */}
                    <CinematicReveal type="slideLeft" delay={0.2}>
                        <div className="glass-card" style={{ padding: "2rem" }}>
                            <div style={{ marginBottom: "2rem" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                                    <label style={{ fontSize: "0.85rem", color: "var(--color-noble-slate)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Monthly Allocation</label>
                                    <span style={{ color: "var(--color-noble-gold)", fontWeight: 600 }}>${monthly.toLocaleString()}</span>
                                </div>
                                <input
                                    type="range"
                                    min="1000" max="50000" step="1000"
                                    value={monthly}
                                    onChange={(e) => setMonthly(Number(e.target.value))}
                                    className="gold-slider"
                                />
                            </div>

                            <div style={{ marginBottom: "2rem" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                                    <label style={{ fontSize: "0.85rem", color: "var(--color-noble-slate)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Time Horizon</label>
                                    <span style={{ color: "var(--color-noble-gold)", fontWeight: 600 }}>{years} Years</span>
                                </div>
                                <input
                                    type="range"
                                    min="5" max="30" step="1"
                                    value={years}
                                    onChange={(e) => setYears(Number(e.target.value))}
                                    className="gold-slider"
                                />
                            </div>

                            <div>
                                <label style={{ fontSize: "0.85rem", color: "var(--color-noble-slate)", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "1rem" }}>Execution Protocol</label>
                                <div style={{ display: "flex", gap: "0.5rem", flexDirection: "column" }}>
                                    {protocols.map(p => (
                                        <button
                                            key={p.label}
                                            onClick={() => setRate(p.rate)}
                                            style={{
                                                padding: "0.75rem",
                                                background: rate === p.rate ? "rgba(201,168,76,0.1)" : "transparent",
                                                border: `1px solid ${rate === p.rate ? "var(--color-noble-gold)" : "rgba(255,255,255,0.1)"}`,
                                                color: rate === p.rate ? "var(--color-noble-gold)" : "var(--color-noble-slate)",
                                                borderRadius: "4px",
                                                cursor: "none",
                                                transition: "all 200ms ease",
                                                fontFamily: "var(--font-body)",
                                                fontSize: "0.85rem",
                                                textAlign: "left",
                                                display: "flex",
                                                justifyContent: "space-between"
                                            }}
                                        >
                                            <span>{p.label}</span>
                                            <span>{(p.rate * 100).toFixed(0)}% Target</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CinematicReveal>

                    {/* Results & Chart */}
                    <CinematicReveal type="slideRight" delay={0.4}>
                        <div>
                            <div style={{ display: "flex", gap: "2rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                                <div>
                                    <div style={{ fontSize: "0.75rem", color: "var(--color-noble-slate)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.25rem" }}>Projected Capital</div>
                                    <div style={{ fontFamily: "var(--font-heading)", fontSize: "2.5rem", color: "var(--color-noble-gold)", fontWeight: 700 }}>
                                        <MotionCounter value={finalBalance} prefix="$" />
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: "0.75rem", color: "var(--color-noble-slate)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.25rem" }}>Total Contributions</div>
                                    <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", color: "var(--color-noble-ivory)", fontWeight: 500, marginTop: "0.5rem" }}>
                                        <MotionCounter value={finalContributions} prefix="$" />
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: "0.75rem", color: "var(--color-noble-slate)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.25rem" }}>Compounded Growth</div>
                                    <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", color: "var(--color-noble-success)", fontWeight: 500, marginTop: "0.5rem" }}>
                                        <MotionCounter value={growth} prefix="$" isPlus />
                                    </div>
                                </div>
                            </div>
                            <V3DataChart monthly={monthly} years={years} rate={rate} />
                        </div>
                    </CinematicReveal>
                </div>
            </div>
            <style jsx global>{`
        @media (max-width: 900px) {
          .calc-grid {
            grid-template-columns: 1fr !important;
          }
        }
        
        .gold-slider {
            -webkit-appearance: none;
            width: 100%;
            height: 4px;
            border-radius: 4px;
            background: rgba(201, 168, 76, 0.2);
            outline: none;
            transition: background 0.2s;
        }
        .gold-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: var(--color-noble-gold);
            cursor: pointer;
            box-shadow: 0 0 10px rgba(201, 168, 76, 0.5);
            transition: box-shadow 0.2s ease, transform 0.2s ease;
        }
        .gold-slider::-webkit-slider-thumb:hover {
            box-shadow: 0 0 20px rgba(201, 168, 76, 0.8);
            transform: scale(1.1);
        }
      `}</style>
        </section>
    );
}
