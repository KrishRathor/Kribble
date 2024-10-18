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

    })
  }

}
