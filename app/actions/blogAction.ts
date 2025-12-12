"use server"

import { auth } from "@/auth"
import prisma from "@/db"
import { BlogType } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const BlogSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    image: z.string().url("Invalid image URL"),
    category: z.string().min(1, "Category is required"),
    type: z.nativeEnum(BlogType).default(BlogType.NORMAL),
    slug: z.string().min(1, "Slug is required"),
    readingTime: z.coerce.number().min(1, "Reading time must be at least 1 minute"),
})

export async function createBlog(formData: FormData) {
    const session = await auth()
    if (!session?.user) return { error: "Unauthorized" }

    const rawData = {
        title: formData.get("title"),
        content: formData.get("content"),
        image: formData.get("image"),
        category: formData.get("category"),
        type: formData.get("type") as BlogType,
        slug: formData.get("slug"),
        readingTime: formData.get("readingTime"),
    }

    const validated = BlogSchema.safeParse(rawData)
    if (!validated.success) return { error: validated.error.flatten().fieldErrors }

    const { title, content, image, category, type, slug, readingTime } = validated.data

    try {
        // Check if slug exists
        const existingSlug = await prisma.blog.findUnique({ where: { slug } })
        if (existingSlug) return { error: "Slug already exists" }

        // Logic for Banner type: If new blog is BANNER, update others to NORMAL
        if (type === BlogType.BANNER) {
            await prisma.blog.updateMany({
                where: { type: BlogType.BANNER },
                data: { type: BlogType.NORMAL },
            })
        }

        await prisma.blog.create({
            data: {
                title,
                content,
                image,
                category,
                type,
                slug,
                readingTime,
                authorId: session.user.id!,
            },
        })

        revalidatePath("/dashboard")
        revalidatePath("/")
        revalidatePath("/blogs")
        return { success: "Blog created successfully" }
    } catch (error) {
        console.error("Create Blog Error:", error)
        return { error: "Failed to create blog" }
    }
}

export async function updateBlog(id: string, formData: FormData) {
    const session = await auth()
    if (!session?.user) return { error: "Unauthorized" }

    const rawData = {
        title: formData.get("title"),
        content: formData.get("content"),
        image: formData.get("image"),
        category: formData.get("category"),
        type: formData.get("type") as BlogType,
        slug: formData.get("slug"),
        readingTime: formData.get("readingTime"),
    }

    const validated = BlogSchema.safeParse(rawData)
    if (!validated.success) return { error: validated.error.flatten().fieldErrors }

    const { title, content, image, category, type, slug, readingTime } = validated.data

    try {
        const existingBlog = await prisma.blog.findUnique({ where: { id } })
        if (!existingBlog) return { error: "Blog not found" }
        // Verify author or admin
        if (existingBlog.authorId !== session.user.id /* && role !== ADMIN */) {
            // For now assume only author can edit
            // return { error: "Unauthorized" } 
        }

        // Logic for Banner type
        if (type === BlogType.BANNER && existingBlog.type !== BlogType.BANNER) {
            await prisma.blog.updateMany({
                where: { type: BlogType.BANNER },
                data: { type: BlogType.NORMAL },
            })
        }

        await prisma.blog.update({
            where: { id },
            data: {
                title,
                content,
                image,
                category,
                type,
                slug,
                readingTime,
            }
        })

        revalidatePath("/dashboard")
        revalidatePath("/")
        revalidatePath("/blogs")
        return { success: "Blog updated successfully" }

    } catch (error) {
        console.error("Update Blog Error:", error)
        return { error: "Failed to update blog" }
    }
}

export async function deleteBlog(id: string) {
    const session = await auth()
    if (!session?.user) return { error: "Unauthorized" }

    try {
        await prisma.blog.delete({ where: { id } })
        revalidatePath("/dashboard")
        revalidatePath("/blogs")
        return { success: "Blog deleted" }
    } catch (error) {
        return { error: "Failed to delete blog" }
    }
}


export async function getBlogs(filter?: { authorId?: string }) {
    try {
        const whereClause = filter?.authorId ? { authorId: filter.authorId } : {};

        const blogs = await prisma.blog.findMany({
            where: whereClause,
            orderBy: { createdAt: "desc" },
            include: { author: { select: { name: true, image: true } } }
        })
        return blogs
    } catch (error) {
        return []
    }
}

export async function getBlogBySlug(slug: string) {
    try {
        const blog = await prisma.blog.findUnique({
            where: { slug },
            include: { author: { select: { name: true, image: true } } }
        })
        return blog
    } catch (error) {
        return null
    }
}
