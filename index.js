module.exports = async function metaResponse(ctx, next) {
  ctx.state.meta = {};

  await next;

  if (this.status === 204) {
    return;
  }

  let payload = {
    meta: ctx.state.meta,
    response: ctx.response.body
  };

  ctx.response.body = payload;
};
