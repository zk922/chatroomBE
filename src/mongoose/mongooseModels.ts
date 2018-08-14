import {
  connection as db,
  model,                          //use the defaule connetion  (monggose.connection)
  Schema
} from "mongoose";
import {groupSchemas, authentication, userSchemas} from "./mongooseSchema";

/**
 * mongoose models 是用来存储和查询数据的。
 *
 * 一个monggose可以创建多条与MongoDB的链接，这个项目里面，仅使用一条链接即可。
 * **/
export const UserModel = model('User', userSchemas.User);

export const GroupModel = model('Group', groupSchemas.Group);

export const AuthModel = model('Auth', authentication);

