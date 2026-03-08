import SubpageHero from "@/components/SubpageHero";
import CinematicReveal from "@/components/CinematicReveal";

export const metadata = {
    title: "Privacy Policy | Noble Rock Private Wealth",
    description: "How Noble Rock Private Wealth collects, uses, and protects your personal information."
};

export default function PrivacyPage() {
    const sections = [
        {
            title: "1. Information We Collect",
            content: "We collect personal information necessary to provide our financial advisory services, including your name, contact details, financial information, tax file number, identification documents, and investment preferences. This information is collected directly from you during the client onboarding process and throughout our advisory relationship."
        },
        {
            title: "2. How We Use Your Information",
            content: "Your personal information is used exclusively for: providing tailored financial advice and portfolio management; regulatory compliance and reporting obligations; communicating portfolio updates, market insights, and service notifications; improving our services and client experience. We do not sell, rent, or trade your personal information to third parties."
        },
        {
            title: "3. Data Protection & Security",
            content: "We employ bank-grade 256-bit AES encryption for all data in transit and at rest. Access to client data is restricted to authorised personnel on a need-to-know basis. Our systems undergo regular penetration testing and security audits by independent third parties. All client portals are protected by multi-factor authentication."
        },
        {
            title: "4. Third-Party Disclosure",
            content: "We may share your information with: regulated custodians holding your assets; our auditors and compliance advisors; regulatory bodies as required by law (ASIC, ATO, AUSTRAC). All third parties are bound by strict confidentiality agreements and are required to maintain equivalent data protection standards."
        },
        {
            title: "5. Data Retention",
            content: "We retain your personal information for the duration of our advisory relationship and for a minimum of seven years thereafter, as required by Australian financial services regulations. Upon request, we will provide details of the specific information we hold about you."
        },
        {
            title: "6. Your Rights",
            content: "Under the Australian Privacy Act 1988, you have the right to: access the personal information we hold about you; request correction of inaccurate information; lodge a complaint regarding our handling of your information; opt out of marketing communications at any time."
        },
        {
            title: "7. Cookies & Analytics",
            content: "Our website uses essential cookies for functionality and analytics cookies to understand usage patterns. No personally identifiable information is collected through cookies. You may disable cookies through your browser settings, though this may affect website functionality."
        },
        {
            title: "8. Contact Us",
            content: "For privacy-related inquiries or to exercise your rights, contact our Privacy Officer at privacy@noblerock.com.au or call +61 2 8000 0000. We will respond to all privacy requests within 30 days."
        }
    ];

    return (
        <div style={{ background: "var(--color-noble-black)", minHeight: "100vh" }}>
            <SubpageHero
                title="Privacy Policy"
                subtitle="Your Privacy. Our Commitment."
                bgImage="/images/sections/about_us.png"
            />

            <section className="section-padding">
                <div className="container-noble" style={{ maxWidth: "900px", margin: "0 auto" }}>
                    <CinematicReveal>
                        <p style={{ color: "var(--color-noble-slate)", lineHeight: 1.8, marginBottom: "3rem", fontSize: "1.05rem" }}>
                            Noble Rock Private Wealth is committed to protecting your personal information in accordance with the Australian Privacy Principles (APPs) contained in the Privacy Act 1988 (Cth). This policy outlines how we collect, use, store, and disclose your personal information.
                        </p>
                    </CinematicReveal>

                    {sections.map((section, index) => (
                        <CinematicReveal key={index}>
                            <div style={{ marginBottom: "2.5rem" }}>
                                <h2 style={{
                                    fontFamily: "var(--font-heading)",
                                    fontSize: "1.5rem",
                                    color: "var(--color-noble-gold)",
                                    marginBottom: "1rem"
                                }}>
                                    {section.title}
                                </h2>
                                <p style={{
                                    color: "var(--color-noble-silver)",
                                    lineHeight: 1.8,
                                    fontSize: "1rem"
                                }}>
                                    {section.content}
                                </p>
                            </div>
                        </CinematicReveal>
                    ))}

                    <CinematicReveal>
                        <p style={{ color: "var(--color-noble-slate)", fontSize: "0.9rem", marginTop: "3rem", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "2rem" }}>
                            Last updated: March 2026. Noble Rock Private Wealth Pty Ltd (ABN 00 000 000 000 | AFSL 000000).
                        </p>
                    </CinematicReveal>
                </div>
            </section>
        </div>
    );
}
