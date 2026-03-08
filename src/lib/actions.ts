'use server'

import prisma from './prisma'

export async function getPublishedPosts() {
    try {
        const posts = await prisma.post.findMany({
            where: {
                isPublished: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return posts
    } catch (error) {
        console.error('Error fetching published posts:', error)
        return []
    }
}

export async function getPostBySlug(slug: string) {
    try {
        const post = await prisma.post.findUnique({
            where: {
                slug
            }
        })
        return post
    } catch (error) {
        console.error('Error fetching post by slug:', error)
        return null
    }
}
