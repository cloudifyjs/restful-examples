'use strict';

const api = require('@cloudifyjs/restful').api

module.exports.get = api.document({
  target: async (request) => ({
    id: 1,
    name: 'Model S',
    vendor: 'Tesla'
  })
})