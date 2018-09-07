import * as Koa from "koa";
import * as mount from "koa-mount";
import * as http from "http";
import * as bodyparser from "koa-bodyparser";

import api from "./api/api";
import statics from "./statics/statics";
import logger from "./utilities/log";
import ChatServer from "./models/ChatServer";

async function serverStart(serverConfig, logConfig) {
  const app = new Koa();

  /**
   * 添加日志
   * **/
  app.use(logger(logConfig));

  // /**
  //  * 设置通用cookie
  //  * **/
  // app.use(async function (ctx, next) {
  //   ctx.cookies.set('pwdSalt', await createSalt())
  // });

  /**
   * 添加bodyparser
   * 不然的话，需要去原生node的request流对象上去处理数据
   * **/
  app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
  }));


  /**
   * 一个为静态资源服务，一个为api服务
   * 静态资源仅包含前端资源，使用ng打包，发布在statics/www/目录下
   * api中包含api路由，包含所有类型增改删查的接口
   * */
  app.use(mount('/', statics));
  app.use(mount('/api', api));


  /**
   * 在服务器添加socket.io 支持
   * 创建聊天服务
   * **/
  const server = http.createServer(app.callback());

  const chatServer = ChatServer.createServer(server);


  /**
   * 启动服务器
   * **/
  server.listen(serverConfig.port, () => {
    console.log('service is running at port ' + serverConfig.port);
  });
}
export default serverStart;