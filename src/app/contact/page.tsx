import SubpageHero from "@/components/SubpageHero";
import ContactSection from "@/components/sections/ContactSection";

export const metadata = {
    title: "Contact | Noble Rock Private Wealth",
    description: "Request a confidential consultation with Noble Rock Private Wealth."
};

export default function ContactPage() {
    return (
        <div style={{ background: "var(--color-noble-black)", minHeight: "100vh" }}>
            <SubpageHero
                title="Contact"
                subtitle="Begin The Conversation."
                bgImage="/images/sections/contact.png"
            />
            <ContactSection />
        </div>
    );
}
