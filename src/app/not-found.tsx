import Link from "next/link";

export default function NotFound() {
    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(180deg, var(--color-noble-black) 0%, var(--color-noble-navy) 50%, var(--color-noble-black) 100%)",
            textAlign: "center",
            padding: "2rem"
        }}>
            <div style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(6rem, 15vw, 12rem)",
                color: "var(--color-noble-gold)",
                lineHeight: 1,
                opacity: 0.3,
                marginBottom: "-1rem"
            }}>
                404
            </div>

            <h1 style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                color: "var(--color-noble-ivory)",
                marginBottom: "1.5rem"
            }}>
                This Territory Is Uncharted
            </h1>

            <p style={{
                color: "var(--color-noble-slate)",
                fontSize: "1.1rem",
                lineHeight: 1.8,
                maxWidth: "500px",
                marginBottom: "3rem"
            }}>
                The page you are seeking does not exist within the Noble Rock domain.
                Our navigational instruments suggest returning to safer waters.
            </p>

            <Link href="/" className="btn-noble-primary">
                Return to Safety
            </Link>
        </div>
    );
}
