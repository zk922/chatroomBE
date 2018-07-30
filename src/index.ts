import * as Koa from "koa";
import * as Router from "koa-router";

const app = new Koa();
const router = new Router();

router.get('/', async (ctx, next)=>{
  ctx.body = ctrl.toString();
});

let ctrl = router.routes();
app.use(ctrl);

app.listen(8888);