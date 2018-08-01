import * as Router from "koa-router";
import chatroom from "./midwares/chatroom"

const router = new Router();


router.all('/room', chatroom);


export default router.routes();