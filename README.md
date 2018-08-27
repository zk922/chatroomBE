# chatroomBE（还在开发中，下面结构会改变）

目前注册登录认证模块的问题：

1. 没有防止刷接口
2. 没有防止重放
3. token的secert存储应该改成短期存储，不应该仅存在数据库

## 聊天室结构划分

聊天室的层级划分，目前应用最高层级就是public聊天室

#### public聊天室:

最初入口聊天室，所有人都在里面。

path:'/chat'

namespace:'/public'

身份：'admin','normal','tourist'

#### 自定义群组:

用户自己组建的群组，创建者是admin，其他用户是normal

path:'/chat'

namespace: `/group`

room：'${groupId}'  groupId为群组的唯一标识

身份：'admin','normal'

#### 好友:

path:'/chat'

namesapce: `/friends`   好友关系的唯一标识

room：'${friendId}'

好友无用户身份区分

#### 私聊:

私聊是临时会话，不进行信息保存。

path:'/chat'

namesapce: `/private/`

room：'${privateId}' privateId为私聊唯一标识

私聊无用户身份区分，均为normal

## 用户信息结构

用户身份认证使用jwt认证。

使用token拉取的用户信息基本结构包括：

* u_id: 用户的唯一标识
* u_name: 昵称
* groups: 所属群组
``` javascript
groups: {
  groupId: string,  //群组id，群组的唯一标识
  groupName: string,//群组名称
  identity: string, //用户群组中身份
  u_name: string    //用户群组中的昵称
}[]
```

* friends:
``` javascript
friends: {
  friendsId: string,  //朋友关系id，唯一标识
  peers:{             //朋友关系双方信息，自己的u_id和朋友的u_id，以及自己在对方的备注
    u_id: string,
    u_name: string
  }[]
}[]
```
