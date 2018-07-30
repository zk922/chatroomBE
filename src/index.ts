import * as Koa from "koa";
import * as Router from "koa-router";
import {setAccessControl} from "./middlewares/setHeaders";
import rootFn from "./routes/rootFn"

const app = new Koa();
const router = new Router();

//设置跨域
app.use(setAccessControl);

//跟目录请求方法
router.get('/', rootFn);







app.use(router.routes());
app.listen(8888, function () {
  console.log('server started')
});