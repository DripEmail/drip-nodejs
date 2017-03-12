'use strict';

var request = require('request');
var helper = require('./helpers');

module.exports = {
  listAccounts: function (callback) {
    request.get(
      {
        url: helper.accountsUrl(),
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
        url: helper.accountsUrl() + accountId,
        headers: this.headers
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  }
}
