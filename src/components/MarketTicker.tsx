"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface TickerData {
    symbol: string;
    name: string;
    value: string;
    change: number;
}

const data: TickerData[] = [
    { symbol: "RBA", name: "Cash Rate", value: "4.35%", change: 0 },
    { symbol: "XJO", name: "ASX 200", value: "7,812.50", change: 0.45 },
    { symbol: "XT3", name: "Aus 3Y Bond", value: "3.71%", change: -0.02 },
    { symbol: "XT10", name: "Aus 10Y Bond", value: "4.12%", change: 0.05 },
    { symbol: "AUD/USD", name: "Forex", value: "0.6542", change: -0.15 },
    { symbol: "GOLD", name: "Commodity", value: "$2,342.10", change: 1.2 },
];

export default function MarketTicker() {
    const getChangeColor = (change: number) => {
        if (change > 0) return "var(--color-noble-success)";
        if (change < 0) return "var(--color-noble-danger)";
        return "var(--color-noble-slate)";
    };

    const getChangeIcon = (change: number) => {
        if (change > 0) return <TrendingUp size={14} />;
        if (change < 0) return <TrendingDown size={14} />;
        return <Minus size={14} />;
    };

    // Duplicate 4 times to ensure seamless pure CSS scrolling. 
    // Translating to -50% will exactly cover 2 arrays out of 4, keeping the loop perfect.
    const tickerItems = [...data, ...data, ...data, ...data];

    return (
        <div style={{ background: "var(--color-noble-navy)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "0.5rem 0", overflow: "hidden", display: "flex", whiteSpace: "nowrap", position: "relative" }}>
            <div className="ticker-track">
                {tickerItems.map((item, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontFamily: "var(--font-body)", fontSize: "0.75rem" }}>
                        <span style={{ color: "var(--color-noble-gold-muted)", fontWeight: 600, letterSpacing: "0.05em" }}>{item.symbol}</span>
                        <span style={{ color: "var(--color-noble-ivory)" }}>{item.value}</span>
                        <span style={{ color: getChangeColor(item.change), display: "flex", alignItems: "center", gap: "0.25rem", fontWeight: 500 }}>
                            {getChangeIcon(item.change)}
                            {Math.abs(item.change)}%
                        </span>
                    </div>
                ))}
            </div>

            <style jsx global>{`
                .ticker-track {
                    display: flex;
                    gap: 3rem;
                    padding-right: 3rem;
                    animation: tickerScroll 40s linear infinite;
                    will-change: transform;
                }
                .ticker-track:hover {
                    animation-play-state: paused;
                }
                @keyframes tickerScroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
            `}</style>
        </div>
    );
}
