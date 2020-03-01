'use strict';

const { api, logger } = require('@cloudifyjs/restful')

logger.debug = console.debug
logger.error = console.error
logger.info = console.info
logger.log = console.log
logger.warn = console.warn

module.exports.ping = api.document({
  target: async () => ({ message: 'pong' })
})

module.exports.error = api.document({
  target: async () => {
    throw new Error('Unexpected error')
  }
})