import { Server } from "socket.io";
import { EVENTS, type IDraw, type IJoinRoom, type ISendMessage, type IUser } from "../types";

export class SocketService {
  private _io: Server;
  private users: Map<string, IUser[]>;
  private turnManager: RoomTurnManager;
  private word: string;

  constructor() {
    this._io = new Server({
      cors: {
        allowedHeaders: ['*'],
        origin: '*'
      }
    })
    this.users = new Map();
    this.turnManager = new RoomTurnManager();
    this.word = 'word';
  }

  get io() {
    return this._io;
  }

  public initListeners() {
    const io = this.io;

    console.log(`Initialized Socket Listeners`);

    io.on('connect', (socket) => {
      const token = socket.handshake.query.userToken as string;
      console.log(`New Socket Connected with socket id ${socket.id} and token ${token}`);

      socket.on(EVENTS.JOIN_ROOM, (data: IJoinRoom) => {
        socket.join(data.room);
        this.addUserToRoom(data.room, { socketId: socket.id, token: data.username });
        io.to(data.room).emit(EVENTS.SEND_PARTICIPANTS_LIST, this.getUsersInRoom(data.room));

        const roomUsers = this.getUsersInRoom(data.room);
        this.turnManager.startTurnTimer(data.room, roomUsers, io, this.word);
      })

      socket.on(EVENTS.SEND_MESSAGE, (data: ISendMessage) => {
        console.log(data, data.room);
        if (data.message === this.word) {
          io.to(data.room).emit(EVENTS.SEND_MESSAGE_RESPONSE, {...data, correct: true});
        } else {
          io.to(data.room).emit(EVENTS.SEND_MESSAGE_RESPONSE, {...data, correct: false});
        }
      })

      socket.on(EVENTS.SEND_DRAWING, (data: IDraw) => {
        console.log(data);
        io.to(data.room).emit(EVENTS.SEND_DRAWING_RESPONSE, data);
      })

      socket.on('disconnect', () => {
        this.removeUser(socket.id);
      });

    })
  }

  private addUserToRoom(room: string, user: IUser) {
    if (!this.users.has(room)) {
      this.users.set(room, []);
    }
    const roomUsers = this.users.get(room)!;
    roomUsers.push(user);
    console.log(`Added user ${user.token} to room ${room}.`);
  }

  private removeUser(socketId: string) {
    for (const [room, users] of this.users.entries()) {
      const updatedUsers = users.filter(user => user.socketId !== socketId);
      if (updatedUsers.length === 0) {
        this.users.delete(room); // Remove room if no users are left
        this.turnManager.stopTurnTimer(room);
      } else {
        this.users.set(room, updatedUsers); // Update the room's user list
      }
      console.log(`Removed user with socket id ${socketId} from room ${room}.`);

      // Emit updated user list for the room
      this.io.to(room).emit(EVENTS.SEND_PARTICIPANTS_LIST, this.getUsersInRoom(room));

      this.turnManager.emitCurrentTurn(room, updatedUsers, this.io, this.word);
    }
  }

  private getUsersInRoom(room: string): IUser[] {
    return this.users.get(room) || [];
  }

}

class RoomTurnManager {
  private roomTurnTimers: Map<string, { currentTurnIndex: number; turnTimer: NodeJS.Timeout }>;

  constructor() {
    this.roomTurnTimers = new Map();
  }

  startTurnTimer(room: string, users: IUser[], io: Server, word: string) {
    if (this.roomTurnTimers.has(room)) return; // Timer is already running

    const turnTimer = setInterval(() => {
      this.advanceTurn(room, users, io, word);
    }, 10000); // 30 seconds interval

    this.roomTurnTimers.set(room, {
      currentTurnIndex: 0, // Starting with the first user
      turnTimer
    });

    this.emitCurrentTurn(room, users, io, word); // Emit the initial turn
  }

  stopTurnTimer(room: string) {
    const timerData = this.roomTurnTimers.get(room);
    if (timerData) {
      clearInterval(timerData.turnTimer);
      this.roomTurnTimers.delete(room);
    }
  }

  advanceTurn(room: string, users: IUser[], io: Server, word: string) {
    const timerData = this.roomTurnTimers.get(room);
    if (!timerData || users.length === 0) return;

    // Advance the turn index
    timerData.currentTurnIndex = (timerData.currentTurnIndex + 1) % users.length;

    // Emit the new current turn
    this.emitCurrentTurn(room, users, io, word);
  }

  emitCurrentTurn(room: string, users: IUser[], io: Server, word: string) {
    const timerData = this.roomTurnTimers.get(room);
    if (!timerData || users.length === 0) return;

    const currentPlayer = users[timerData.currentTurnIndex];
    io.to(room).emit(EVENTS.SEND_CURRENT_PLAYER, {currentPlayer, word});
    console.log(`It's ${currentPlayer.token}'s turn in room ${room}`);
  }

  getCurrentTurnIndex(room: string): number {
    const timerData = this.roomTurnTimers.get(room);
    return timerData ? timerData.currentTurnIndex : -1;
  }

}