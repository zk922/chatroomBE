import * as crypto from "crypto";
import TypedArray = NodeJS.TypedArray;
import * as bcrypt from 'bcrypt';

/**
 * 生成随机字符串，使用randomBytes随机字节，转成base64字符串
 * **/
export function createSalt(sizeOfBytes: number, encode: string = 'base64'): Promise<string> {
  return new Promise((resolve, reject)=>{
    crypto.randomBytes(sizeOfBytes, (err, buf)=>{
      if(err){
        reject(err);
        return;
      }
      resolve(buf.toString(encode));
    });
  })
}

/***
 * sha256 hmac，默认生成base64格式
 * */
export function createSha256Hmac(data: string | Buffer, salt: string | Buffer | TypedArray, encode: string = 'base64'): Promise<string> {
  return new Promise((resolve, reject)=>{
    const hmac = crypto.createHmac('sha256', salt);
    hmac.on('readable', ()=>{
      const data = hmac.read() as Buffer;
      if(data){
        resolve(data.toString(encode));
      }
      else{
        reject(new Error('加密失败'));
      }
    });
    hmac.write(data);
    hmac.end();
  })
}


/**
 * 注册时候，根据前端传来的字符串，加密接收到的密码
 * 前端也需要用bcrypt算法加密
 * **/
export function generatePwdHash(plainText: string, saltRound: number = 10): Promise<string> {
  return bcrypt.hash(plainText, saltRound);
}

/**
 * 登录时候比较密码
 * @param pwd 接收到的用户密码
 * @param hash 数据库中取到的密码
 * **/
export function comparePwd(pwd: string, hash: string): Promise<boolean> {
  return bcrypt.compare(pwd, hash);
}