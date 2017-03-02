'use strict';

var request = require('request');
var helper = require('./helpers');

module.exports = {
  createPurchase: function (accountId, emailOrId, payload, callback) {
    request.post(
      {
        url: helper.baseUrl + accountId + "/subscribers/" + emailOrId + "/purchases",
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
        url: helper.baseUrl + accountId + "/subscribers/" + emailOrId + "/purchases",
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
        url: helper.baseUrl + accountId + "/subscribers/" + emailOrId + "/purchases/" + purchaseId,
        headers: this.headers
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  }
}
