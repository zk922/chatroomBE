import * as Koa from "koa";
import * as mount from "koa-mount";
import * as http from "http";

import statics from "./statics/statics";
import api from "./api/api";
import websoket from "./websocket/websokect"

import * as websockify from 'koa-websocket';
const app = websockify(new Koa());


// const app = new Koa();
//mount app
//一个为静态资源服务，一个为api服务
app.use(mount('/', statics));
app.use(mount('/api', api));
app.use(mount('/chat', websoket));

app.listen(8088, ()=>{
  console.log('service is running at port 8088');
});
