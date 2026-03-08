"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, LayoutGroup } from "framer-motion";

export default function ScrollSpyNav({ sections }: { sections: { id: string, label: string }[] }) {
    const [activeSection, setActiveSection] = useState(sections[0].id);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                let currentActive = activeSection;
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        currentActive = entry.target.id;
                    }
                });
                setActiveSection(currentActive);
            },
            { rootMargin: "-30% 0px -70% 0px" } // Triggers when element is primarily in top view
        );

        sections.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [sections, activeSection]);

    return (
        <aside className="scrollspy-nav">
            <nav
                style={{
                    position: "sticky",
                    top: "140px",
                    paddingRight: "2rem",
                    borderRight: "1px solid rgba(201, 168, 76, 0.2)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                    alignItems: "flex-end",
                    textAlign: "right"
                }}
            >
                <LayoutGroup>
                    {sections.map(({ id, label }) => (
                        <Link
                            key={id}
                            href={`#${id}`}
                            style={{
                                position: "relative",
                                fontFamily: "var(--font-body)",
                                fontSize: "0.85rem",
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
                                color: activeSection === id ? "var(--color-noble-gold)" : "var(--color-noble-slate)",
                                textDecoration: "none",
                                transition: "color 0.3s ease",
                                paddingRight: "1.5rem"
                            }}
                        >
                            {label}
                            {activeSection === id && (
                                <motion.div
                                    layoutId="scrollspy-indicator"
                                    style={{
                                        position: "absolute",
                                        right: "-1px",
                                        top: "50%",
                                        width: "3px",
                                        height: "20px",
                                        marginTop: "-10px",
                                        background: "var(--color-noble-gold)",
                                        borderRadius: "2px"
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </Link>
                    ))}
                </LayoutGroup>
            </nav>
        </aside>
    );
}
