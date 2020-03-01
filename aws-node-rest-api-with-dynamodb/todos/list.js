'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const api = require('@cloudifyjs/restful').api

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const params = {
  TableName: process.env.DYNAMODB_TABLE,
};

module.exports.list = api.collection({
  links: {
    self: {
      href: '${request.path}/${item.id}',
      type: 'GET'
    },
    update: {
      href: '${request.path}/${item.id}',
      type: 'PUT'
    },
    delete: {
      href: '${request.path}/${item.id}',
      type: 'DELETE'
    }
  },
  target: async () => {
    const result = await dynamoDb.scan(params).promise();
    return result.Items;
  }
})

