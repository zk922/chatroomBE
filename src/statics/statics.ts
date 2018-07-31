import * as Koa from "koa";
import * as server from "koa-static";


const app = new Koa();

app.use(server(__dirname + '/www'));


export default app;