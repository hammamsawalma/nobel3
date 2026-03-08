'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FaqItem {
    question: string;
    answer: string;
}

interface FaqAccordionProps {
    items: FaqItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
            {items.map((item, index) => (
                <div
                    key={index}
                    style={{
                        background: openIndex === index
                            ? "rgba(201, 168, 76, 0.05)"
                            : "rgba(26, 26, 46, 0.4)",
                        border: "1px solid",
                        borderColor: openIndex === index
                            ? "rgba(201, 168, 76, 0.2)"
                            : "rgba(255, 255, 255, 0.05)",
                        transition: "all 0.4s ease",
                    }}
                >
                    <button
                        onClick={() => toggle(index)}
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "1.75rem 2rem",
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            textAlign: "left",
                        }}
                    >
                        <span
                            style={{
                                fontFamily: "var(--font-heading)",
                                fontSize: "1.2rem",
                                color: openIndex === index
                                    ? "var(--color-noble-gold)"
                                    : "var(--color-noble-ivory)",
                                transition: "color 0.3s ease",
                                paddingRight: "2rem",
                            }}
                        >
                            {item.question}
                        </span>
                        <motion.span
                            animate={{ rotate: openIndex === index ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                color: "var(--color-noble-gold)",
                                flexShrink: 0,
                            }}
                        >
                            {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                        </motion.span>
                    </button>

                    <AnimatePresence>
                        {openIndex === index && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                style={{ overflow: "hidden" }}
                            >
                                <div
                                    style={{
                                        padding: "0 2rem 1.75rem 2rem",
                                        color: "var(--color-noble-slate)",
                                        fontSize: "1.05rem",
                                        lineHeight: 1.8,
                                        borderTop: "1px solid rgba(201, 168, 76, 0.1)",
                                        paddingTop: "1.5rem",
                                        marginTop: "0",
                                    }}
                                >
                                    {item.answer}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
}
