import SubpageHero from "@/components/SubpageHero";
import CinematicReveal from "@/components/CinematicReveal";
import { AlertTriangle, Shield, Phone, Mail } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Scam Alert | Noble Rock Private Wealth",
    description: "Important security advisory regarding fraud and impersonation attempts."
};

export default function ScamAlertPage() {
    return (
        <div style={{ background: "var(--color-noble-black)", minHeight: "100vh" }}>
            <SubpageHero
                title="Scam Alert"
                subtitle="Protecting Our Clients From Fraudulent Activity."
                bgImage="/images/sections/contact.png"
            />

            <section className="section-padding">
                <div className="container-noble" style={{ maxWidth: "900px", margin: "0 auto" }}>
                    <CinematicReveal>
                        <div style={{
                            background: "rgba(139, 46, 46, 0.15)",
                            border: "1px solid rgba(200, 60, 60, 0.3)",
                            padding: "2rem",
                            marginBottom: "3rem",
                            display: "flex",
                            gap: "1.5rem",
                            alignItems: "flex-start"
                        }}>
                            <AlertTriangle size={32} style={{ color: "#E74C3C", flexShrink: 0, marginTop: "0.25rem" }} />
                            <div>
                                <h3 style={{ fontFamily: "var(--font-heading)", color: "#E74C3C", marginBottom: "0.75rem", fontSize: "1.3rem" }}>
                                    Active Security Advisory
                                </h3>
                                <p style={{ color: "var(--color-noble-silver)", lineHeight: 1.8 }}>
                                    We are aware of fraudulent entities impersonating Noble Rock Private Wealth. These scams typically involve unsolicited contact via social media, messaging apps, or email, offering &quot;guaranteed returns&quot; or requesting personal financial information.
                                </p>
                            </div>
                        </div>
                    </CinematicReveal>

                    <CinematicReveal>
                        <h2 style={{ fontFamily: "var(--font-heading)", color: "var(--color-noble-gold)", fontSize: "1.8rem", marginBottom: "2rem" }}>
                            How to Identify Genuine Noble Rock Communication
                        </h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "3rem" }}>
                            {[
                                "Noble Rock will NEVER request funds via social media, WhatsApp, Telegram, or any messaging platform.",
                                "We will NEVER promise guaranteed returns or pressure you into immediate investment decisions.",
                                "All official correspondence comes from @noblerock.com.au email addresses only.",
                                "We will NEVER ask for passwords, PINs, or full credit card numbers via email or phone.",
                                "All client onboarding occurs through verified, in-person or secure video consultations."
                            ].map((item, i) => (
                                <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                                    <Shield size={18} style={{ color: "var(--color-noble-gold)", flexShrink: 0, marginTop: "0.25rem" }} />
                                    <p style={{ color: "var(--color-noble-silver)", lineHeight: 1.8 }}>{item}</p>
                                </div>
                            ))}
                        </div>
                    </CinematicReveal>

                    <CinematicReveal>
                        <h2 style={{ fontFamily: "var(--font-heading)", color: "var(--color-noble-gold)", fontSize: "1.8rem", marginBottom: "2rem" }}>
                            If You Suspect Fraud
                        </h2>
                        <p style={{ color: "var(--color-noble-silver)", lineHeight: 1.8, marginBottom: "2rem" }}>
                            If you have been contacted by someone claiming to represent Noble Rock and you suspect fraud, please take the following steps immediately:
                        </p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "3rem" }}>
                            <div style={{ display: "flex", gap: "1rem", alignItems: "center", color: "var(--color-noble-silver)" }}>
                                <Phone size={18} style={{ color: "var(--color-noble-gold)" }} />
                                <span>Contact us directly: <strong style={{ color: "var(--color-noble-ivory)" }}>+61 2 8000 0000</strong></span>
                            </div>
                            <div style={{ display: "flex", gap: "1rem", alignItems: "center", color: "var(--color-noble-silver)" }}>
                                <Mail size={18} style={{ color: "var(--color-noble-gold)" }} />
                                <span>Email: <strong style={{ color: "var(--color-noble-ivory)" }}>compliance@noblerock.com.au</strong></span>
                            </div>
                        </div>

                        <div style={{ marginTop: "3rem" }}>
                            <Link href="/contact" className="btn-noble-primary">Report Suspicious Activity</Link>
                        </div>
                    </CinematicReveal>
                </div>
            </section>
        </div>
    );
}
