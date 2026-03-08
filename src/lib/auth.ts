import { cookies } from 'next/headers';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'noblerock2024';
const AUTH_COOKIE = 'noble_admin_auth';

export async function verifyAdmin(): Promise<boolean> {
    try {
        const cookieStore = await cookies();
        const authCookie = cookieStore.get(AUTH_COOKIE);
        return authCookie?.value === 'authenticated';
    } catch {
        return false;
    }
}

export async function loginAdmin(username: string, password: string): Promise<boolean> {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        const cookieStore = await cookies();
        cookieStore.set(AUTH_COOKIE, 'authenticated', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/'
        });
        return true;
    }
    return false;
}

export async function logoutAdmin() {
    const cookieStore = await cookies();
    cookieStore.delete(AUTH_COOKIE);
}
