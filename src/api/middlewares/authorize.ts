import {UserModel} from "../../mongoose/mongooseModels";
import {compareJWT, getPayload} from "../../utilities/jwt";


/**
 * 认证头解析流程
 * **/
export async function authorize(ctx, next) {

  console.log('auth');
  let auth = ctx.request.get('authorize');
  console.log('认证头',auth);
  //1.检查是否有头部
  if(!auth){
    ctx.status = 401;
    ctx.body = {result: 1, msg: '无认证头'};
    return;
  }
  //2.解析payload
  let id: string;
  let exp: number;
  try{
    let payload = await getPayload(auth);
    id = payload.u_id;
    exp = payload.exp;
  }
  catch (e) {
    console.log('认证头解析失败', e);
    ctx.status = 401;
    ctx.body = {result: 2, msg: '无效的认证头'};
    return;
  }
  //3.检查是否过期
  if(new Date().getTime() >= exp){
    console.log('token过期');
    ctx.status = 401;
    ctx.body = {result: 3, msg: 'token已经过期'};
    return;
  }

  //4.获取secret
  let query = UserModel.findById(id);
  let secret;
  try{
    secret = (await query.exec()).get('secret');
  }
  catch (e) {
    ctx.status = 500;
    ctx.body = {result: 4, msg: '服务器错误，认证失败'};
    return;
  }
  //5.比对secret
  try{
    let result = await compareJWT(auth, secret);
    if(!result){
      ctx.status = 401;
      ctx.body = {result: 5, msg: '认证未通过'};
      return;
    }
  }
  catch (e) {
    ctx.status = 401;
    ctx.body = {result: 6, msg: '认证未通过'};
    return;
  }

  //6.通过验证
  return await next();
}
export default authorize;


