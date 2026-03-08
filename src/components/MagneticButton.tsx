"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    intensity?: number;
    onClick?: () => void;
    as?: "button" | "a" | "div";
    href?: string;
}

export default function MagneticButton({
    children,
    className = "",
    style = {},
    intensity = 0.3,
    onClick,
    as: Component = "button",
    href,
}: MagneticButtonProps) {
    const ref = useRef<HTMLElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 200, damping: 15 });
    const springY = useSpring(y, { stiffness: 200, damping: 15 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * intensity;
        const deltaY = (e.clientY - centerY) * intensity;
        x.set(deltaX);
        y.set(deltaY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const MotionComponent = motion.create(Component);

    const props: Record<string, unknown> = {
        ref,
        className,
        style: { ...style, x: springX, y: springY },
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        onClick,
    };

    if (Component === "a" && href) {
        props.href = href;
    }

    return <MotionComponent {...props}>{children}</MotionComponent>;
}
