import {Server} from "http";
import * as io from "socket.io";
import PublicChat from "./middlewares/public";
import PrivateChat from "./middlewares/private";
import FriendsChat from "./middlewares/friends";
import GroupChat from "./middlewares/group";
import {ServerOptions} from "socket.io";


export function createIoServers(server: Server) {

  const config: ServerOptions = {
    path: '/chat'
  };

  const ioServer = io(server, config);

  // console.log(ioServer);
  new PublicChat(ioServer);
  new PrivateChat(ioServer);
  new FriendsChat(ioServer);
  new GroupChat(ioServer);
}
export default createIoServers;