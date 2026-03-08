'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (res.ok) {
                router.push('/admin/dashboard');
            } else {
                setError('Invalid credentials. Access denied.');
            }
        } catch {
            setError('Connection failed. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(180deg, var(--color-noble-black), var(--color-noble-navy))',
            padding: '2rem'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '420px',
                background: 'rgba(26, 26, 46, 0.6)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(201, 168, 76, 0.15)',
                padding: '3rem'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <h1 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.75rem',
                        color: 'var(--color-noble-gold)',
                        marginBottom: '0.5rem'
                    }}>
                        Noble Rock CMS
                    </h1>
                    <p style={{ color: 'var(--color-noble-slate)', fontSize: '0.9rem' }}>
                        Administrative Access Required
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '1rem',
                            background: 'rgba(10, 10, 10, 0.5)',
                            border: '1px solid rgba(201, 168, 76, 0.15)',
                            color: 'var(--color-noble-ivory)',
                            fontFamily: 'var(--font-body)',
                            fontSize: '1rem',
                            outline: 'none',
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '1rem',
                            background: 'rgba(10, 10, 10, 0.5)',
                            border: '1px solid rgba(201, 168, 76, 0.15)',
                            color: 'var(--color-noble-ivory)',
                            fontFamily: 'var(--font-body)',
                            fontSize: '1rem',
                            outline: 'none',
                        }}
                    />

                    {error && (
                        <p style={{ color: '#E74C3C', fontSize: '0.9rem', textAlign: 'center' }}>
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-noble-primary"
                        style={{ width: '100%', justifyContent: 'center', opacity: loading ? 0.7 : 1 }}
                    >
                        {loading ? 'Authenticating...' : 'Access Dashboard'}
                    </button>
                </form>
            </div>
        </div>
    );
}
