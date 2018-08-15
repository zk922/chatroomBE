export async function other(ctx, next) {
  ctx.status = 200;
  ctx.body = 'ok';
}

export default other;