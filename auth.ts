import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "./db";

async function getUser(email: string) {
    return await prisma.user.findUnique({
        where: { email },
    });
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                const parsed = z
                    .object({
                        email: z.string().email(),
                        password: z.string().min(6),
                    })
                    .safeParse(credentials);

                if (!parsed.success) {
                    console.log("❌ Invalid input");
                    return null;
                }

                const { email, password } = parsed.data;

                const user = await getUser(email);
                console.log(user);
                if (!user) {
                    console.log("❌ No user found");
                    return null;
                }

                const passwordMatch = await bcrypt.compare(
                    password,
                    user.hashedPassword || ""
                );

                if (!passwordMatch) {
                    console.log("❌ Wrong password");
                    return null;
                }
                return user;
            },
        }),
    ],
    secret: process.env.AUTH_SECRET,
    trustHost: true,
    pages: {
        signIn: "/sign-in",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return { ...token, ...user };
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = token as any; // Role is inherently in token from jwt callback
            }
            return session;
        },
    }
});
