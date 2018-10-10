import * as Koa from "koa";
import * as http from "http";
import * as bodyparser from "koa-bodyparser";
import * as kosStatic from "koa-static";
import * as socketIO from "socket.io";

import logger from "./middlewares/log";
import {serverConfig, logConfig} from "./config";



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
app.use(kosStatic(__dirname + '/../www',  {
  maxAge: 1000 * 60 * 60 * 24 * 7,
  gzip: true,
}));


/**
 * 在服务器添加socket.io 支持
 * 创建聊天服务
 * **/
export const server = http.createServer(app.callback());

export const io = socketIO(server, {
  path: '/chat'
});


server.listen(serverConfig.port, () => {
  console.log('service is running at port ' + serverConfig.port);
});

/***********************************
 * 上面是启动了service与socket.io服务
 *
 * 下面用来处理每条socket链接
 * *********************************/

io.on('connection', (socket)=>{
  console.log(socket.id, 'connected');
  console.log(socket.handshake);
  // socket.use()
});