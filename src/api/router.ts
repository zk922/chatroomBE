import * as Router from 'koa-router';
import login from "./middlewares/login"


const router = new Router();

//这里注册路由

router.post('/login', login);




export default router.routes();