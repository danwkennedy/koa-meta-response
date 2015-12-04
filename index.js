'use strict';

module.exports = function *(next) {
    this.state.meta = {};

    yield next;

    if (this.status == 204) {
      return;
    }

    let payload = {
      meta: this.state.meta,
      response: this.body
    };

    this.body = payload;
};
