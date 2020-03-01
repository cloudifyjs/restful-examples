'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const Joi = require('@hapi/joi')
const api = require('@cloudifyjs/restful').api

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.update = api.document({
  validators: {
    pathParameters: Joi.object({
      id: Joi.string().required()
    }),
    body: Joi.object({
      text: Joi.string().required(),
      checked: Joi.boolean().required()
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
  target: async ({pathParameters, body}) => {
    const timestamp = new Date().getTime();

    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: {
        id: pathParameters.id,
      },
      ExpressionAttributeNames: {
        '#todo_text': 'text',
      },
      ExpressionAttributeValues: {
        ':text': body.text,
        ':checked': body.checked,
        ':updatedAt': timestamp,
      },
      UpdateExpression: 'SET #todo_text = :text, checked = :checked, updatedAt = :updatedAt',
      ReturnValues: 'ALL_NEW',
    };

    const result = await dynamoDb.update(params).promise();
    return result.Attributes;
  }
})
