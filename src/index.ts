import * as Koa from "koa";
import * as mount from "koa-mount";
import statics from "./statics/statics";
import api from "./api/api";


const app = new Koa();


//mount app
//一个为静态资源服务，一个为api服务
app.use(mount('/', statics));


app.use(mount('/api/', api));


app.listen(8088, ()=>{
  console.log('service is running at port 8088');
});