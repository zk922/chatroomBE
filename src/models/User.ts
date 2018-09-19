// import {Socket} from "socket.io";
import {Document} from "mongoose";

export class User {

  public u_id: string;

  public nickName: string;

  public friends: string[];

  public groups: string[];

  public createTime: string;

  public lastLoginTime: string;

  public type: 'normal' | 'anonymous' = "normal";

  constructor(document?: Document){
    this.u_id = document.id;
    this.groups = document.get('groups');
    this.nickName = document.get('nickName');
    this.friends = document.get('friends');
    this.createTime = (document.get('createTime') as Date).toLocaleString();
    this.lastLoginTime = (document.get('lastLoginTime') as Date).toLocaleString();
  }

  static createAnonymousUser(){
    let anonymousUser = new User();
    let date: string = new Date().toLocaleString();
    anonymousUser.createTime = date;
    anonymousUser.lastLoginTime = date;
    anonymousUser.type = "anonymous";
    return new User();
  }
}
export default User;