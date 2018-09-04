import {UserModel} from "../../mongoose/mongooseModels";
import {createRandomString, generatePwdHash} from "../../utilities/crypto";
import {createJWT} from "../../utilities/jwt";

/**
 * 注册流程：
 * 1.检查信息是否有效
 * 2.检查用户名是否重复
 * 3.生成此次颁发的token的secert，再次加密密码
 * 4.保存至数据库
 * 5.保存成功颁发token
 * **/

//TODO 并没有防止刷接口，这点以后需要处理。或者后面改成https就行

export async function register(ctx, next) {
  console.log('收到注册信息：',ctx.request.body);
  const params = ctx.request.body;

  //1.检查接收到的信息是否有效
  if(!params.name || !params.pwd){
    ctx.status = 403;
    ctx.body = {result: 1, msg: '注册信息无效'};
    return;
  }
  if(!/^[a-zA-Z]\w{2,7}$/.test(params.name)){
    ctx.status = 403;
    ctx.body = {result: 2, msg: '用户名格式不符合要求'};
    return;
  }


  //2.检查用户名是否已经存在
  let query = UserModel.findOne({name: params.name});
  try{
    let result = await query.exec();
    console.log(result);
    if(result && result.get('name') === params.name){
      console.log('用户名已经存在');
      ctx.status = 409;
      ctx.body = {result: 3, msg: '用户名已存在'};
      return;
    }
  }
  catch (e) {
    console.log(e);
    ctx.body = {result: 4, msg: '服务器错误，注册失败'};
    ctx.status = 500;
    return;
  }

  //3.生成颁发token的随机盐值，也是用户信息里面的当前secert，并再次加密密码
  const secret = await createRandomString(256);
  const pwd = await generatePwdHash(params.pwd);

  //4.生成monggose document
  const newUser = new UserModel({
    name: params.name,
    pwd: pwd,
    secret: secret
  });
  console.log(newUser);
  try{
    await newUser.save();
  }
  catch (e) {
    console.log('保存数据失败', e);
    ctx.body = {result: 5, msg: '服务器错误，注册失败'};
    ctx.status = 500;
    return
  }

  //5.颁发token
  let token = await createJWT(newUser.id, secret);

  ctx.cookies.set('token', token, {
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
  ctx.body = {
    result: 0,
    msg: '注册成功',
    token: token,
    userInfo: {
      u_id: newUser.id,
      nickName: '新用户',
      friends: [],
      groups: []
    }
  };
  ctx.status = 200;

}

export default register;