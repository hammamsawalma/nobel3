'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (window.matchMedia('(pointer: coarse)').matches) return;

        const updateMousePosition = (e: MouseEvent) => {
            if (!isVisible) setIsVisible(true);
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            if (!e.target) return;
            const target = e.target as HTMLElement;
            if (
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('cursor-pointer') ||
                getComputedStyle(target).cursor === 'pointer'
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const handleMouseLeave = () => setIsVisible(false);

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);
        document.documentElement.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
            document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [isVisible]);

    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
        return null;
    }

    return (
        <>
            <motion.div
                className="custom-cursor-dot"
                animate={{
                    x: mousePosition.x - 4,
                    y: mousePosition.y - 4,
                    scale: isHovering ? 0 : 1,
                    opacity: isVisible ? 1 : 0
                }}
                transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
            />
            <motion.div
                className="custom-cursor-ring"
                animate={{
                    x: mousePosition.x - 16,
                    y: mousePosition.y - 16,
                    scale: isHovering ? 1.5 : 1,
                    opacity: isVisible ? 1 : 0,
                    backgroundColor: isHovering ? 'rgba(201, 168, 76, 0.1)' : 'transparent',
                    borderColor: isHovering ? 'rgba(201, 168, 76, 0)' : 'rgba(201, 168, 76, 0.5)'
                }}
                transition={{ type: 'tween', ease: 'backOut', duration: 0.15 }}
            />
        </>
    );
}
