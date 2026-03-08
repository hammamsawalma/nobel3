import { NextRequest, NextResponse } from 'next/server';
import { loginAdmin } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json();
        const success = await loginAdmin(username, password);

        if (success) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }
    } catch {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
