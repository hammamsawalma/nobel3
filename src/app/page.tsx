import HeroSection from "@/components/sections/HeroSection";

import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import PhilosophySection from "@/components/sections/PhilosophySection";
import TrajectoryCalculator from "@/components/TrajectoryCalculator";
import FaqSection from "@/components/sections/FaqSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import AwardsSection from "@/components/sections/AwardsSection";
import SecuritySection from "@/components/sections/SecuritySection";
import CTASection from "@/components/sections/CTASection";
import ContactSection from "@/components/sections/ContactSection";
import NewsletterSection from "@/components/sections/NewsletterSection";
import TrustMarquee from "@/components/TrustMarquee";

export default function Home() {
    return (
        <main style={{ position: "relative" }}>
            {/* 
                HeroSection handles its own "sticky" behavior, so it stays fixed in the background 
                while the rest of the page content scrolls over it.
            */}
            <HeroSection />

            {/* 
                Wrap all subsequent sections in a relative container with a higher z-index 
                and background color so they slide *over* the sticky hero section.
            */}
            <div style={{ position: "relative", zIndex: 10, background: "var(--color-noble-black)", boxShadow: "0 -20px 40px rgba(0,0,0,0.5)" }}>

                <AboutSection />
                <ServicesSection />
                <PhilosophySection />
                <TrajectoryCalculator />
                <TestimonialsSection />
                <AwardsSection />
                <SecuritySection />
                <FaqSection />
                <CTASection />
                <ContactSection />
                <NewsletterSection />
                <TrustMarquee />
            </div>
        </main>
    );
}
