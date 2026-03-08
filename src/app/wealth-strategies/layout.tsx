export default function WealthStrategiesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div style={{ background: "var(--color-noble-bg)", minHeight: "100vh" }}>
            {children}
        </div>
    );
}
