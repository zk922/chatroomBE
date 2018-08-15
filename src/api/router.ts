import * as Router from 'koa-router';
import login from "./middlewares/login"
import register from "./middlewares/register";
import authorize from "./middlewares/authorize";
import other from "./middlewares/other";

const router = new Router();

//这里注册api路由
router
.post('/login', login)               //登录
.post('/register', register);        //注册

//注册登陆不需要检查授权,其他路径需要检查
router.use(authorize);

router.post('/other', other);

export let routes = router.routes();
export default routes;