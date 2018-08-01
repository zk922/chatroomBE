import * as Koa from 'koa';
import router from "./router";
import * as websockify from 'koa-websocket';



// const app = websockify(new Koa());
// app.ws.use(router);

const app = new Koa();
app.use(router);
export default app;