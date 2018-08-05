import * as Router from 'koa-router';
import login from "./middlewares/login"

const router = new Router();

//这里注册api路由
router.post('/login', login);


export let routes = router.routes()


export default routes;