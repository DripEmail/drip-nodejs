'use strict';

var request = require('request');
var helper = require('./helpers');

module.exports = {
  listSubscribers: function (accountId, callback) {
    request.get(
      {
        url: helper.baseUrl + accountId + "/subscribers",
        headers: this.headers
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  },
  updateSubscriber: function (accountId, email, payload, callback) {
    request.post(
      {
        url: helper.baseUrl + accountId + "/subscribers",
        headers: this.headers,
        json: true,
        body: payload
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  },
  fetchSubscriber: function (accountId, emailOrId, callback) {
    request.get(
      {
        url: helper.baseUrl + accountId + "/subscribers/" + emailOrId,
        headers: this.headers
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  },
  unsubscribeFromCampaign: function (accountId, emailOrId, campaignId, callback) {
    request.post(
      {
        url: helper.baseUrl + accountId + "/subscribers/" + emailOrId + "/remove",
        headers: this.headers,
        qs: { campaignId }
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  },
  unsubscribeFromAllMailings: function (accountId, emailOrId, callback) {
    request.post(
      {
        url: helper.baseUrl + accountId + "/subscribers/" + emailOrId + "/unsubscribe_all",
        headers: this.headers
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  },
  deleteSubscriber: function (accountId, emailOrId, callback) {
    request.del(
      {
        url: helper.baseUrl + accountId + "/subscribers/" + emailOrId,
        headers: this.headers
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  }
}

// Handle batch subscriber updates
