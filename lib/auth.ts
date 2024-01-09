import type { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";
import Discord from "next-auth/providers/discord"
import Google from "next-auth/providers/google"

export const auth: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        Discord({
            clientId: process.env.AUTH_DISCORD_CLIENT_ID!,
            clientSecret: process.env.AUTH_DISCORD_CLIENT_SECRET!,
        }),
        Google({
            clientId: process.env.AUTH_GOOGLE_CLIENT_ID!,
            clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            // let exists = await prisma.user.findUnique({
            //     where: {
            //         id: user.id
            //     },
            // });
            // if (!exists) {
            //     return false;
            // }
            console.log(profile);
            return true;
        },
        async redirect({ url, baseUrl }) {
            return url.startsWith(baseUrl) ? url : baseUrl
        },
        async session({ session, token, user }) {
            console.log(session);
            return session;
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            return token;
        },
    }
}