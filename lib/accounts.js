'use strict';

var request = require('request');
var helper = require('./helpers');
var url = 'https://api.getdrip.com/v2/accounts/';

module.exports = {
  listAccounts: function () {
    request.get({ url: url, headers: this.headers }, helper.callback)
  },
  fetchAccount: function (accountId) {
    request.get({ url: url + accountId, headers: this.headers }, helper.callback)
  }
}
