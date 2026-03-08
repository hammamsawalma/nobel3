"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BarChart3, BookOpen, MessageSquare, Sparkles } from "lucide-react";

type NavItem = {
    label: string;
    href?: string;
    action?: string;
    icon: React.ElementType;
};

const navItems: NavItem[] = [
    { label: "Home", href: "/", icon: Home },
    { label: "Strategies", href: "/wealth-strategies/fixed-income", icon: BarChart3 },
    { label: "Concierge", action: "openAI", icon: Sparkles },
    { label: "Insights", href: "/insights", icon: BookOpen },
    { label: "Contact", href: "/contact", icon: MessageSquare },
];

export default function MobileNav() {
    const pathname = usePathname();

    return (
        <>
            <nav
                className="mobile-bottom-nav"
                style={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 998,
                    display: "none",
                    background: "rgba(10, 10, 10, 0.95)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    borderTop: "1px solid rgba(201, 168, 76, 0.12)",
                    padding: "0.5rem 0",
                    paddingBottom: "env(safe-area-inset-bottom, 0.5rem)",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        maxWidth: "500px",
                        margin: "0 auto",
                    }}
                >
                    {navItems.map((item) => {
                        const isActive = item.href ? (pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))) : false;
                        const Icon = item.icon;
                        const isAI = item.action === "openAI";

                        const content = (
                            <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <Icon size={20} strokeWidth={isActive || isAI ? 2 : 1.5} />
                                {isAI && (
                                    <span
                                        style={{
                                            position: "absolute",
                                            top: -2,
                                            right: -4,
                                            width: 6,
                                            height: 6,
                                            backgroundColor: "var(--color-noble-gold)",
                                            borderRadius: "50%",
                                            boxShadow: "0 0 8px var(--color-noble-gold)",
                                            animation: "pulse-gold 2s infinite"
                                        }}
                                    />
                                )}
                                <span
                                    style={{
                                        fontSize: "0.6rem",
                                        fontFamily: "var(--font-body)",
                                        fontWeight: isActive || isAI ? 600 : 400,
                                        letterSpacing: "0.05em",
                                        textTransform: "uppercase",
                                        marginTop: "0.2rem"
                                    }}
                                >
                                    {item.label}
                                </span>
                            </div>
                        );

                        const commonStyle = {
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "0.2rem",
                            padding: "0.5rem 0.5rem",
                            textDecoration: "none",
                            color: isAI ? "var(--color-noble-gold)" : (isActive ? "var(--color-noble-gold)" : "var(--color-noble-slate)"),
                            transition: "all 200ms ease",
                            minWidth: "60px",
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                        } as React.CSSProperties;

                        if (isAI) {
                            return (
                                <button
                                    key={item.label}
                                    onClick={() => window.dispatchEvent(new Event("open-ai-chat"))}
                                    style={commonStyle}
                                >
                                    {content}
                                </button>
                            );
                        }

                        return (
                            <Link
                                key={item.href}
                                href={item.href!}
                                style={commonStyle}
                            >
                                {content}
                            </Link>
                        );
                    })}
                </div>
            </nav>
            <style jsx global>{`
        @media (max-width: 768px) {
          .mobile-bottom-nav {
            display: block !important;
          }
          body {
            padding-bottom: 80px;
          }
        }
      `}</style>
        </>
    );
}
