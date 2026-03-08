"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BarChart3, BookOpen, MessageSquare } from "lucide-react";

const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Strategies", href: "/wealth-strategies/fixed-income", icon: BarChart3 },
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
                        const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: "0.2rem",
                                    padding: "0.5rem 1rem",
                                    textDecoration: "none",
                                    color: isActive ? "var(--color-noble-gold)" : "var(--color-noble-slate)",
                                    transition: "color 200ms ease",
                                    minWidth: "60px",
                                }}
                            >
                                <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
                                <span
                                    style={{
                                        fontSize: "0.6rem",
                                        fontFamily: "var(--font-body)",
                                        fontWeight: isActive ? 600 : 400,
                                        letterSpacing: "0.05em",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    {item.label}
                                </span>
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
