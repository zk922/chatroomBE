import {Server} from "socket.io";

export class FriendsChat{

  private _ioServer: Server;

  constructor(server: Server){
    this._ioServer = server;
  }
}

export default FriendsChat;