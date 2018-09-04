import {UserModel} from "../../mongoose/mongooseModels";
import {comparePwd, createRandomString} from "../../utilities/crypto";
import {createJWT} from "../../utilities/jwt";
import {Document} from "mongoose";

/**
 * 登录接口
 * 接口content-type: application/json
 * {
 *   name: string,
 *   pwd: string
 * }
 * **/

export async function login(ctx, next) {
  console.log('收到登陆请求：',ctx.request.body);
  let params = ctx.request.body;

  //1.去数据库拉取name的用户信息
  let query = UserModel.findOne({name: params.name});
  let result: Document;
  try{
    result = await query.exec();
    if(result){
      if(await comparePwd(params.pwd, result.get('pwd'))){
        console.log('密码比对成功，开始颁发token');
      }
      else{
        console.log('密码错误');
        ctx.status = 401;
        ctx.body = {result: 1, msg: '密码错误'};
        return;
      }
    }
    else{
      //用户不存在
      ctx.status = 404;
      ctx.body = {result: 2, msg: '用户不存在'};
      return;
    }
  }
  catch (e) {
    //调取数据库失败
    ctx.status = 500;
    ctx.body = {result: 3, msg: '服务器调取数据失败'};
    return;
  }
  //2.生成token
  const secret = await createRandomString(256);
  const token = await createJWT(result.id, secret);
  //3.储存新secret
  let update = result.update({secret: secret});
  try{
    await update.exec();
  }
  catch (e) {
    ctx.status = 500;
    ctx.body = {result: 4, msg: '新secret保存失败'};
    return;
  }
  //3.颁发token
  ctx.cookies.set('token', token, {
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
  ctx.body = {
    result: 0,
    msg: '登录成功',
    token: token,
    userInfo: {
      u_id: result.id,
      nickName: result.get('nickName'),
      friends: result.get('friends'),
      groups: result.get('groups')
    }
  };
  ctx.status = 200;
}

export default login;