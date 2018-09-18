import * as Koa from "koa";
import * as mount from "koa-mount";
import * as http from "http";
import * as bodyparser from "koa-bodyparser";

import statics from "./statics/statics";
import logger from "./utilities/log";
import ChatServer from "./models/ChatServer";
// import router from "./api/router";

async function serverStart(serverConfig, logConfig) {
  const app = new Koa();

  /**
   * 添加http访问日志
   * **/
  app.use(logger(logConfig));

  /**
   * 添加bodyparser
   * 不然的话，需要去原生node的request流对象上去处理数据
   * **/
  app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
  }));

  /**
   * 静态资源服务
   * 静态资源仅包含前端资源，发布在statics/www/目录下
   * */
  app.use(mount('/', statics));

  /**
   * 在服务器添加socket.io 支持
   * 创建聊天服务
   * **/
  const server = http.createServer(app.callback());

  const io = ChatServer.createServer(server);

  // io.use(router.routes());

  /**
   * 启动服务器
   * **/
  server.listen(serverConfig.port, () => {
    console.log('service is running at port ' + serverConfig.port);
  });
}
export default serverStart;