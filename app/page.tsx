'use client';

import { signIn, useSession } from "next-auth/react";
import { Button } from "@nextui-org/react";

export default function RootPage() {
    const { data: session } = useSession();
    return (
        <div className='fixed inset-0 w-full h-full'>
            <Button onPress={() => signIn("discord")}>
                Login with Discord
            </Button>
            <h1>{session?.user?.name ?? "not logged in"}</h1>
        </div>
    )
}