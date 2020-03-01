'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const Joi = require('@hapi/joi')
const api = require('@cloudifyjs/restful').api

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.delete = api.document({
  validators: {
    pathParameters: Joi.object({
      id: Joi.string().required()
    })
  },
  target: async ({pathParameters}) => {
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: {
        id: pathParameters.id,
      },
    };
    await dynamoDb.delete(params).promise();
    return {};
  }
})
