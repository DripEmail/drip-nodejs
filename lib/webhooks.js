'use strict';

var request = require('request');
var helper = require('./helpers');

module.exports = {
  listWebhooks: function (accountId, callback) {
    request.get(
      {
        url: helper.webhooksUrl(accountId),
        headers: this.headers
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  },
  fetchWebhook: function (accountId, webhookId, callback) {
    request.get(
      {
        url: helper.webhooksUrl(accountId) + webhookId,
        headers: this.headers
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  },
  createWebhook: function (accountId, payload, callback) {
    request.post(
      {
        url: helper.webhooksUrl(accountId),
        headers: this.headers,
        json: true,
        body: payload
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  },
  destroyWebhook: function (accountId, webhookId, callback) {
    request.del(
      {
        url: helper.webhooksUrl(accountId) + webhookId,
        headers: this.headers
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  }
}
