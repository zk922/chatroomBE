import {Schema} from "mongoose";

export namespace userSchemas{

  export const User = new Schema({
    u_id: String,
    u_name: String,
    groups: [groupSchemas.BaseGroup],
    friends: [friendSchemas.Friend]
  });

  export const UserInGroup = new Schema({
    u_id: String,
    u_name: String,
    identity: Number
  });
}

export namespace groupSchemas {
  export const BaseGroup = new Schema({
    group_id: String,
    group_name: String
  });
  export const Group = new Schema({
    group_id: String,
    group_name: String,
    users: [userSchemas.UserInGroup]
  });
}

export namespace friendSchemas {

  export const Friend = new Schema({
    u_id: String,
    name: String,
    friend_ship_id: String
  });

}


export namespace friendShipSchemas {
  export const FriendShip = new Schema({
    u_id_1: String,
    u_id_2: String
  });
}


export const authentication = new Schema({
  name: String,
  pwd: String,
  u_id: String,
  secretKey: String
});