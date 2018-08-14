//授权检查
import {UserModel} from "../../mongoose/mongooseModels";

export async function authorize(ctx, next) {

  let auth = ctx.request.get('authorize');
  //1.检查是否有头部
  if(!auth){

  }
  //2.验证头部payload
  let payload = auth.match(/\.\w+\./);
  if(!payload){
    ctx.throw(401);
  }


  //3.获取id信息进行验证
  //TODO

  let secert = UserModel


  return await next();
}
export default authorize