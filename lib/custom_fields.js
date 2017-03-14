'use strict';

var request = require('request');
var helper = require('./helpers');

module.exports = {
  listAllCustomFields: function (accountId, callback) {
    request.get(
      {
        url: helper.customFieldsUrl(accountId),
        headers: this.headers
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  }
}
