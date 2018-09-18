import {IoRouter} from "../models/IoRouter";



/**
 * /api/login            账号密码登录
 * /api/loginByToken     通过token登录
 * /api/logOff           注销
 * 该三个api不需要验证token，放在token验证中间件之前
 * **/
export const loginRouter = new IoRouter();




/**
 * 管理相关api，需要使用token验证，放在验证中间件之后
 * **/
export const apiRouter = new IoRouter();




export const messageRouter = new IoRouter();
messageRouter.use('/public/:id/:name', function (packet, next) {
  console.log(packet.data);
  console.log(packet.path);
  console.log(packet.packet[0]);
  console.log(packet.socket.handshake)
});