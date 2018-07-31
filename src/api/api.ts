import * as Koa from "koa";
import routes from "./router";

const app = new Koa();


export default app.use(routes);