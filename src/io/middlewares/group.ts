import {Server} from "socket.io";

export class GroupChat{

  private _ioServer: Server;

  constructor(server: Server){
    this._ioServer = server;
  }
}

export default GroupChat;