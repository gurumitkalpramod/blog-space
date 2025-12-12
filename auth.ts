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
    secret: "d5d4f616e1e1924a9155dd21e07add0d719db8abc9fb8eebd23530e2d628e3a2",
    trustHost: true,
    pages: {
        signIn: "/signin",
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
