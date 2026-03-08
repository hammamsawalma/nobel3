'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewPostPage() {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        content: '',
        excerpt: '',
        coverImage: '',
        category: 'Market Insight',
        isPublished: false
    });

    const generateSlug = (title: string) => {
        return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch('/api/admin/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                router.push('/admin/posts');
            }
        } finally {
            setSaving(false);
        }
    };

    const inputStyle: React.CSSProperties = {
        width: '100%',
        padding: '1rem',
        background: 'rgba(10, 10, 10, 0.5)',
        border: '1px solid rgba(201, 168, 76, 0.15)',
        color: 'var(--color-noble-ivory)',
        fontFamily: 'var(--font-body)',
        fontSize: '1rem',
        outline: 'none',
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--color-noble-black)', padding: '2rem' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <Link href="/admin/posts" style={{ color: 'var(--color-noble-gold)', textDecoration: 'none', fontSize: '0.85rem' }}>
                    ← Back to Posts
                </Link>
                <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--color-noble-ivory)', marginTop: '0.5rem', marginBottom: '2rem' }}>
                    New Post
                </h1>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <input
                        type="text"
                        placeholder="Post Title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value, slug: generateSlug(e.target.value) })}
                        style={inputStyle}
                        required
                    />
                    <input
                        type="text"
                        placeholder="slug-url"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        style={{ ...inputStyle, fontSize: '0.9rem', color: 'var(--color-noble-slate)' }}
                    />
                    <input
                        type="text"
                        placeholder="Excerpt (short description)"
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        style={inputStyle}
                    />
                    <input
                        type="text"
                        placeholder="Cover Image URL"
                        value={formData.coverImage}
                        onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                        style={inputStyle}
                    />
                    <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        style={{ ...inputStyle, cursor: 'pointer' }}
                    >
                        <option value="Market Insight">Market Insight</option>
                        <option value="Fixed Income Macro">Fixed Income Macro</option>
                        <option value="Equity Directives">Equity Directives</option>
                        <option value="Generational Stewardship">Generational Stewardship</option>
                        <option value="Regulatory Update">Regulatory Update</option>
                    </select>
                    <textarea
                        placeholder="Post content (HTML supported)"
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        style={{ ...inputStyle, minHeight: '300px', resize: 'vertical', fontFamily: 'monospace', fontSize: '0.9rem' }}
                        required
                    />

                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-noble-ivory)', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={formData.isPublished}
                            onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                            style={{ accentColor: 'var(--color-noble-gold)' }}
                        />
                        Publish immediately
                    </label>

                    <button type="submit" disabled={saving} className="btn-noble-primary" style={{ width: '100%', justifyContent: 'center' }}>
                        {saving ? 'Saving...' : 'Create Post'}
                    </button>
                </form>
            </div>
        </div>
    );
}
