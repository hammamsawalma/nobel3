import type { Metadata } from "next";
import { Playfair_Display, Inter, Cormorant_Garamond } from "next/font/google";
import V3Header from "@/components/V3Header";
import V3Footer from "@/components/V3Footer";
import MobileNav from "@/components/MobileNav";
import LenisProvider from "@/components/LenisProvider";
import V3InquiryStrip from "@/components/V3InquiryStrip";
import AIChatWidget from "@/components/AIChatWidget";
import CustomCursor from "@/components/CustomCursor";
import PageTransition from "@/components/PageTransition";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import "./globals.css";

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
    display: "swap",
    weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
    weight: ["300", "400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    variable: "--font-cormorant",
    display: "swap",
    weight: ["300", "400", "500", "600", "700"],
    style: ["normal", "italic"],
});

export const metadata: Metadata = {
    title: {
        default: "Noble Rock Private Wealth | Preserving Legacy. Defending Capital.",
        template: "%s | Noble Rock Private Wealth",
    },
    description:
        "Noble Rock Private Wealth — A heritage of institutional-grade wealth management, fiduciary stewardship, and generational capital preservation. ASIC regulated. Est. 1987.",
    keywords: [
        "private wealth",
        "wealth management",
        "investment",
        "fiduciary",
        "ASIC regulated",
        "capital preservation",
        "Noble Rock",
    ],
    openGraph: {
        title: "Noble Rock Private Wealth",
        description: "Preserving Legacy. Defending Capital.",
        type: "website",
        locale: "en_AU",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${playfair.variable} ${inter.variable} ${cormorant.variable}`}
        >
            <body style={{ overflowX: "hidden", maxWidth: "100vw", width: "100%" }}>
                <LenisProvider>
                    <ScrollProgressBar />
                    <CustomCursor />
                    <V3Header />
                    <main style={{ minHeight: "100vh", overflowX: "hidden", maxWidth: "100vw" }}>
                        <PageTransition>
                            {children}
                        </PageTransition>
                    </main>
                    <V3Footer />
                    <MobileNav />
                    <AIChatWidget />
                    <V3InquiryStrip />
                </LenisProvider>
            </body>
        </html>
    );
}
