import SubpageHero from "@/components/SubpageHero";
import CinematicReveal from "@/components/CinematicReveal";

export const metadata = {
    title: "Financial Services Guide | Noble Rock Private Wealth",
    description: "Important information about our financial services, fees, and how we operate."
};

export default function FsgPage() {
    return (
        <div style={{ background: "var(--color-noble-black)", minHeight: "100vh" }}>
            <SubpageHero
                title="Financial Services Guide"
                subtitle="Transparency in Every Engagement."
                bgImage="/images/sections/investment_philosophy.png"
            />

            <section className="section-padding">
                <div className="container-noble" style={{ maxWidth: "900px", margin: "0 auto" }}>
                    <CinematicReveal>
                        <p style={{ color: "var(--color-noble-slate)", lineHeight: 1.8, marginBottom: "3rem", fontSize: "1.05rem" }}>
                            This Financial Services Guide (FSG) is designed to help you decide whether to use the financial services offered by Noble Rock Private Wealth Pty Ltd. It contains information about our services, how we are remunerated, and how we handle complaints.
                        </p>
                    </CinematicReveal>

                    {[
                        {
                            title: "Who We Are",
                            content: "Noble Rock Private Wealth Pty Ltd holds an Australian Financial Services Licence (AFSL No. 000000) and is authorised to provide personal financial advice on securities, managed investments, superannuation, insurance, and portfolio management services to wholesale and retail clients."
                        },
                        {
                            title: "Services We Provide",
                            content: "We offer comprehensive wealth management including: bespoke portfolio construction and management; fixed income and capital preservation strategies; strategic equity alpha generation; retirement and superannuation planning; family office administration and governance; estate and succession planning; and philanthropic structuring."
                        },
                        {
                            title: "How We Are Paid",
                            content: "Noble Rock operates exclusively on a fee-for-service basis. We do not receive commissions, trail fees, or product-based remuneration of any kind. Our fees are transparent, agreed in advance, and typically structured as a percentage of assets under management (AUM) or as fixed advisory retainers. This removes all conflicts of interest from our advice."
                        },
                        {
                            title: "Fee Schedule",
                            content: "Portfolio Management: 0.50% – 1.25% p.a. of AUM (tiered by portfolio size). Advisory Retainer: from $15,000 p.a. for comprehensive planning. Project-Based Fees: quoted in advance for specific engagements such as estate restructuring or family governance frameworks. All fees are exclusive of GST."
                        },
                        {
                            title: "Your Rights",
                            content: "You have the right to: request a Statement of Advice (SOA) before any advisory engagement; ask about fees, commissions, or conflicts of interest; change or terminate our services at any time with 30 days written notice; and lodge a complaint through our internal dispute resolution process."
                        },
                        {
                            title: "Complaints Handling",
                            content: "If you are dissatisfied with our services, please contact our Compliance Officer at compliance@noblerock.com.au. We are committed to resolving complaints within 30 days. If you are not satisfied with our response, you may escalate the matter to the Australian Financial Complaints Authority (AFCA) at www.afca.org.au."
                        }
                    ].map((section, index) => (
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
                            This FSG was prepared on 1 March 2026 by Noble Rock Private Wealth Pty Ltd (ABN 00 000 000 000 | AFSL 000000). Version 3.0.
                        </p>
                    </CinematicReveal>
                </div>
            </section>
        </div>
    );
}
