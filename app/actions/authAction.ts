"use server"

import { signIn, signOut } from "@/auth"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import { z } from "zod"

const prisma = new PrismaClient()

const SignUpSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

export async function signUp(formData: z.infer<typeof SignUpSchema>) {
    const validatedFields = SignUpSchema.safeParse(formData)

    if (!validatedFields.success) {
        return { error: "Invalid fields" }
    }

    const { firstName, lastName, email, password } = validatedFields.data

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return { error: "Email already in use" }
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await prisma.user.create({
            data: {
                name: `${firstName} ${lastName}`,
                email,
                hashedPassword,
            },
        })

        return { success: "Account created!" }
    } catch (error) {
        console.error("SignUp error:", error)
        return { error: "Something went wrong" }
    }
}



export const loginWithCredentials = async (formData: FormData) => {
    try {
        const email = formData.get("email");
        const password = formData.get("password");

        if (!email || !password) {
            return {
                status: false,
                error: true,
                message: "Email and password are required"
            };
        }

        await signIn("credentials", { email, password, redirect: false });
        return { status: true, error: false };
    } catch (error: any) {
        console.error("Login error:", error);

        // Handle specific authentication errors
        if (error.message?.includes("CredentialsSignin")) {
            return {
                status: false,
                error: true,
                message: "Invalid email or password"
            };
        }

        if (error.message?.includes("Email not verified")) {
            return {
                status: false,
                error: true,
                message: "Please verify your email before logging in"
            };
        }

        return {
            status: false,
            error: true,
            message: "Invalid email or password!"
        };
    }
};

export const logout = async () => {
    await signOut({ redirectTo: "/" });
};

