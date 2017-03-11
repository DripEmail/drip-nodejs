'use strict';

var request = require('request');
var helper = require('./helpers');

module.exports = {
  recordEvent: function (accountId, payload, callback) {
    request.post(
      {
        url: helper.eventsUrl(accountId),
        headers: this.headers,
        json: true,
        body: payload
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  },
  recordBatchEvents: function (accountId, payload, callback) {
    request.post(
      {
        url: helper.eventsUrl(accountId) + "batches",
        headers: this.headers,
        json: true,
        body: payload
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  },
  listEventActions: function (accountId, callback, options) {
    // Using this since default assignment not widely supported
    if (arguments.length === 2) {
      options = { per_page: 100 }
    } else {
      options = arguments[2];
    }

    request.get(
      {
        url: helper.baseUrl + accountId + "/event_actions",
        headers: this.headers,
        qs: options
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  }
}
