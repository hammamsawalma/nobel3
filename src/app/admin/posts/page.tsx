import { redirect } from 'next/navigation';
import { verifyAdmin } from '@/lib/auth';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';

export default async function AdminPostsPage() {
    const isAuth = await verifyAdmin();
    if (!isAuth) redirect('/admin');

    const posts = await prisma.post.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--color-noble-black)',
            padding: '2rem'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '2rem'
                }}>
                    <div>
                        <Link href="/admin/dashboard" style={{ color: 'var(--color-noble-gold)', textDecoration: 'none', fontSize: '0.85rem' }}>
                            ← Dashboard
                        </Link>
                        <h1 style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '2rem',
                            color: 'var(--color-noble-ivory)',
                            marginTop: '0.5rem'
                        }}>
                            Posts
                        </h1>
                    </div>
                    <Link href="/admin/posts/new" className="btn-noble-primary">
                        <Plus size={16} /> New Post
                    </Link>
                </div>

                {posts.length === 0 ? (
                    <div className="glass-card" style={{
                        padding: '4rem',
                        textAlign: 'center',
                        color: 'var(--color-noble-slate)'
                    }}>
                        <p>No posts yet. Create your first post to get started.</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                        {posts.map((post) => (
                            <div key={post.id} className="glass-card" style={{
                                padding: '1.5rem 2rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: '2rem'
                            }}>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{
                                        fontFamily: 'var(--font-heading)',
                                        fontSize: '1.1rem',
                                        color: 'var(--color-noble-ivory)',
                                        marginBottom: '0.25rem'
                                    }}>
                                        {post.title}
                                    </h3>
                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                        <span style={{
                                            color: 'var(--color-noble-gold)',
                                            fontSize: '0.8rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.05em'
                                        }}>
                                            {post.category}
                                        </span>
                                        <span style={{ color: 'var(--color-noble-slate)', fontSize: '0.8rem' }}>
                                            {new Date(post.createdAt).toLocaleDateString()}
                                        </span>
                                        <span style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.25rem',
                                            color: post.isPublished ? '#2D5A3D' : 'var(--color-noble-slate)',
                                            fontSize: '0.8rem'
                                        }}>
                                            {post.isPublished ? <><Eye size={12} /> Published</> : <><EyeOff size={12} /> Draft</>}
                                        </span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                    <Link href={`/admin/posts/${post.id}`} style={{
                                        color: 'var(--color-noble-gold)',
                                        padding: '0.5rem',
                                        display: 'flex'
                                    }}>
                                        <Edit size={18} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
