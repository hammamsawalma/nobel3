import { redirect } from 'next/navigation';
import { verifyAdmin } from '@/lib/auth';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { FileText, Image, ExternalLink, LayoutDashboard } from 'lucide-react';

export default async function AdminDashboard() {
    const isAuth = await verifyAdmin();
    if (!isAuth) redirect('/admin');

    const postCount = await prisma.post.count();
    const publishedPosts = await prisma.post.count({ where: { isPublished: true } });
    const insightCount = await prisma.insight.count();
    const mediaCount = await prisma.media.count();

    const stats = [
        { label: 'Total Posts', value: postCount, icon: FileText, href: '/admin/posts' },
        { label: 'Published', value: publishedPosts, icon: LayoutDashboard, href: '/admin/posts' },
        { label: 'Insights', value: insightCount, icon: ExternalLink, href: '/admin/insights' },
        { label: 'Media Files', value: mediaCount, icon: Image, href: '/admin/media' },
    ];

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--color-noble-black)',
            padding: '2rem'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '3rem',
                    paddingBottom: '1.5rem',
                    borderBottom: '1px solid rgba(201, 168, 76, 0.15)'
                }}>
                    <div>
                        <h1 style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '2rem',
                            color: 'var(--color-noble-gold)'
                        }}>
                            Noble Rock CMS
                        </h1>
                        <p style={{ color: 'var(--color-noble-slate)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                            Content Management Dashboard
                        </p>
                    </div>
                    <Link href="/" style={{
                        color: 'var(--color-noble-slate)',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        padding: '0.5rem 1rem',
                        border: '1px solid rgba(255,255,255,0.1)',
                        transition: 'all 0.3s ease'
                    }}>
                        ← View Site
                    </Link>
                </div>

                {/* Stats Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '3rem'
                }}>
                    {stats.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <Link href={stat.href} key={i} style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{
                                    padding: '2rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1rem'
                                }}>
                                    <Icon size={24} style={{ color: 'var(--color-noble-gold)' }} />
                                    <div style={{
                                        fontFamily: 'var(--font-heading)',
                                        fontSize: '2.5rem',
                                        color: 'var(--color-noble-ivory)',
                                        lineHeight: 1
                                    }}>
                                        {stat.value}
                                    </div>
                                    <div style={{
                                        color: 'var(--color-noble-slate)',
                                        fontSize: '0.85rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.1em'
                                    }}>
                                        {stat.label}
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Quick Actions */}
                <div style={{ marginTop: '2rem' }}>
                    <h2 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.5rem',
                        color: 'var(--color-noble-ivory)',
                        marginBottom: '1.5rem'
                    }}>
                        Quick Actions
                    </h2>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <Link href="/admin/posts" className="btn-noble-primary">
                            Manage Posts
                        </Link>
                        <Link href="/admin/insights" className="btn-noble-secondary">
                            Manage Insights
                        </Link>
                        <Link href="/admin/media" className="btn-noble-secondary">
                            Media Library
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
