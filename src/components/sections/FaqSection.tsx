'use client';

import CinematicReveal from "@/components/CinematicReveal";
import FaqAccordion from "@/components/FaqAccordion";
import Image from "next/image";

const faqData = [
    {
        question: "What is the minimum portfolio size to engage Noble Rock?",
        answer: "Noble Rock serves a select clientele with investable assets of AUD $2 million or greater. This threshold ensures we can deploy our full institutional framework—including bespoke asset allocation, dedicated relationship management, and access to our proprietary research—without compromise."
    },
    {
        question: "How does Noble Rock differ from traditional wealth advisors?",
        answer: "We operate under an absolute fiduciary standard. We do not sell products, accept commissions, or maintain proprietary trading positions. Our compensation is exclusively fee-based, ensuring our interests are permanently and irrevocably aligned with yours. We sit on the same side of the table."
    },
    {
        question: "What investment strategies does Noble Rock employ?",
        answer: "Our core disciplines include Fixed Income & Capital Preservation, Strategic Equities & Alpha Generation, Retirement & Generational Planning, and Family Office Administration. Each strategy is deployed through our proprietary research process, combining quantitative rigor with fundamental conviction."
    },
    {
        question: "Is my capital segregated from Noble Rock's operating funds?",
        answer: "Absolutely. All client capital is held in segregated accounts with independent, APRA-regulated custodians. Noble Rock never commingles client assets with operating capital. This structural separation provides an additional layer of protection for your wealth."
    },
    {
        question: "How do I access my portfolio information?",
        answer: "Clients receive access to our secure Client Vault—a real-time portfolio dashboard providing consolidated reporting, performance attribution, and direct communication with your dedicated relationship team. Quarterly reviews and ad-hoc consultations are standard."
    },
    {
        question: "What regulatory framework governs Noble Rock?",
        answer: "Noble Rock holds an Australian Financial Services Licence (AFSL) and operates under the oversight of the Australian Securities & Investments Commission (ASIC). We maintain strict compliance with all applicable regulatory requirements, including anti-money laundering (AML/CTF) obligations."
    },
    {
        question: "Can Noble Rock manage assets across multiple jurisdictions?",
        answer: "Yes. Through our global custodial relationships and multi-jurisdictional expertise, we manage portfolios across Australian, US, European, and Asia-Pacific markets. Our tax-aware structuring ensures optimal cross-border efficiency for internationally mobile clients."
    },
    {
        question: "What is the Noble Rock succession planning approach?",
        answer: "Our Succession Architecture integrates estate planning, trust structuring, and next-generation education into a unified governance framework. We work alongside your legal and tax advisors to ensure multi-generational wealth preservation and seamless transition of stewardship."
    },
    {
        question: "How do I begin a relationship with Noble Rock?",
        answer: "The process begins with a confidential, obligation-free consultation—what we call 'The First Audience.' During this meeting, we assess your financial landscape, discuss objectives, and determine whether our capabilities align with your requirements. Contact us to schedule."
    },
    {
        question: "Does Noble Rock provide reporting for tax purposes?",
        answer: "Yes. We provide comprehensive annual tax reporting packages, including realized and unrealized capital gains summaries, income distribution statements, and franking credit reports. Our reporting integrates seamlessly with your accountant's requirements."
    }
];

export default function FaqSection() {
    return (
        <section
            className="island-section noise-overlay"
            style={{ position: "relative", overflow: "hidden", background: "linear-gradient(180deg, var(--color-noble-black) 0%, rgba(10,10,10,0.85) 50%, var(--color-noble-black) 100%)" }}
        >
            <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
                <Image
                    src="/images/sections/faq_security_footer.png"
                    alt="Noble Rock FAQ Background"
                    fill
                    style={{ objectFit: "cover", opacity: 0.1 }}
                />
            </div>

            {/* Watermark */}
            <span className="section-watermark">08</span>

            <div className="container-noble section-padding" style={{ position: "relative", zIndex: 2 }}>
                <CinematicReveal>
                    <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                        <span style={{
                            color: "var(--color-noble-gold)",
                            textTransform: "uppercase",
                            fontSize: "0.85rem",
                            letterSpacing: "0.2em",
                            fontWeight: 600,
                            display: "block",
                            marginBottom: "1.5rem"
                        }}>
                            Frequently Asked Questions
                        </span>
                        <h2 style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "clamp(2rem, 4vw, 3rem)",
                            color: "var(--color-noble-ivory)",
                            marginBottom: "1.5rem"
                        }}>
                            Intelligence Briefing
                        </h2>
                        <div className="gold-divider" style={{ margin: "0 auto" }} />
                    </div>
                </CinematicReveal>

                <div style={{ maxWidth: "900px", margin: "0 auto" }}>
                    <FaqAccordion items={faqData} />
                </div>
            </div>
        </section>
    );
}
