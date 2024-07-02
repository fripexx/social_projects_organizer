import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { Socket } from 'socket.io-client';
import ioServer from "../api/ioServer";

const SocketContext = createContext<Socket | undefined>(undefined);

interface SocketProviderProps {
    children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const socket: Socket = ioServer();

    useEffect(() => {
        socket.on('connect', () => console.log('connect'));
        socket.on('disconnect', () => console.log('disconnect'));

        return () => {
            socket.disconnect();
        }
    }, [])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = (): Socket => {
    const context = useContext(SocketContext);

    if (!context) throw new Error('useSocket must be used within a SocketProvider');

    return context;
};