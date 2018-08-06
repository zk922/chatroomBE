import {
  connection as db,
  model,                          //use the defaule connetion  (monggose.connection)
  Schema
} from "mongoose";

import {groupSchemas, userSchemas} from "./mongooseSchema";


const UserModel = model('User', userSchemas.User);

const GroupModel = model('Group', groupSchemas.Group);