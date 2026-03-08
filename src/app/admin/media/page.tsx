import { redirect } from 'next/navigation';
import { verifyAdmin } from '@/lib/auth';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Image as ImageIcon, Upload } from 'lucide-react';

export default async function AdminMediaPage() {
    const isAuth = await verifyAdmin();
    if (!isAuth) redirect('/admin');

    const mediaFiles = await prisma.media.findMany({
        orderBy: { uploadedAt: 'desc' }
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
                            Media Library
                        </h1>
                    </div>
                </div>

                {mediaFiles.length === 0 ? (
                    <div className="glass-card" style={{ padding: '4rem', textAlign: 'center' }}>
                        <ImageIcon size={48} style={{ color: 'var(--color-noble-gold)', marginBottom: '1.5rem', opacity: 0.5 }} />
                        <p style={{ color: 'var(--color-noble-slate)' }}>
                            No media uploaded yet. Media files will appear here when uploaded through post creation.
                        </p>
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                        gap: '1rem'
                    }}>
                        {mediaFiles.map((file) => (
                            <div key={file.id} className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
                                <div style={{
                                    width: '100%',
                                    height: '150px',
                                    background: 'rgba(10,10,10,0.5)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '0.75rem',
                                    overflow: 'hidden'
                                }}>
                                    <img src={file.url} alt={file.filename} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                                </div>
                                <p style={{ color: 'var(--color-noble-ivory)', fontSize: '0.8rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {file.filename}
                                </p>
                                <p style={{ color: 'var(--color-noble-slate)', fontSize: '0.7rem' }}>
                                    {new Date(file.uploadedAt).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
