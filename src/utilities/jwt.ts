import {createSha256Hmac} from "./crypto";
import {UserModel} from "../mongoose/mongooseModels";
import {Document} from "mongoose";


interface Payload {
  nbf: number;
  exp: number;
  u_id: string
}

/**
 * 自己简单生成jwt
 * 1. 每个用户在登陆时候生成token。
 * 2. 新注册用户会在注册时候，自动登录，生成token。
 * 2. token的加密secert使用createSalt生成，存储在每个用户的Auth model中。
 * **/

/**
 * 至于为什么每个用户单独生成secert。
 * 1. 为了防止secert泄露，这会影响所有用户的token。
 * 2. 可以通过更改某个用户的secert来废除已经颁发出去的token。
 **/

/**
 * @param u_id: 用户的唯一标识
 * @param salt 加密盐值
 * @return Promise<string>   string为最终的token字符串
 * **/
export async function createJWT(u_id: string, salt: string) {
  const date = new Date();
  const header = {
    "alg": "HS256",
    "typ": "JWT"
  };
  const payload: Payload = {
    "nbf": date.getTime(),
    "exp": date.getTime() + 7 * 24 * 60 * 60 * 1000,  //有效期为7天
    "u_id": u_id
  };
  const headerBase64 = new Buffer(JSON.stringify(header)).toString('base64');
  const payloadBase64 = new Buffer(JSON.stringify(payload)).toString('base64');
  const signature = await createSha256Hmac(`${headerBase64}.${payloadBase64}`, salt);

  return `${headerBase64}.${payloadBase64}.${signature}`;
}


//校验token是否有效，仅在result为0时候为通过
export async function checkJWT(token: string): Promise<{result: number, msg: string, userInfo?: Document}> {
  //1.判断认证头是否存在
  if(!token){
    return {result: 1, msg: '无认证头'};
  }
  //2.解析payload
  let id: string;
  let exp: number;
  try{
    let payload = await getPayload(token);
    id = payload.u_id;
    exp = payload.exp;
  }
  catch (e) {
    return {result: 2, msg: 'token解析失败'};
  }
  //3.检查是否过期
  if(new Date().getTime() >= exp){
    console.log('token过期');
    return {result: 3, msg: 'token过期'};
  }
  //4.获取secret
  let query = UserModel.findById(id);
  let queryResult: Document;
  let secret;
  try{
    queryResult = await query.exec();
    secret = queryResult.get('secret');
  }
  catch (e) {
    return {result: 4, msg: '查询数据库失败'};
  }
  //5.比对secret
  try{
    let result = await compareJWT(token, secret);
    if(!result){
      return {result: 5, msg: '比对secret失败'};
    }
  }
  catch (e) {
    return {result: 5, msg: '比对secret失败'};
  }

  return {result: 0, msg: 'token验证成功', userInfo: queryResult};
}


//校验token的secret
export async function compareJWT(token: string, secret: string){
  const matches = token.match(/^([^.]+)\.([^.]+)\.([^.]+)/);
  const header = matches[1];
  const payload = matches[2];
  const signature = matches[3];
  const _signature = await createSha256Hmac(`${header}.${payload}`, secret);

  // console.log('比对1', signature)
  // console.log('比对2', _signature)
  return signature === _signature;
}

//解析payload
export async function getPayload(token: string): Promise<Payload> {
  let payload;
  try{
    payload = JSON.parse(new Buffer(token.match(/\.(\w+)\./)[1], 'base64').toString('utf8'));
    return payload;
  }
  catch (e) {
    return null;
  }
}