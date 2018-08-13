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
const UserModel = model('User', userSchemas.User);

const GroupModel = model('Group', groupSchemas.Group);

const AuthModel = model('Auth', authentication);