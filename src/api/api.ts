import * as Koa from "koa";
import routes from "./router";
import * as bodyparser from "koa-bodyparser";
const app = new Koa();

app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}));
app.use(routes);

export default app;