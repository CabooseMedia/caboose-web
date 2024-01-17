import { getServerSession, type NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";
import { randomUUID } from "crypto";
import { cookies } from 'next/headers';
import Credentials from "next-auth/providers/credentials";
import Discord from "next-auth/providers/discord"
import Google from "next-auth/providers/google"
import { encode } from "next-auth/jwt";

export const auth: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    pages: {
        signIn: "/signin",
        signOut: "/signout",
        error: "/signin",
        verifyRequest: "/request",
        newUser: "/welcome",
    },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                code: { label: "Code", type: "text" },
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const code = credentials?.code;
                const email = credentials?.email;
                const password = credentials?.password;
                if (!email || !password) {
                    return null;
                }
                const existingUser = await prisma.user.findUnique({
                    where: {
                        email: email
                    },
                });
                if (!existingUser) {
                    if (!code) {
                        return null;
                    }
                    const invite = await prisma.invite.findUnique({
                        where: {
                            code: code
                        }
                    });
                    if (!invite) {
                        return null;
                    }
                    if (invite.email == null || invite.email == email) {
                        const user = await prisma.user.create({
                            data: {
                                email: email,
                                password: password
                            }
                        });
                        const account = await prisma.account.create({
                            data: {
                                userId: user.id,
                                type: "credentials",
                                provider: "credentials",
                                providerAccountId: user.id.toString(),
                            }
                        });
                        if (user && account) {
                            await prisma.invite.delete({
                                where: {
                                    code: code
                                }
                            });
                            return {
                                id: user.id,
                                name: user.name,
                                email: user.email,
                                image: user.image
                            }
                        }
                    } else {
                        return null;
                    }
                } else {
                    if (existingUser.password == password) {
                        return {
                            id: existingUser.id,
                            name: existingUser.name,
                            email: existingUser.email,
                            image: existingUser.image
                        }
                    } else {
                        return null;
                    }
                }
            }
        }),
        Discord({
            clientId: process.env.AUTH_DISCORD_CLIENT_ID!,
            clientSecret: process.env.AUTH_DISCORD_CLIENT_SECRET!,
        }),
        Google({
            clientId: process.env.AUTH_GOOGLE_CLIENT_ID!,
            clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET!,
        }),
    ],
    jwt: {
        async encode({ secret, token, maxAge }) {
            const cookie = cookies().get("next-auth.session-token")?.value;
            if (cookie) {
                cookies().delete("next-auth.session-token");
                return cookie;
            }
            return encode({ secret, token, maxAge });
        }
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            const accountExists = await prisma.account.findFirst({
                where: {
                    userId: user.id,
                    provider: account?.provider,
                }
            });
            if (accountExists == null) {
                const cookie = cookies().get("__Secure-next-auth.session-token")?.value;
                const hasCurrentSession = await prisma.session.findFirst({
                    where: {
                        sessionToken: cookie
                    }
                });
                if (hasCurrentSession) {
                    return true;
                }
                return false;
            }
            if (account?.provider == "credentials") {
                if (user) {
                    const session = await prisma.session.create({
                        data: {
                            sessionToken: randomUUID(),
                            userId: user.id,
                            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                        }
                    });
                    cookies().set("next-auth.session-token", session.sessionToken, {
                        expires: session.expires
                    });
                }
            }
            return true;
        },
        async redirect({ url, baseUrl }) {
            return url.startsWith(baseUrl) ? url : baseUrl
        },
        async session({ session, token, user }) {
            return session;
        },
        async jwt({ token, user, account, profile }) {
            return token;
        },
    }
}