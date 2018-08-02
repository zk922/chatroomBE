import * as Koa from "koa";
import * as mount from "koa-mount";
import statics from "./statics/statics";
import * as http from "http";
import * as io from 'socket.io';
import api from "./api/api";


function serverStart() {
  const app = new Koa();
  /**
   * 一个为静态资源服务，一个为api服务
   * 静态资源仅包含前端资源，使用ng打包，发布在statics/www/目录下
   * api中包含api路由，包含所有类型增改删查的接口
   * */
  app.use(mount('/', statics));
  app.use(mount('/api', api));
  /**
   * 在服务器添加socket.io 支持
   * 只有在聊天室或者私聊时候才需要创建io链接
   * **/
  const server = http.createServer(app.callback());
  const chat = io(server,{
    path: '/chat'
  });
  chat.on('message',(data)=>{
    console.log(data);
  });
  server.listen(8088, () => {
    console.log('service is running at port 8088');
  });
}
export default serverStart;