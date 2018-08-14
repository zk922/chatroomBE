// import {AuthModel} from "../../mongoose/mongooseModels";
import {createRandomString, generatePwdHash} from "../../utilities/crypto";

/**
 * 注册流程：
 * 1.再次加密密码
 * 2.生成此次颁发的token的secert
 * 3.保存至数据库
 * 4.保存成功颁发token
 * **/
export async function register(ctx, next) {
  console.log('收到注册信息：',ctx.request.body);
  const params = ctx.request.body;

  //1.检查接收到的信息是否有效
  if(!params.name || !params.pwd){
    ctx.body = {result: 1, msg: '注册信息无效'};
    return;
  }

  //2.检查用户名是否已经存在
  // let query = AuthModel.findOne({name: params.name});
  // try{
  //   let result = await query.exec();
  //   console.log(result);
  //   if(result.get('name') === params.name){
  //     console.log('用户名已经存在');
  //     ctx.body = {result: 2, msg: '用户名已存在'};
  //     return;
  //   }
  // }
  // catch (e) {
  //   console.log(e);
  //   ctx.body = {result: 2, msg: '注册失败'};
  //   ctx.status = 500;
  //   return;
  // }

  //生成办法token的随机盐值，也是用户信息里面的当前secert
  const secret = await createRandomString(256);
  //再次加密密码
  const pwd = await generatePwdHash(params.pwd);

  //生成monggose document
  // const newUser = new AuthModel({
  //   name: params.name,
  //   pwd: pwd,
  //   secretKey: secret
  // });
  // newUser.set('u_id', newUser.id);
  // console.log(newUser);
  // newUser.save()

}

export default register;