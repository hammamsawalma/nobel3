import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SubpageHero({ title, subtitle, bgImage }: { title: string, subtitle: string, bgImage: string }) {
    return (
        <section
            style={{
                position: "relative",
                height: "50vh",
                minHeight: "400px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.7), rgba(10, 10, 10, 0.9)), url(${bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderBottom: "1px solid rgba(201,168,76,0.3)"
            }}
        >
            <div className="container-noble" style={{ textAlign: "center", position: "relative", zIndex: 2, marginTop: "4rem" }}>
                <h1 style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "clamp(2.5rem, 5vw, 4rem)",
                    color: "var(--color-noble-ivory)",
                    marginBottom: "1rem"
                }}>
                    {title}
                </h1>
                <p style={{
                    color: "var(--color-noble-gold)",
                    fontSize: "1.1rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase"
                }}>
                    {subtitle}
                </p>
            </div>
        </section>
    );
}
