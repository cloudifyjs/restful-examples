'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const Joi = require('@hapi/joi')
const api = require('@cloudifyjs/restful').api

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.get = api.document({
  validators: {
    pathParameters: Joi.object({
      id: Joi.string().required()
    })
  },
  links: {
    self: {
      href: '${request.path}',
      type: 'GET'
    },
    update: {
      href: '${request.path}',
      type: 'PUT'
    },
    delete: {
      href: '${request.path}',
      type: 'DELETE'
    }
  },
  target: async ({pathParameters}) => {
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: {
        id: pathParameters.id,
      },
    };
    const result = await dynamoDb.get(params).promise();
    return result.Item;
  }
})

