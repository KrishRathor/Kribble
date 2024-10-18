import { Server } from "socket.io";

export class SocketService {
  private _io: Server;

  constructor() {
    this._io = new Server({
      cors: {
        allowedHeaders: ['*'],
        origin: '*'
      }
    })
  }

  get io() {
    return this._io;
  }

  public initListeners() {
    const io = this.io;

    console.log(`Initialized Socket Listeners`);

    io.on('connect', (socket) => {
      const token = socket.handshake.query.userToken;
      console.log(`New Socket Connected with socket id ${socket.id} and token ${token}`);

      socket.on('join:room', ({ username, roomId }) => {
        console.log(username, roomId);
        socket.join(roomId);
      })

      socket.on('message:general', ({ username, message, roomId }) => {
        console.log(username, message, roomId);
        io.emit('message:general:broadcast', { username, message, roomId });
        console.log('broadcast');
      })

    })
  }

}
