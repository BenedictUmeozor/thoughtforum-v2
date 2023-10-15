import { createContext, ReactNode } from "react";
import io, { Socket } from "socket.io-client";

const socket: Socket = io(import.meta.env.VITE_SOCKET_URL as string);

export const SocketContext = createContext<Socket | null>(null);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider = ({
  children,
}: SocketProviderProps): JSX.Element => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
