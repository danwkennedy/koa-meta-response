var response = require('.');

function getMiddleware(context) {
  return response.apply(context);
}

describe('koa-meta-response', function describeSuccess() {

  it('should add meta to the context', async function addMeta() {
    let context = {
      status: 200,
      state: {},
      request: {},
      response: {}
    };

    await response(context, () => {});

    expect(context.state).toHaveProperty('meta');
  });

  it('should do nothing on 204', async function skip204() {
    let context = {
      status: 204,
      state: {},
      request: {},
      response: {}
    };

    await response(context, () => {});

    expect(context.request.body).toBe(undefined);
  });

  it('should set the meta field in the body', async function bodyMeta() {
    let context = {
      status: 200,
      state: {
        meta: {
          status: 'success'
        }
      },
      request: {},
      response: {}
    };

    await response(context, () => {});

    expect(context.response.body).toHaveProperty('meta', context.state.meta);
  });

  it('should set move the body to response', async function bodyResponse() {
    let body = {
      title: 'Success'
    };

    let context = {
      status: 200,
      state: {
        meta: {}
      },
      request: {},
      response: { body: body}
    };

    await response(context, () => {});

    expect(context.response.body).toHaveProperty('response', body);
  });
});
