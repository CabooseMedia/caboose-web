import type { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";
import Discord from "next-auth/providers/discord"

export const auth: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        Discord({
            clientId: process.env.AUTH_DISCORD_CLIENT_ID!,
            clientSecret: process.env.AUTH_DISCORD_CLIENT_SECRET!,
        }),
    ],
}