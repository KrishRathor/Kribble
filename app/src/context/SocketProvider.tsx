import React, { useCallback, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { EVENTS, IDraw, IJoinRoom, IMessage, ISendMessage, ITurn, IUser } from "./types";

interface ISocketProvider {
  children?: React.ReactNode;
}

interface ISocketContext {
  joinRoom: (data: IJoinRoom) => void;
  sendMessage: (data: ISendMessage) => void;
  sendDrawing: (data: IDraw) => void;
  message: IMessage[];
  drawing: any;
  users: IUser[];
  currentPlayer: string;
  currentWord: string
}

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) throw new Error(`state is undefined`);
  return state;
};

export const SocketProvider: React.FC<ISocketProvider> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [drawing, setDrawing] = useState<any>();
  const [currentPlayer, setCurrentPlayer] = useState<string>('');
  const [currentWord, setCurrentWord] = useState<string>('');

  const joinRoom: ISocketContext["joinRoom"] = useCallback(
    (data: IJoinRoom) => {
      console.log("sending room join signal", data);
      socket?.emit(EVENTS.JOIN_ROOM, data);
    },
    [socket],
  );

  const sendMessage: ISocketContext["sendMessage"] = useCallback(
    (data: IJoinRoom) => {
      console.log("sending message", data);
      socket?.emit(EVENTS.SEND_MESSAGE, data);
    },
    [socket],
  );

  const sendDrawing: ISocketContext["sendDrawing"] = useCallback((data: IDraw) => {
    socket?.emit(EVENTS.SEND_DRAWING, data);
  }, [socket])

  const onMessageReply = useCallback((data: ISendMessage) => {
    console.log("recieved message", data);
    setMessages((prev) => [
      ...prev,
      { username: data.username, msg: data.message, correct: data.correct  },
    ]);
  }, []);

  const onDrawingReply = useCallback((data: IDraw) => {
    console.log('received draw');
    setDrawing(data.draw);
  }, [])

  const onParticipantsList = useCallback((data: IUser[]) => {
    console.log(data);
    setUsers(data);
  }, [])

  const onCurrentPlayerTurn = useCallback((data: ITurn) => {
    console.log('turn', data);
    setCurrentPlayer(data.currentPlayer.token);
    setCurrentWord(data.word);
  }, [])

  useEffect(() => {
    const _socket = io(`http://localhost:8000`, {
      query: {
        userToken: localStorage.getItem("username"),
      },
    });

    _socket.on(EVENTS.SEND_MESSAGE_RESPONSE, onMessageReply);
    _socket.on(EVENTS.SEND_DRAWING_RESPONSE, onDrawingReply);
    _socket.on(EVENTS.SEND_PARTICIPANTS_LIST, onParticipantsList);
    _socket.on(EVENTS.SEND_CURRENT_PLAYER, onCurrentPlayerTurn);

    setSocket(_socket);

    return () => {
      _socket.off(EVENTS.SEND_MESSAGE_RESPONSE, onMessageReply);
      _socket.off(EVENTS.SEND_DRAWING_RESPONSE, onDrawingReply);
      _socket.off(EVENTS.SEND_PARTICIPANTS_LIST, onParticipantsList);
      _socket.off(EVENTS.SEND_CURRENT_PLAYER, onCurrentPlayerTurn);

      _socket.disconnect();
      setSocket(undefined);
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        joinRoom,
        sendMessage,
        sendDrawing,
        message: messages,
        drawing: drawing,
        users,
        currentPlayer,
        currentWord
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
