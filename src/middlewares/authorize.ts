import {checkJWT} from "../utilities/jwt";


/**
 * 认证头解析流程
 * **/
export async function authorize(ctx, next) {

  console.log('auth');
  let token = ctx.request.get('authorize');

  let result = await checkJWT(token);
  console.log('认证', result);

  //1.检查是否有头部
  if(result.result === 1 || result.result === 2 || result.result === 3 || result.result === 5){
    ctx.status = 401;
    ctx.body = result;
    return;
  }
  else if(result.result === 4){
    ctx.status = 500;
    ctx.body = result;
    return;
  }

  //通过验证
  return await next();
}
export default authorize;


