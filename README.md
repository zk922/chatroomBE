# chatroomBE（还在开发中，下面结构会改变）

目前注册登录认证模块的问题：

1. 没有防止刷接口
2. 没有防止重放
3. token的secert存储应该改成短期存储，不应该仅存在数据库

## 聊天室结构

所有聊天单元均在namespace = '/chat'下。

public，每个group，每个好友聊天，每个私聊，均是单独的room。

## 每次消息的核对

每次消息，均由指定room作为事件名，使用emit发出。

消息对象格式：

```
{
  source: string,       //发送消息的源头，用户id或者服务器，服务器标识为空
  date: number,         //消息创建日期
  room: string,          //消息归属哪个room
  id: string,           //消息id
  data: any,             //消息内容
  step: number          //0发送中，1发送成功
}
```
