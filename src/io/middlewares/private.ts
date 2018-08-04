import {Server} from "socket.io";

export class PrivateChat{
  private server: Server;

  constructor(server: Server){
    this.server = server;
    this.registerOnConnect()
  }

  private registerOnConnect(){

    this.server.of('/private').on("connection", socket => {
      console.log('private ',socket.id, socket.nsp.name, Object.keys(this.server.nsps))

      //TODO 根据token，去读取用户信息，将socket封装成User

      //TODO 向所有用户广播，有新新用户进来
    });
  }

}

export default PrivateChat;