import {Schema} from "mongoose";

export namespace userSchemas{
  export const BaseUser = new Schema({
    u_id: String
  });

  export const User = new Schema(BaseUser).add({
    u_name: String,
    groups: [groupSchemas.BaseGroup],
    friends: [friendSchemas.Friend],
  });

  export const UserInGroup = new Schema(BaseUser).add({
    u_name: String,
    identity: Number
  });

}

export namespace groupSchemas {
  export const BaseGroup = new Schema({
    group_id: String
  });

  export const Group = new Schema(BaseGroup).add({
    group_name: String,
    users: [userSchemas.UserInGroup]
  });

}

export namespace friendSchemas {
  export const BaseFriend = new Schema({
    u_id: String
  });
  export const Friend = new Schema(BaseFriend).add({
    name: String,
    friend_ship_id: String
  });
}


export namespace friendShipSchemas {
  export const BaseFriendShip = new Schema({
    friend_ship_id: String,
    u_id_1: String,
    u_id_2: String
  });

  export const FriendShip = new Schema(BaseFriendShip).add({
    //TODO 好友关系相关
  });

}