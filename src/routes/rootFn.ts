import * as http from "http";

let rootFn = async (ctx, next)=>{
  ctx.body = '';

  return new Promise((resolve, reject)=>{
    let req = http.request({
      hostname: 'www.baidu.com',
      method: 'get'
    }, function (res) {
      res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
        ctx.body += chunk;
      });

      res.on('end',function (res) {
        // console.log(res);
        // ctx.body = 33333;
        ctx.set('Content-Type', 'text/html; charset=utf-8');
        ctx.status = 200;
        resolve(true);
      })

    });
    req.end();
  });
};
export default rootFn;