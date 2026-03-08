import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } });
        return NextResponse.json(posts);
    } catch {
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const post = await prisma.post.create({
            data: {
                title: data.title,
                slug: data.slug,
                content: data.content,
                excerpt: data.excerpt || null,
                coverImage: data.coverImage || null,
                category: data.category || 'Market Insight',
                isPublished: data.isPublished || false,
            }
        });
        return NextResponse.json(post, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Failed to create post' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const data = await request.json();
        const post = await prisma.post.update({
            where: { id: data.id },
            data: {
                title: data.title,
                slug: data.slug,
                content: data.content,
                excerpt: data.excerpt,
                coverImage: data.coverImage,
                category: data.category,
                isPublished: data.isPublished,
            }
        });
        return NextResponse.json(post);
    } catch {
        return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { id } = await request.json();
        await prisma.post.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
    }
}
