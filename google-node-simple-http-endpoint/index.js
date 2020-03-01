'use strict';
const api = require('@cloudifyjs/restful').api

exports.http = api.document({
  target: async () => ({ message: 'Hello world!' })
});
