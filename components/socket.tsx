import { io, Socket } from 'socket.io-client';
import { useContext, ReactNode, createContext, useState, useEffect } from 'react';

const SocketContext = createContext({} as Socket);

let socket: Socket;

export function useSocket() {
    return {
        socket: useContext(SocketContext),
        emit: emit,
        on: on,
        connected: socket?.connected
    }
}

export function on(event: string, callback: (...args: any[]) => void): void {
    useEffect(() => {
        socket.on(event, callback);
        return () => {
            socket.off(event, callback);
        };
    }, [event, callback]);
}

export function emit(event: string, ...args: any[]): void {
    socket.emit(event, ...args);
}

export function SocketProvider({children}: {children: ReactNode}) {

    if (!socket) {
        socket = io();
    }

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}