'use client';

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@nextui-org/react";
import React from "react";

export default function RootPage() {
    const { data: session } = useSession();
    return (
        <div className='fixed inset-0 w-full h-full'>
            <Button onPress={() => signIn("discord")}>
                Login with Discord
            </Button>
            <Button onPress={() => signIn("google")}>
                Login with Google
            </Button>
            <Button onPress={() => signOut()}>
                Sign Out
            </Button>
            <h1>
                {session ? `Hello ${session.user?.name}` : "You are not logged in"}
            </h1>
        </div>
    )
}