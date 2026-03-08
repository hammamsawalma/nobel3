'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

interface HoverRevealArticleProps {
    post: {
        title: string;
        slug: string;
        excerpt?: string | null;
        coverImage?: string | null;
        category: string;
        createdAt: Date;
    };
    index: number;
}

export default function HoverRevealArticle({ post, index }: HoverRevealArticleProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link href={`/journal/${post.slug}`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="glass-card"
                style={{
                    position: "relative",
                    overflow: "hidden",
                    padding: "2.5rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                    height: "100%",
                    minHeight: "400px",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    border: isHovered ? "1px solid rgba(201,168,76,0.3)" : "1px solid rgba(255,255,255,0.05)",
                    transition: "border 0.4s ease, transform 0.4s ease",
                    transform: isHovered ? "translateY(-5px)" : "translateY(0)"
                }}
            >
                {/* Background Image Reveal */}
                <div style={{
                    position: "absolute",
                    inset: 0,
                    opacity: isHovered ? 0.15 : 0,
                    transition: "opacity 0.6s ease",
                    zIndex: 0
                }}>
                    {post.coverImage && (
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            style={{ objectFit: "cover", filter: "grayscale(100%)" }}
                        />
                    )}
                </div>

                <div style={{ position: "relative", zIndex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                        <span style={{
                            color: "var(--color-noble-gold)",
                            fontSize: "0.85rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            fontWeight: 600
                        }}>
                            {post.category}
                        </span>
                        <span style={{ color: "var(--color-noble-slate)", fontSize: "0.85rem" }}>
                            {new Date(post.createdAt).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                    </div>

                    <h3 style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.75rem",
                        color: isHovered ? "var(--color-noble-gold)" : "var(--color-noble-ivory)",
                        lineHeight: 1.3,
                        transition: "color 0.4s ease"
                    }}>
                        {post.title}
                    </h3>

                    {post.excerpt && (
                        <p style={{
                            color: "var(--color-noble-slate)",
                            fontSize: "1rem",
                            lineHeight: 1.6,
                            marginTop: "1.5rem",
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden"
                        }}>
                            {post.excerpt}
                        </p>
                    )}
                </div>

                <div style={{
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "var(--color-noble-gold)",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    fontSize: "0.85rem",
                    letterSpacing: "0.1em",
                    transform: isHovered ? "translateX(5px)" : "translateX(0)",
                    transition: "transform 0.4s ease"
                }}>
                    Read Directive <ArrowRight size={16} />
                </div>
            </motion.div>
        </Link>
    );
}
