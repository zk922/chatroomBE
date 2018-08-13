import * as Router from 'koa-router';
import login from "./middlewares/login"
import register from "./middlewares/register";

const router = new Router();

//这里注册api路由
router
.post('/login', login)               //登录
.post('/register', register);        //注册




export let routes = router.routes();
export default routes;