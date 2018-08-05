import {Server} from "http";
import * as io from "socket.io";
import {Namespace, ServerOptions, Socket} from "socket.io";
import {Server as IoServer} from "socket.io";

export class ChatServer {

  private server: IoServer;
  private nsp: Namespace;
  private config: ServerOptions = {
    path: '/chat'
  };





  constructor(server: Server){
    this.server = io(server, this.config);
    this.nsp = this.server.of('/');
    this.onInit();
  }

  private onInit(){
    this.nsp.on('connection', socket => {
      console.log(`client ${socket.id} connected`);
      this.initSocket(socket);    //根据socket及socket中所携带的信息，初始化用户
    });
  }

  private initSocket(socket: Socket){
    /**
     * 初始化用户过程：
     * 根据socket中携带的jwt token，去获取用户信息，然后创建用户
     *     1.1 无token，创建匿名用户，分配到public room
     *     1.2 有token，去验证，验证失败，创建匿名用户，分配到public room
     *     1.3 验证成功，拉取信息，拉取失败，给提示，创建匿名用户，分配到public room
     *     1.4 拉取成功，根据所属群组，分配到所属rooms
     * **/




  }



  private createUser(socket: Socket){

  };


  static createServer(server: Server){
    return new ChatServer(server);
  }
}

export default ChatServer;