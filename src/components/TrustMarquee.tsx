"use client";

import { motion } from "framer-motion";

const logos = [
    "ASIC Regulated",
    "AFCA Member",
    "Tier-1 Custodians",
    "Fee-Only Fiduciary",
    "Institutional Execution",
    "Generational Capital"
];

export default function TrustMarquee() {
    const marqueeItems = [...logos, ...logos, ...logos];

    return (
        <section style={{ background: "var(--color-noble-black)", padding: "2rem 0", overflow: "hidden", borderTop: "1px solid rgba(201,168,76,0.1)" }}>
            <motion.div
                animate={{ x: ["0%", "-33.33%"] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
                style={{ display: "flex", gap: "5rem", paddingRight: "5rem" }}
            >
                {marqueeItems.map((item, idx) => (
                    <div
                        key={idx}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                            color: "var(--color-noble-slate)",
                            fontFamily: "var(--font-heading)",
                            fontSize: "1.25rem",
                            letterSpacing: "0.05em",
                            whiteSpace: "nowrap"
                        }}
                    >
                        <div style={{ width: "8px", height: "8px", background: "var(--color-noble-gold)", transform: "rotate(45deg)" }} />
                        {item}
                    </div>
                ))}
            </motion.div>
        </section>
    );
}
