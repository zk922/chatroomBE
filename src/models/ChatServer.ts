import {Server} from "http";
import * as io from "socket.io";
import {Namespace, Packet, ServerOptions, Socket} from "socket.io";
import {Server as IoServer} from "socket.io";
import User from "./User";
import {ioServerInterfaces} from "./interfaces";


export class ChatServer {

  private server: IoServer;
  private nsp: Namespace;
  private config: ServerOptions = {
    path: '/chat'
  };

  static createServer(server: Server): ChatServer{
    return new ChatServer(server);
  }

  public userList: Map<Socket, User> = new Map();

  constructor(server: Server){
    this.server = io(server, this.config);
    this.nsp = this.server.of('/');

    this.nsp.on('connection', (socket: Socket) =>{
      this.middleWareList.forEach(v => socket.use(v(socket)));
    });
  }

  private middleWareList: ((socket: Socket) => ioServerInterfaces.OriginalSocketMiddleware)[] = [];
  //每个socket链接的中间件
  public use(fn: ioServerInterfaces.EnhancedMiddleware){
    let mw = (socket: Socket) => (packet: Packet, next) => fn({packet: packet, io: this, socket: socket}, next);
    this.middleWareList.push(mw);
  }
}

export default ChatServer;