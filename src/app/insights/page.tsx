import SubpageHero from "@/components/SubpageHero";
import CinematicReveal from "@/components/CinematicReveal";
import HoverRevealArticle from "@/components/HoverRevealArticle";
import { getPublishedPosts } from "@/lib/actions";

export const metadata = {
    title: "Insights & Journal",
    description: "Macroeconomic analysis, proprietary market research, and institutional thought leadership."
};

export default async function InsightsPage() {
    // Fetch posts from DB
    const posts = await getPublishedPosts();

    // Example fallback data in case DB is empty
    const displayPosts = posts.length > 0 ? posts : [
        {
            title: "The Return of Sovereign Dominance in Global Credit",
            slug: "sovereign-dominance-global-credit",
            excerpt: "As geopolitical fragmentation accelerates, the traditional 60/40 portfolio is fundamentally obsolete. We examine the imperative shift toward sovereign and high-grade municipal sanctuaries.",
            coverImage: "/images/sections/portfolio.png",
            category: "Fixed Income Macro",
            createdAt: new Date()
        },
        {
            title: "Asymmetric Strategies in Distressed AI Infrastructure",
            slug: "asymmetric-strategies-ai-infrastructure",
            excerpt: "The capital expenditure on artificial intelligence compute is creating profound structural mispricings in ancillary energy and real estate markets. We dissect the alpha opportunities.",
            coverImage: "/images/sections/services_cards.png",
            category: "Equity Directives",
            createdAt: new Date(Date.now() - 86400000 * 5)
        },
        {
            title: "Evolving the Family Office for the Great Wealth Transfer",
            slug: "evolving-family-office-wealth-transfer",
            excerpt: "Over the next decade, $84 trillion will transition between generations. We outline the governance architectures required to prevent the 'shirtsleeves to shirtsleeves' phenomenon.",
            coverImage: "/images/pages/awards_detail.png",
            category: "Generational Stewardship",
            createdAt: new Date(Date.now() - 86400000 * 12)
        }
    ];

    return (
        <div style={{ background: "var(--color-noble-bg)", minHeight: "100vh" }}>
            <SubpageHero
                title="Insights & Journal"
                subtitle="Proprietary Market Intelligence."
                bgImage="/images/sections/news_insights.png"
            />

            <section className="section-padding">
                <div className="container-noble">
                    <CinematicReveal>
                        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", marginBottom: "5rem" }}>
                            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2.5rem", color: "var(--color-noble-gold)", marginBottom: "2rem" }}>
                                Unfiltered Perspective
                            </h2>
                            <p style={{ color: "var(--color-noble-slate)", fontSize: "1.1rem", lineHeight: 1.8 }}>
                                We disseminate our macro conclusions and tactical allocations exclusively through the Noble Rock Journal. This is not generic financial commentary—these are the strategic imperatives driving our capital deployment.
                            </p>
                        </div>
                    </CinematicReveal>

                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                        gap: "2.5rem"
                    }}>
                        {displayPosts.map((post, index) => (
                            <HoverRevealArticle
                                key={post.slug || index}
                                post={post as any}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
