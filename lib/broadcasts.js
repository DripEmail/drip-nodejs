'use strict';

var request = require('request');
var helper = require('./helpers');

module.exports = {
  listBroadcasts: function (accountId, callback, status) {
    // Using this since default assignment not widely supported
    if (arguments.length === 2) {
      status = "all"
    } else {
      status = arguments[2];
    }

    request.get(
      {
        url: helper.broadcastsUrl(accountId),
        headers: this.headers,
        qs: { status: status }
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  },
  fetchBroadcast: function (accountId, broadcastId, callback) {
    request.get(
      {
        url: helper.broadcastsUrl(accountId) + broadcastId,
        headers: this.headers
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  }
}
