import HeroSection from "@/components/sections/HeroSection";
import MarketTicker from "@/components/MarketTicker";
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
        <>
            <HeroSection />
            <MarketTicker />
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
        </>
    );
}
