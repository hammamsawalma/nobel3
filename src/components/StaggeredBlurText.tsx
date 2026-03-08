"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface StaggeredBlurTextProps {
    text: string;
    className?: string;
    as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
    staggerDelay?: number;
    delay?: number;
    style?: React.CSSProperties;
}

export default function StaggeredBlurText({
    text,
    className,
    as: Tag = "h2",
    staggerDelay = 0.05,
    delay = 0,
    style,
}: StaggeredBlurTextProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });
    const words = text.split(" ");

    return (
        <Tag className={className} style={{ ...style, display: "flex", flexWrap: "wrap", gap: "0.3em" }} ref={ref as React.RefObject<HTMLHeadingElement>}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, filter: "blur(8px)", y: 10 }}
                    animate={isInView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
                    transition={{
                        duration: 0.6,
                        delay: delay + (i * staggerDelay),
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{ display: "inline-block" }}
                >
                    {word}
                </motion.span>
            ))}
        </Tag>
    );
}
