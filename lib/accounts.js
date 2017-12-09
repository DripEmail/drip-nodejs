'use strict';

var request = require('request');
var helper = require('./helpers');
var requestPromise = require('request-promise');

module.exports = {
  options: {
    uri: "https://api.getdrip.com/v2/accounts"
  },
  testAccounts: function(callback) {
    var options = {
      uri: "https://api.getdrip.com/v2/accounts",
      headers: {
        "content-type": "application/vnd.api+json",
        "authorization": "Basic aHphcXp1am5vZ24zZ2hncmVoMWE=",
        "User-Agent": "Drip NodeJS Wrapper"
      },
      resolveWithFullResponse: true
    }

    if (callback) {
      requestPromise(options).then(function (response) {
        var body = response.body;
        callback(null, response, body);
      }).catch(function (error) {
        callback(error, null, null);
      })
    } else {
      return requestPromise(options);
    }
  },
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
