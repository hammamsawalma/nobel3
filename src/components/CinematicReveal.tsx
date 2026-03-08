"use client";

import { useRef, ReactNode } from "react";
import { motion, useInView, Variant } from "framer-motion";

type RevealType = "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "scaleUp";

const variants: Record<RevealType, { hidden: Variant; visible: Variant }> = {
    fadeUp: {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0 },
    },
    fadeIn: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },
    slideLeft: {
        hidden: { opacity: 0, x: -80 },
        visible: { opacity: 1, x: 0 },
    },
    slideRight: {
        hidden: { opacity: 0, x: 80 },
        visible: { opacity: 1, x: 0 },
    },
    scaleUp: {
        hidden: { opacity: 0, scale: 0.85 },
        visible: { opacity: 1, scale: 1 },
    },
};

interface CinematicRevealProps {
    children: ReactNode;
    type?: RevealType;
    delay?: number;
    duration?: number;
    className?: string;
    style?: React.CSSProperties;
}

export default function CinematicReveal({
    children,
    type = "fadeUp",
    delay = 0,
    duration = 0.8,
    className,
    style,
}: CinematicRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants[type]}
            transition={{
                duration,
                delay,
                ease: [0.16, 1, 0.3, 1],
            }}
            className={className}
            style={style}
        >
            {children}
        </motion.div>
    );
}
