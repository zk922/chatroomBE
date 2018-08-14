import {Schema} from "mongoose";


/**
 * 好友关系模型，主键为自动创建的id
 * 也就是用户和用户之间的对应模型
 * **/
export const FriendShip = new Schema({  //好友关系模型
  user1: {
    u_id: String,  //用户1的id
    note: String   //用户1在对方的备注
  },
  user2: {
    u_id: String,  //用户2的id
    note: String   //用户2在对方的备注
  }
});

/**
 * 群组关系模型，主键为自动创建的id
 * **/
export const Group = new Schema({
  name: String,   //群组名称
  users: []
});

/**
 * 用户和群组的map模型
 * **/
export const UserInGroup = new Schema({

});


export const User = new Schema({
  //认证信息相关
  name: String,  //账号
  pwd: String,   //密码
  secret: String,//token的salt

  //用户信息相关
  nickName: String,   //用户昵称
  friends: [FriendShip],        //用户朋友关系列表
  groups: [UserInGroup]          //用户群组关系列表
});