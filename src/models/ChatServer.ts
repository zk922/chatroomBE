import {Server} from "http";
import * as io from "socket.io";
import {Namespace, ServerOptions, Socket} from "socket.io";
import {Server as IoServer} from "socket.io";
import User from "./User";
import {compareJWT, getPayload} from "../utilities/jwt";
import {UserModel} from "../mongoose/mongooseModels";
import {Document} from "mongoose";

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

  private onInit(){
    this.nsp.on('connection', socket => {
      console.log(`client ${socket.id} connected`);
      this.initSocket(socket);    //根据socket及socket中所携带的信息，初始化用户
    });
  }

  //socket.io的认证，从handshake.query获取token，然后进行验证
  private async authorize(socket: Socket): Promise<{result: number, msg: string, user?: User}>{//认证用户
    console.log('auth');
    let auth = socket.handshake.query.authorize;
    console.log('认证头',auth);
    //1.检查是否有头部
    if(!auth){
      return {result: 1, msg: '无认证头，匿名'};
    }
    //2.解析payload
    let id: string;
    let exp: number;
    try{
      let payload = await getPayload(auth);
      id = payload.u_id;
      exp = payload.exp;
    }
    catch (e) {
      return {result: 2, msg: 'token解析失败，匿名'};
    }
    //3.检查是否过期
    if(new Date().getTime() >= exp){
      console.log('token过期');
      return {result: 3, msg: 'token过期，匿名'};
    }

    //4.获取secret
    let query = UserModel.findById(id);
    let queryResult: Document;
    let secret;
    try{
      queryResult = await query.exec();
      secret = queryResult.get('secret');
    }
    catch (e) {
      return {result: 4, msg: '查询数据库失败，匿名'};
    }
    //5.比对secret
    try{
      let result = await compareJWT(auth, secret);
      if(!result){
        return {result: 5, msg: '比对secret失败，匿名'};
      }
    }
    catch (e) {
      return {result: 5, msg: '比对secret失败，匿名'};
    }
    return {result: 0, msg: '比对成功', user: new User(queryResult)}
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
    let authResult = await this.authorize(socket);
    if(authResult.result !== 0){

    }

    this.usersList.set(socket, authResult.user);


  }

  private createUser(socket: Socket){

  };


  static createServer(server: Server){
    return new ChatServer(server);
  }
}

export default ChatServer;