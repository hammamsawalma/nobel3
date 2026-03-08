"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface IslandCardProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    tiltIntensity?: number;
    glowOnHover?: boolean;
    floatIdle?: boolean;
    spotlightEffect?: boolean;
    as?: "div" | "article" | "li";
}

export default function IslandCard({
    children,
    className = "",
    style = {},
    tiltIntensity = 8,
    glowOnHover = true,
    floatIdle = false,
    spotlightEffect = true,
    as: Component = "div",
}: IslandCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    // Tilt motion values
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${tiltIntensity}deg`, `-${tiltIntensity}deg`]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${tiltIntensity}deg`, `${tiltIntensity}deg`]);

    const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / rect.width - 0.5;
        const yPct = mouseY / rect.height - 0.5;
        x.set(xPct);
        y.set(yPct);

        if (spotlightEffect) {
            setSpotlightPos({
                x: (mouseX / rect.width) * 100,
                y: (mouseY / rect.height) * 100,
            });
        }
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const MotionComponent = motion.create(Component);

    return (
        <MotionComponent
            className={`glass-card ${floatIdle ? "float-idle" : ""} ${className}`}
            style={{
                ...style,
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                perspective: 1200,
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Spotlight overlay */}
            {spotlightEffect && (
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "inherit",
                        background: isHovered
                            ? `radial-gradient(600px circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(201, 168, 76, 0.06), transparent 50%)`
                            : "none",
                        pointerEvents: "none",
                        zIndex: 2,
                        transition: "background 300ms ease",
                    }}
                />
            )}

            {/* Inner glow on hover */}
            {glowOnHover && (
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "inherit",
                        boxShadow: isHovered
                            ? "inset 0 1px 0 rgba(201, 168, 76, 0.12), inset 0 -1px 0 rgba(0, 0, 0, 0.2)"
                            : "inset 0 1px 0 rgba(255, 255, 255, 0.03)",
                        pointerEvents: "none",
                        zIndex: 2,
                        transition: "box-shadow 500ms ease",
                    }}
                />
            )}

            {/* Content at Z depth */}
            <div
                style={{
                    position: "relative",
                    zIndex: 3,
                    transform: "translateZ(20px)",
                }}
            >
                {children}
            </div>
        </MotionComponent>
    );
}
