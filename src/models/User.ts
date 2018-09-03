// import {Socket} from "socket.io";
import {Document} from "mongoose";

export class User {

  public u_id: string;

  public nickName: string;

  public friends: string[];

  public groups: string[];

  constructor(document: Document){
    this.u_id = document.id;
    this.groups = document.get('groups');
    this.nickName = document.get('nickName');
    this.friends = document.get('friends')
  }
}
export default User;