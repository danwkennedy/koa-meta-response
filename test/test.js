'use strict';

var chai = require('chai');
var assert = chai.assert;
var response = require('..');

function getMiddleware(context) {
  return response.apply(context);
}

describe('koa-meta-response', function describeSuccess() {

  it('should add meta to the context', function addMeta() {
    let context = {
      status: 200,
      state: {}
    };

    let generator = getMiddleware(context);

    assert.notProperty(context.state, 'meta');
    generator.next();
    assert.property(context.state, 'meta');
  });

  it('should do nothing on 204', function skip204() {
    let context = {
      status: 204,
      state: {}
    };

    let generator = getMiddleware(context);

    generator.next();
    generator.next();

    assert.notProperty(context.state.meta, 'status');
  });

  it('should set the meta field in the body', function bodyMeta() {
    let context = {
      status: 200,
      state: {
        meta: {
          status: 'success'
        }
      }
    };

    let generator = getMiddleware(context);

    generator.next();
    generator.next();

    assert.property(context.body, 'meta');
    assert.deepEqual(context.body.meta, context.state.meta);
  });

  it('should set move the body to response', function bodyResponse() {
    let body = {
      title: 'Success'
    };

    let context = {
      status: 200,
      body: body,
      state: {
        meta: {}
      }
    };

    let generator = getMiddleware(context);

    generator.next();
    generator.next();

    assert.property(context.body, 'response');
    assert.deepEqual(context.body.response, body);
  });
});
