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