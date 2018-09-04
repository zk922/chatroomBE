import {MessageInterface} from "./interfaces";


export class Message implements MessageInterface{
  public source: string;       //发送消息的源头，用户id或者服务器，服务器标识为空
  public date: number;       //消息创建日期
  public room: string;         //消息归属哪个room
  public id: string;          //消息id
  public data: any;             //消息内容
  public step: number;         //0发送中，1发送成功
  public type: string;

  constructor(message: MessageInterface){
    this.source = message.source;
    this.date = message.date;
    this.room = message.room;
    this.id = message.id;
    this.data = message.data;
    this.step = message.step;
    this.type = message.type;
  }
}