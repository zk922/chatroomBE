import {Server} from "http";
import * as io from "socket.io";
import {Namespace, Packet, ServerOptions, Socket} from "socket.io";
import {Server as IoServer} from "socket.io";
import User from "./User";
import {checkJWT, compareJWT, getPayload} from "../utilities/jwt";
import {UserModel} from "../mongoose/mongooseModels";
import {Document} from "mongoose";
import {Message} from "./Message";

export class ChatServer {

  private server: IoServer;
  private nsp: Namespace;
  private config: ServerOptions = {
    path: '/chat'
  };

  public usersList: Map<Socket, User> = new Map();

  constructor(server: Server){
    this.server = io(server, this.config);
    this.nsp = this.server.of('/');
    this.onInit();
  }

  static createServer(server: Server){
    return new ChatServer(server);
  }

  private onInit(){
    this.nsp.on('connection', socket => {
      console.log(`client ${socket.id} connected`);
      this.initSocket(socket);    //根据socket及socket中所携带的信息，初始化用户
    });
  }

  private async initSocket(socket: Socket){
    /**
     * 初始化用户过程：
     * 根据socket中携带的jwt token，去获取用户信息，然后创建用户
     *     1.1 无token，创建匿名用户，分配到public room
     *     1.2 有token，去验证，验证失败，创建匿名用户，分配到public room
     *     1.3 验证成功，拉取信息，拉取失败，给提示，创建匿名用户，分配到public room
     *     1.4 拉取成功，根据所属群组，分配到所属rooms
     * **/

    let token = socket.handshake.query.authorize;

    let authResult = await checkJWT(token);

    if(authResult.result !== 0){
      this.usersList.set(socket, User.createAnonymousUser());
    }
    this.usersList.set(socket, new User(authResult.userInfo));
    //添加socket事件监听
    socket.use(this.packetMiddleware.bind(this));
    //1.分配到public chat
    this.toPublic(socket);
    //TODO 分配好友和群组
  }

  private toPublic(socket: Socket){
    socket.join('public');
  }




  public packetMiddleware(packet: Packet, next){
    /**
     * 接收发送消息的格式
     * **/
    let data = new Message(packet[1]);
    //TODO 保存历史记录的话，这里开始需要保存
    console.log(packet);
    data.step = 1;
    this.nsp.to(packet[0]).emit(packet[0], data);
  }


}

export default ChatServer;