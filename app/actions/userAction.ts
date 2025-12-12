"use server"

import { auth } from "@/auth"
import prisma from "@/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"

// Schema for updating profile
const ProfileSchema = z.object({
    name: z.string().min(1, "Name is required"),
})

export async function getUsers() {
    const session = await auth()

    // Check if user is authenticated and is Admin
    // Note: session.user.role is typed as 'any' in auth.ts currently, ensuring it's accessible
    if (!session?.user || (session.user as any).role !== "ADMIN") {
        return { error: "Unauthorized" }
    }

    try {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                image: true,
                createdAt: true,
            }
        })
        return { success: users }
    } catch (error) {
        console.error("Get Users Error:", error)
        return { error: "Failed to fetch users" }
    }
}

export async function updateProfile(prevState: any, formData: FormData) {
    const session = await auth()
    if (!session?.user) return { error: "Unauthorized" }

    const rawData = {
        name: formData.get("name"),
    }

    const validated = ProfileSchema.safeParse(rawData)
    if (!validated.success) return { error: validated.error.flatten().fieldErrors }

    try {
        await prisma.user.update({
            where: { id: session.user.id },
            data: { name: validated.data.name },
        })

        revalidatePath("/dashboard/profile")
        revalidatePath("/") // Update navbar name
        return { success: "Profile updated successfully" }
    } catch (error) {
        console.error("Update Profile Error:", error)
        return { error: "Failed to update profile" }
    }
}
