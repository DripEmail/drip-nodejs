'use strict';

var request = require('request');
var helper = require('./helpers');

module.exports = {
  listSubscribers: function (accountId) {
    request.get(
      {
        url: helper.baseUrl + "/" + accountId + "/subscribers",
        headers: this.headers
      },
      helper.callback
    )
  },
  updateSubscriber: function (accountId, email, payload) {
    request.post(
      {
        url: helper.baseUrl + "/" + accountId + "/subscribers",
        headers: this.headers,
        json: true,
        body: payload
      },
      helper.callback
    )
  }
}
