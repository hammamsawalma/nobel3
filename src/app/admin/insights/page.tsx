import { redirect } from 'next/navigation';
import { verifyAdmin } from '@/lib/auth';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Edit, Eye, EyeOff } from 'lucide-react';

export default async function AdminInsightsPage() {
    const isAuth = await verifyAdmin();
    if (!isAuth) redirect('/admin');

    const insights = await prisma.insight.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div style={{ minHeight: '100vh', background: 'var(--color-noble-black)', padding: '2rem' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div>
                        <Link href="/admin/dashboard" style={{ color: 'var(--color-noble-gold)', textDecoration: 'none', fontSize: '0.85rem' }}>
                            ← Dashboard
                        </Link>
                        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--color-noble-ivory)', marginTop: '0.5rem' }}>
                            External Insights
                        </h1>
                    </div>
                    <Link href="/admin/insights/new" className="btn-noble-primary">
                        <Plus size={16} /> New Insight
                    </Link>
                </div>

                {insights.length === 0 ? (
                    <div className="glass-card" style={{ padding: '4rem', textAlign: 'center', color: 'var(--color-noble-slate)' }}>
                        <p>No insights yet. Add external links and references.</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                        {insights.map((insight) => (
                            <div key={insight.id} className="glass-card" style={{
                                padding: '1.5rem 2rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <div>
                                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--color-noble-ivory)', marginBottom: '0.25rem' }}>
                                        {insight.title}
                                    </h3>
                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                        <span style={{ color: 'var(--color-noble-slate)', fontSize: '0.8rem' }}>{insight.publisher}</span>
                                        <span style={{
                                            display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
                                            color: insight.isPublished ? '#2D5A3D' : 'var(--color-noble-slate)', fontSize: '0.8rem'
                                        }}>
                                            {insight.isPublished ? <><Eye size={12} /> Published</> : <><EyeOff size={12} /> Draft</>}
                                        </span>
                                    </div>
                                </div>
                                <Link href={`/admin/insights/${insight.id}`} style={{ color: 'var(--color-noble-gold)' }}>
                                    <Edit size={18} />
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
