'use client'

import { SessionProvider } from 'next-auth/react';
import { NextUIProvider } from '@nextui-org/react'
import { SocketProvider } from '@components/socket';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider basePath='/auth'>
            <NextUIProvider>
                <SocketProvider>
                    {children}
                </SocketProvider>
            </NextUIProvider>
        </SessionProvider>
    )
}