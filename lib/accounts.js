'use strict';

var request = require('request');
var helper = require('./helpers');
var url = 'https://api.getdrip.com/v2/accounts/';

module.exports = {
  listAccounts: function (callback) {
    request.get(
      {
        url: url,
        headers: this.headers
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  },
  fetchAccount: function (accountId, callback) {
    request.get(
      {
        url: url + accountId,
        headers: this.headers
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  }
}
