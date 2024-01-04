'use client'

import { SessionProvider } from 'next-auth/react';
import { NextUIProvider } from '@nextui-org/react'
import { SocketProvider } from '../lib/network';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <NextUIProvider>
                <SocketProvider>
                    {children}
                </SocketProvider>
            </NextUIProvider>
        </SessionProvider>
    )
}