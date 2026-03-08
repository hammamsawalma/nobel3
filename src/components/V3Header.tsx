"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
    { label: "The Firm", href: "/the-firm" },
    { label: "Wealth Strategies", href: "/wealth-strategies/fixed-income" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
];

export default function V3Header() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [islandMode, setIslandMode] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
        setScrolled(latest > 50);
        setIslandMode(latest > 200);
    });

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: hidden ? -100 : 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    position: "fixed",
                    top: islandMode ? "12px" : 0,
                    left: islandMode ? "clamp(1rem, 8vw, 8rem)" : 0,
                    right: islandMode ? "clamp(1rem, 8vw, 8rem)" : 0,
                    zIndex: 1000,
                    padding: islandMode
                        ? "0 clamp(1.5rem, 3vw, 2.5rem)"
                        : "0 clamp(1.5rem, 5vw, 4rem)",
                    height: islandMode ? "60px" : "80px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: scrolled
                        ? "rgba(10, 10, 15, 0.88)"
                        : "transparent",
                    backdropFilter: scrolled ? "blur(24px) saturate(1.2)" : "none",
                    WebkitBackdropFilter: scrolled ? "blur(24px) saturate(1.2)" : "none",
                    borderRadius: islandMode ? "100px" : "0",
                    border: islandMode
                        ? "1px solid rgba(201, 168, 76, 0.12)"
                        : scrolled
                            ? "1px solid rgba(201, 168, 76, 0.1)"
                            : "1px solid transparent",
                    borderTop: islandMode ? undefined : (scrolled ? "none" : "none"),
                    borderLeft: islandMode ? undefined : "none",
                    borderRight: islandMode ? undefined : "none",
                    borderBottom: islandMode
                        ? undefined
                        : scrolled
                            ? "1px solid rgba(201, 168, 76, 0.1)"
                            : "1px solid transparent",
                    boxShadow: islandMode
                        ? "0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(201, 168, 76, 0.06)"
                        : scrolled
                            ? "0 4px 30px rgba(0, 0, 0, 0.5)"
                            : "none",
                    transition: "top 500ms cubic-bezier(0.16,1,0.3,1), left 500ms cubic-bezier(0.16,1,0.3,1), right 500ms cubic-bezier(0.16,1,0.3,1), height 500ms cubic-bezier(0.16,1,0.3,1), border-radius 500ms cubic-bezier(0.16,1,0.3,1), background 300ms ease, border 300ms ease, box-shadow 300ms ease, padding 500ms cubic-bezier(0.16,1,0.3,1)",
                }}
            >
                {/* Logo */}
                <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{ position: "relative", width: islandMode ? "34px" : "44px", height: islandMode ? "34px" : "44px", transition: "all 400ms ease", flexShrink: 0 }}>
                        <Image
                            src="/images/logo/logo-monogram.png"
                            alt="Noble Rock"
                            fill
                            style={{ objectFit: "contain", borderRadius: islandMode ? "50%" : "0" }}
                            priority
                        />
                    </div>
                    <div style={{ transition: "opacity 300ms ease, width 300ms ease", opacity: islandMode ? 0 : 1, width: islandMode ? 0 : "auto", overflow: "hidden" }}>
                        <div
                            style={{
                                fontFamily: "var(--font-heading)",
                                fontSize: "1rem",
                                fontWeight: 700,
                                color: "var(--color-noble-ivory)",
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                                lineHeight: 1.2,
                                whiteSpace: "nowrap",
                            }}
                        >
                            Noble Rock
                        </div>
                        <div
                            style={{
                                fontFamily: "var(--font-body)",
                                fontSize: "0.6rem",
                                color: "var(--color-noble-gold-muted)",
                                letterSpacing: "0.2em",
                                textTransform: "uppercase",
                                whiteSpace: "nowrap",
                            }}
                        >
                            Private Wealth
                        </div>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: islandMode ? "1.5rem" : "2.5rem",
                        transition: "gap 500ms ease",
                    }}
                    className="desktop-nav"
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="desktop-nav-link"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link href="/portal" className="btn-noble-secondary" style={{
                        padding: islandMode ? "0.45rem 1.2rem" : "0.6rem 1.5rem",
                        fontSize: "0.7rem",
                        borderRadius: islandMode ? "100px" : "0",
                        transition: "all 400ms ease",
                    }}>
                        Client Vault
                    </Link>
                </nav>

                {/* Mobile Hamburger */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="mobile-menu-btn"
                    style={{
                        display: "none",
                        background: "none",
                        border: "1px solid var(--color-noble-gold-muted)",
                        borderRadius: "50%",
                        padding: "0.5rem",
                        cursor: "none",
                        color: "var(--color-noble-gold)",
                        width: "36px",
                        height: "36px",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
            </motion.header>

            {/* Mobile Fullscreen Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        style={{
                            position: "fixed",
                            inset: 0,
                            zIndex: 999,
                            background: "rgba(10, 10, 10, 0.96)",
                            backdropFilter: "blur(24px)",
                            WebkitBackdropFilter: "blur(24px)",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "2.5rem",
                        }}
                    >
                        {/* Mobile Menu Logo */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1, duration: 0.6 }}
                            style={{ position: "relative", width: "80px", height: "80px", marginBottom: "1rem" }}
                        >
                            <Image
                                src="/images/logo/logo-monogram.png"
                                alt="Noble Rock"
                                fill
                                style={{ objectFit: "contain", filter: "drop-shadow(0 0 20px rgba(201, 168, 76, 0.2))" }}
                            />
                        </motion.div>
                        {navLinks.map((link, i) => (
                            <motion.div
                                key={link.href}
                                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
                            >
                                <Link
                                    href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    style={{
                                        fontFamily: "var(--font-heading)",
                                        fontSize: "2rem",
                                        fontWeight: 600,
                                        color: "var(--color-noble-ivory)",
                                        textDecoration: "none",
                                        letterSpacing: "0.05em",
                                    }}
                                >
                                    {link.label}
                                </Link>
                            </motion.div>
                        ))}
                        <motion.div
                            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                        >
                            <Link href="/portal" className="btn-noble-primary" onClick={() => setMenuOpen(false)} style={{ borderRadius: "100px" }}>
                                Client Vault Access
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* CSS for responsive and hover effects */}
            <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
        
        .desktop-nav-link {
            font-family: var(--font-body);
            font-size: 0.75rem;
            font-weight: 500;
            color: var(--color-noble-silver);
            text-decoration: none;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            transition: color 300ms ease;
            position: relative;
            padding-bottom: 4px;
        }
        .desktop-nav-link:hover {
            color: var(--color-noble-gold);
        }
        .desktop-nav-link::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 1px;
            background: linear-gradient(90deg, var(--color-noble-gold), var(--color-noble-gold-light));
            transform: scaleX(0);
            transform-origin: right;
            transition: transform 0.4s cubic-bezier(0.86, 0, 0.07, 1);
        }
        .desktop-nav-link:hover::after {
            transform: scaleX(1);
            transform-origin: left;
        }
      `}</style>
        </>
    );
}
