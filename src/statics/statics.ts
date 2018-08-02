import * as Koa from "koa";
import * as server from "koa-static";


const app = new Koa();

app.use(server(__dirname + '/www',  {
  maxAge: 1000 * 60 * 60 * 24 * 7,
  gzip: true,
}));


export default app;