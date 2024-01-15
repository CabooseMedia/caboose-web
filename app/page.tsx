'use client';

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@nextui-org/react";
import React from "react";

export default function RootPage() {
    const { data: session, status } = useSession();

    if (status == "loading") {
        return (
            <div className='fixed inset-0 w-full h-full'>
                <h1>
                    Loading...
                </h1>
            </div>
        )
    }

    if (session) {
        return (
            <div className='fixed inset-0 w-full h-full'>
                <Button onPress={() => signIn("discord")}>
                    Link Discord
                </Button>
                <Button onPress={() => signIn("google")}>
                    Link Google
                </Button>
                <Button onPress={() => signOut()}>
                    Sign Out
                </Button>
                <h1>
                    Hello {session.user?.name ?? session.user?.email}
                </h1>
            </div>
        )
    }

    return (
        <div className='fixed inset-0 w-full h-full'>
            <Button onPress={() => signIn()}>
                Login
            </Button>
        </div>
    )
}