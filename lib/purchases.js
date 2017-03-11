'use strict';

var request = require('request');
var helper = require('./helpers');

module.exports = {
  createPurchase: function (accountId, emailOrId, payload, callback) {
    request.post(
      {
        url: helper.purchasesUrl(accountId, emailOrId),
        headers: this.headers,
        json: true,
        body: payload
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  },
  listPurchases: function (accountId, emailOrId, callback) {
    request.get(
      {
        url: helper.purchasesUrl(accountId, emailOrId),
        headers: this.headers
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  },
  fetchPurchase: function (accountId, emailOrId, purchaseId, callback) {
    request.get(
      {
        url: helper.purchasesUrl(accountId, emailOrId) + purchaseId,
        headers: this.headers
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  }
}
