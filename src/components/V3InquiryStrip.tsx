'use client';

import Link from "next/link";
import { Phone, MessageSquare } from "lucide-react";

export default function V3InquiryStrip() {
    return (
        <div
            style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 40,
                display: "none",
                background: "rgba(10, 10, 10, 0.95)",
                backdropFilter: "blur(12px)",
                borderTop: "1px solid rgba(201, 168, 76, 0.2)",
                padding: "0.75rem 1rem",
            }}
            className="mobile-inquiry-strip"
        >
            <div style={{
                display: "flex",
                gap: "0.75rem",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Link
                    href="tel:+61280000000"
                    style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                        padding: "0.75rem",
                        background: "var(--color-noble-gold)",
                        color: "var(--color-noble-black)",
                        fontWeight: 600,
                        fontSize: "0.85rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        textDecoration: "none"
                    }}
                >
                    <Phone size={16} /> Call Now
                </Link>
                <Link
                    href="/contact"
                    style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                        padding: "0.75rem",
                        background: "transparent",
                        border: "1px solid var(--color-noble-gold)",
                        color: "var(--color-noble-gold)",
                        fontWeight: 600,
                        fontSize: "0.85rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        textDecoration: "none"
                    }}
                >
                    <MessageSquare size={16} /> Inquire
                </Link>
            </div>
        </div>
    );
}
