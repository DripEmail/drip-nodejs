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
  }
}
