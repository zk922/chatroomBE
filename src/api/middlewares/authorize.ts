import {UserModel} from "../../mongoose/mongooseModels";
import {createSha256Hmac} from "../../utilities/crypto";


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
  try{
    let payload = auth.match(/\.(\w+)\./)[1];
    id = JSON.parse(new Buffer(payload, 'base64').toString('utf8')).u_id;
  }
  catch (e) {
    console.log('认证头解析失败', e);
    ctx.status = 401;
    ctx.body = {result: 1, msg: '无效的认证头'};
    return;
  }
  //3.获取secret
  let query = UserModel.findById(id);
  let secret;
  try{
    secret = (await query.exec()).get('secret');
  }
  catch (e) {
    ctx.status = 500;
    ctx.body = {result: 2, msg: '服务器错误，认证失败'};
    return;
  }
  //4.比对secret
  try{
    let result = await compareJWT(auth, secret);
    if(!result){
      ctx.status = 401;
      ctx.body = {result: 2, msg: '认证未通过'};
      return;
    }
  }
  catch (e) {
    ctx.status = 401;
    ctx.body = {result: 2, msg: '认证未通过'};
    return;
  }

  //5.通过验证
  return await next();
}
export default authorize;


//验证token是否合法
async function compareJWT(token: string, secret: string){
  const matches = token.match(/^([^.]+)\.([^.]+)\.([^.]+)/);
  const header = matches[1];
  const payload = matches[2];
  const signature = matches[3];
  const _signature = await createSha256Hmac(`${header}.${payload}`, secret);

  // console.log('比对1', signature)
  // console.log('比对2', _signature)
  return signature === _signature;
}