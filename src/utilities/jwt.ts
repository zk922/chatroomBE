import {createSha256Hmac} from "./crypto";

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
 * @param u_name 用户的昵称
 * @param salt 加密盐值
 * @return Promise<string>   string为最终的token字符串
 * **/
export async function createJWT(u_id: string, u_name: string, salt: string) {
  const date = new Date();
  const header = {
    "alg": "HS256",
    "typ": "JWT"
  };
  const payload = {
    "nbf": date.getTime(),
    "exp": date.getTime() + 7 * 24 * 60 * 60 * 1000,  //有效期为7天
    "u_id": u_id,
    "u_name": u_name
  };

  const headerBase64 = new Buffer(JSON.stringify(header)).toString('base64');

  const payloadBase64 = new Buffer(JSON.stringify(payload)).toString('base64');

  const signature = await createSha256Hmac(`${headerBase64}.${payloadBase64}`, salt);

  return `${headerBase64}.${payloadBase64}.${signature}`;

}


createJWT('11', '22', 'dsfsaf3').then(v=>{
  console.log(v);
});