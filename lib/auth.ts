import type { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";
import Discord from "next-auth/providers/discord"

export const auth: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    // pages: {
    //     signIn: "/auth/signin",
    //     // signOut: "/auth/signout",
    //     // error: "/auth/error",
    //     // verifyRequest: "/auth/verify-request",
    //     // newUser: "/auth/new-user",
    // },
    providers: [
        Discord({
            clientId: process.env.DISCORD_CLIENT_ID!,
            clientSecret: process.env.DISCORD_CLIENT_SECRET!,
        }),
    ],
}