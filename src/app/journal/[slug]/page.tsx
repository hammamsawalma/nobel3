import { getPostBySlug } from "@/lib/actions";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Share2 } from "lucide-react";
import CinematicReveal from "@/components/CinematicReveal";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    if (!post) return { title: "Not Found" };

    return {
        title: `${post.title} | Noble Rock Journal`,
        description: post.excerpt || post.metaDescription || "Noble Rock Insights"
    };
}

export default async function JournalPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    let post = await getPostBySlug(slug);

    // Dummy post for the front-end fallback if missing DB records
    if (!post) {
        if (slug === "sovereign-dominance-global-credit") {
            post = {
                id: "dummy-1",
                title: "The Return of Sovereign Dominance in Global Credit",
                slug: "sovereign-dominance-global-credit",
                content: "<p>As geopolitical fragmentation accelerates, the traditional 60/40 portfolio is fundamentally obsolete. We examine the imperative shift toward sovereign and high-grade municipal sanctuaries.</p><p>We have long argued that an era of structurally higher inflation and sovereign debt proliferation permanently alters the utility of long-duration bonds. The 'risk-free rate' is no longer truly risk-free when adjusted for purchasing power degradation.</p><h2>The Core Thesis</h2><p>Our mandate is not simply to beat an arbitrary benchmark; it is to compound wealth while maintaining absolute survivability characteristics during major market dislocations. Sovereign dominance in the credit markets represents our primary defensive posture heading into Q4 and beyond.</p>",
                excerpt: "As geopolitical fragmentation accelerates, the traditional 60/40 portfolio is fundamentally obsolete.",
                coverImage: "/branding_images/services_fixed_income.png",
                category: "Fixed Income Macro",
                isPublished: true,
                metaTitle: null,
                metaDescription: null,
                createdAt: new Date(),
                updatedAt: new Date()
            };
        } else {
            notFound();
        }
    }

    return (
        <div style={{ background: "var(--color-noble-bg)", minHeight: "100vh" }}>
            {/* Article Hero */}
            <section style={{
                position: "relative",
                height: "60vh",
                minHeight: "500px",
                display: "flex",
                alignItems: "flex-end",
                paddingBottom: "4rem",
                backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.4), rgba(10, 10, 10, 1)), url(${post.coverImage || '/branding_images/awards_recognition_background.png'})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}>
                <div className="container-noble" style={{ position: "relative", zIndex: 2, width: "100%" }}>
                    <div style={{ maxWidth: "900px" }}>
                        <Link href="/insights" style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            color: "var(--color-noble-gold)",
                            textTransform: "uppercase",
                            fontSize: "0.85rem",
                            letterSpacing: "0.1em",
                            marginBottom: "2rem",
                            fontWeight: 600
                        }} className="hover:opacity-80 transition-opacity">
                            <ArrowLeft size={16} /> Returns to Journal
                        </Link>

                        <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1rem" }}>
                            <span style={{
                                color: "var(--color-noble-gold)",
                                fontSize: "0.9rem",
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
                                fontWeight: 600,
                                padding: "0.25rem 0.75rem",
                                border: "1px solid rgba(201,168,76,0.3)",
                                borderRadius: "2px"
                            }}>
                                {post.category}
                            </span>
                            <span style={{ color: "var(--color-noble-slate)", fontSize: "0.9rem" }}>
                                {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                        </div>

                        <h1 style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "clamp(2.5rem, 5vw, 4rem)",
                            color: "var(--color-noble-ivory)",
                            lineHeight: 1.1,
                            textWrap: "balance" as any
                        }}>
                            {post.title}
                        </h1>
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <section className="section-padding">
                <div className="container-noble">
                    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                        <CinematicReveal>
                            <div
                                className="prose prose-invert prose-lg max-w-none"
                                style={{
                                    color: "var(--color-noble-slate)",
                                    fontFamily: "var(--font-body)",
                                    lineHeight: 1.8,
                                    fontSize: "1.1rem"
                                }}
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />

                            <div style={{
                                marginTop: "4rem",
                                paddingTop: "2rem",
                                borderTop: "1px solid rgba(255,255,255,0.1)",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                                <div style={{ color: "var(--color-noble-ivory)", fontFamily: "var(--font-heading)", fontSize: "1.25rem" }}>
                                    Noble Rock Private Wealth
                                </div>
                                <button style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    color: "var(--color-noble-gold)",
                                    background: "transparent",
                                    border: "none",
                                    cursor: "pointer",
                                    fontSize: "0.9rem",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.1em"
                                }}>
                                    <Share2 size={16} /> Share Directive
                                </button>
                            </div>
                        </CinematicReveal>
                    </div>
                </div>
            </section>

        </div>
    );
}

