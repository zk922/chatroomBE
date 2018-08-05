import md5 = require("blueimp-md5");

export async function login(ctx, next) {

  ctx.status = 500;
  // ctx.throw(500);
  // throw new Error('dd')
  // console.log('got new login request ', ctx.request.body);
  //
  // let u_name = ctx.request.body.u_name;
  // let str = u_name + new Date().toString();
  //
  // ctx.body = { u_id: 'uid_' + md5(str).slice(0, 8), u_name: u_name};
  // ctx.status = 200;
  // ctx.set('Content-type', 'application/json');

}

export default login;