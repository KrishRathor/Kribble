export const EVENTS = {
  JOIN_ROOM: "JOIN_ROOM",
  SEND_MESSAGE: "SEND_MESSAGE",
  SEND_MESSAGE_RESPONSE: "SEND_MESSAGE_RESPONSE",
  SEND_DRAWING: "SEND_DRAWING",
  SEND_DRAWING_RESPONSE: "SEND_DRAWING_RESPONSE",
  SEND_PARTICIPANTS_LIST: "SEND_PARTICIPANTS_LIST",
  SEND_CURRENT_PLAYER: "SEND_CURRENT_PLAYER"
};

export interface IJoinRoom {
  username: string;
  room: string;
}

export interface ISendMessage {
  username: string;
  room: string;
  message: string;
  correct: boolean
}

export interface IMessage {
  username: string;
  msg: string;
  correct: boolean;
}

export interface IDraw {
  username: string;
  room: string;
  draw: any;
}

export interface IUser {
  socketId: string;
  token: string;
}

export interface ITurn {
  currentPlayer: IUser, 
  word: string
}