import {
  connection as db,
  model,                          //use the defaule connetion  (monggose.connection)
  Schema
} from "mongoose";
import {User, UserInGroup, FriendShip, Group} from "./mongooseSchema";

/**
 * mongoose models 是用来存储和查询数据的。
 *
 * 一个monggose可以创建多条与MongoDB的链接，这个项目里面，仅使用一条链接即可。
 * **/
export const UserModel = model('User', User);

export const GroupModel = model('Group', Group);

export const FriendShipModel = model('FriendShip', FriendShip);

export const UserInGroupModel = model('UserInGroup', UserInGroup);

