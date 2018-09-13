import ChatServer from "./ChatServer";
import {Packet, Socket} from "socket.io";

export namespace userInterfaces{
  export interface BaseUser {
    u_id: string;
  }

  export interface User extends BaseUser {
    u_name: string;
    groups: groupInterfaces.BaseGroup[];
    friends: friendInterfaces.Friend[];
  }

  export interface UserInGroup extends BaseUser {
    u_name: string;
    identity: 1 | 2 | 3 | 4;
  }

}

export namespace groupInterfaces {
  export interface BaseGroup {
    group_id: string;
  }

  export interface Group extends BaseGroup {
    group_name: string;
    users: userInterfaces.UserInGroup[];
  }

}

export namespace friendInterfaces {
  export interface BaseFriend {
    u_id: string;
  }
  export interface Friend extends BaseFriend{
    name: string;
    friend_ship_id: string;
  }
}


export namespace friendShipInterfaces {
  export interface BaseFriendShip {
    friend_ship_id: string;
    u_id_1: string;
    u_id_2: string;
  }

  export interface FriendShip extends BaseFriendShip{
    //TODO 好友关系相关
  }

}

export interface MessageInterface {
  source: string,       //发送消息的源头，用户id或者服务器，服务器标识为'server'
  date: number,         //消息创建日期
  room: string,          //消息归属哪个room
  id: string,           //消息id
  data: any,             //消息内容
  step: number,          //0发送中，1发送成功
  type: string           //消息类型，
}


export namespace ioServerInterfaces{
  export interface EnhancedPacket{
    io: ChatServer,
    packet: Packet,
    socket: Socket
  }

  export interface RouterPacket extends EnhancedPacket{
    path: string,
    data: any
  }

  export interface OriginalSocketMiddleware{
    (packet: Packet, next: (err?: any) => void): void
  }

  export interface EnhancedMiddleware {
    (packet: EnhancedPacket, next: (err?: any) => void): void
  }

  export interface RouterMiddleware {
    (packet: RouterPacket, next: (err?: any) => void): void
  }

}

