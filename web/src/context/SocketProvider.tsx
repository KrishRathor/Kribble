"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface ISocketProvider {
  children?: React.ReactNode
}

interface ISocketContext {
  socket: Socket | null | undefined
  sendMessageGeneralRoom: (username: string, message: string, roomId: string) => void;
  joinRoom: (username: string, roomId: string) => void;
}

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) throw new Error(`state is undefined`);
  return state;
}

export const SocketProvider: React.FC<ISocketProvider> = ({ children }) => {

  const [socket, setSocket] = useState<Socket | null>();

  const joinRoom: ISocketContext["joinRoom"] = useCallback((username, roomId) => {
    console.log(roomId);
    socket?.emit('join:room', { username, roomId });
  }, [socket]);

  const sendMessageGeneralRoom: ISocketContext["sendMessageGeneralRoom"] = useCallback((username: string, message: string, roomId: string) => {
    if (!socket) return;
    socket.emit('message:general', { username, message, roomId });
  }, [socket])

  const onIncomingMessage = useCallback((data: any) => {
    console.log('here', data);
  }, []);

  useEffect(() => {

    const _socket = io(`http://localhost:8000`);

    console.log('running');

    _socket.on('message:general:broadcast', onIncomingMessage);

    setSocket((_prev) => _socket);

    return () => {

      _socket.off('message:general:broadcast', onIncomingMessage)

      _socket.disconnect();
      setSocket(undefined);
    };
  }, []);


  return (
    <SocketContext.Provider value={{
      socket,
      joinRoom,
      sendMessageGeneralRoom
    }} >
      {children}
    </SocketContext.Provider>
  )

}

