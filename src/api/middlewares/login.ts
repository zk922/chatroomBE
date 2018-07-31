async function login(ctx, next) {
  console.log(ctx.request.body);
  ctx.body = ctx.request.body.u_name;



}

export default login;