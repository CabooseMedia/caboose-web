import { io } from 'socket.io-client';

export const socket = io("https://powerpoint.meaweso.me", {
    autoConnect: false
});