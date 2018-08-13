import * as crypto from "crypto";
import TypedArray = NodeJS.TypedArray;

/**
 * 生成随机字符串，使用randomBytes随机字节，转成hex字符串
 * **/
export function createSalt(sizeOfBytes: number): Promise<string> {
  return new Promise((resolve, reject)=>{
    crypto.randomBytes(sizeOfBytes, (err, buf)=>{
      if(err){
        reject(err);
        return;
      }
      resolve(buf.toString('hex'));
    });
  })
}

/***
 * sha256 hmac
 * */
export function createSha256Hmac(data: string | Buffer, salt: string | Buffer | TypedArray): Promise<string> {
  return new Promise((resolve, reject)=>{
    const hmac = crypto.createHmac('sha256', salt);
    hmac.on('readable', ()=>{
      const data = hmac.read() as Buffer;
      if(data){
        resolve(data.toString('hex'));
      }
      else{
        reject(new Error('加密失败'));
      }
    });
    hmac.write(data);
    hmac.end();
  })
}
