import * as Koa from "koa";
import * as mount from "koa-mount";
import * as http from "http";
import * as io from 'socket.io';
import * as bodyparser from "koa-bodyparser";

import api from "./api/api";
import addIoMiddleware from "./io/io"
import statics from "./statics/statics";
import {serverConfig} from "./config";

async function serverStart() {
  const app = new Koa();
  /**
   * 一个为静态资源服务，一个为api服务
   * 静态资源仅包含前端资源，使用ng打包，发布在statics/www/目录下
   * api中包含api路由，包含所有类型增改删查的接口
   * */
  app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
  }));
  app.use(mount('/', statics));
  app.use(mount('/api', api));


  /**
   * 在服务器添加socket.io 支持
   * 只有在聊天室或者私聊时候才需要创建io链接
   * **/
  const server = http.createServer(app.callback());
  const publicChat = io(server,{
    path: '/chat/public'
  });

  const groupChat = io(server,{
    path: '/chat/group'
  });

  const privateChat = io(server,{
    path: '/chat/private'
  });

  const friendsChat = io(server,{
    path: '/chat/friends'
  });

  /**
   * 添加io中间件
   * **/




  /**
   * 启动服务器
   * **/
  server.listen(serverConfig.port, () => {
    console.log('service is running at port ' + serverConfig.port);
  });
}
export default serverStart;