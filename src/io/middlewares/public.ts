import {Namespace, Packet, Server} from "socket.io";
import User from "../../models/user";

/**
 * 将公共聊天io server 转成 公共聊天实例，封装具体方法和事件
 * **/
export class PublicChat{

  private server: Server;
  private nsp: Namespace;

  constructor(server: Server){
    this.server = server;
    this.nsp = this.server.of('/public');

    this.registerOnConnect();

  }

  public userList: User[] = [];



  private registerOnConnect(){

    this.nsp.on("connection", socket => {
      console.log('public ',socket.id, socket.nsp.name, Object.keys(this.server.nsps));
      this.server.nsps['/public'].clients((a,b)=>{console.log(b);});

      socket.on('disconnect', ()=>{
        console.log('public ',socket.id, socket.nsp.name, Object.keys(this.server.nsps));
        this.server.nsps['/public'].clients((a,b)=>{console.log(b);});
      });
      socket.use((packet: Packet, next) => {
        // console.log(packet)
        this.nsp.to(socket.id).emit('message', packet)

      });
      //TODO 根据token，去读取用户信息，将socket封装成User

      //TODO 向所有用户广播，有新新用户进来
    });
  }






}

export default PublicChat;