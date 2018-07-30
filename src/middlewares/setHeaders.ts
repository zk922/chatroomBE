export let setAccessControl = async (ctx, next) => {
  ctx.append('Access-Control-Allow-Origin', '*');
  await next();
}