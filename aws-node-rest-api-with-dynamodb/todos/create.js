'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const Joi = require('@hapi/joi')
const api = require('@cloudifyjs/restful').api

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = api.document({
  validators: {
    body: Joi.object({
      text: Joi.string().required()
    })
  },
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
  target: async ({body}) => {
    const timestamp = new Date().getTime();
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Item: {
        id: uuid.v1(),
        text: body.text,
        checked: false,
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    };
    // write the todo to the database
    await dynamoDb.put(params).promise();
    return params.Item;
  }
})
