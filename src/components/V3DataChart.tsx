"use client";

import { useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface V3DataChartProps {
    monthly: number;
    years: number;
    rate: number;
}

export default function V3DataChart({ monthly, years, rate }: V3DataChartProps) {
    const data = useMemo(() => {
        let balance = 0;
        const result = [];
        const monthlyRate = rate / 12;

        for (let i = 0; i <= years; i++) {
            result.push({
                year: i === 0 ? "Today" : `Year ${i}`,
                balance: Math.round(balance),
                contributions: Math.round(monthly * 12 * i),
            });

            // Compound for next year (12 months)
            for (let m = 0; m < 12; m++) {
                balance += monthly;
                balance *= (1 + monthlyRate);
            }
        }
        return result;
    }, [monthly, years, rate]);

    const formatCurrency = (value: number) => {
        if (value >= 1000000) {
            return `$${(value / 1000000).toFixed(1)}M`;
        }
        return `$${(value / 1000).toFixed(0)}K`;
    };

    return (
        <div style={{ width: "100%", height: "350px", marginTop: "2rem" }}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--color-noble-gold)" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="var(--color-noble-gold)" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorContrib" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--color-noble-slate)" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="var(--color-noble-slate)" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis
                        dataKey="year"
                        tick={{ fill: "var(--color-noble-slate)", fontSize: 12, fontFamily: "var(--font-body)" }}
                        tickLine={false}
                        axisLine={false}
                        minTickGap={30}
                    />
                    <YAxis
                        tickFormatter={formatCurrency}
                        tick={{ fill: "var(--color-noble-slate)", fontSize: 12, fontFamily: "var(--font-body)" }}
                        tickLine={false}
                        axisLine={false}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "rgba(10,10,10,0.9)",
                            border: "1px solid var(--color-noble-gold-muted)",
                            borderRadius: "4px",
                            fontFamily: "var(--font-body)",
                            fontSize: "0.85rem"
                        }}
                        formatter={(value: any) => [`$${Number(value).toLocaleString()}`, "Projected Wealth"]}
                        labelStyle={{ color: "var(--color-noble-gold)", marginBottom: "0.5rem", fontWeight: 600 }}
                    />
                    <Area
                        type="monotone"
                        dataKey="contributions"
                        stroke="var(--color-noble-slate)"
                        fillOpacity={1}
                        fill="url(#colorContrib)"
                        strokeWidth={2}
                        animationDuration={1500}
                    />
                    <Area
                        type="monotone"
                        dataKey="balance"
                        stroke="var(--color-noble-gold)"
                        fillOpacity={1}
                        fill="url(#colorBalance)"
                        strokeWidth={3}
                        animationDuration={1500}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
