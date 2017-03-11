'use strict';

var request = require('request');
var helper = require('./helpers');

module.exports = {
  listForms: function (accountId, callback) {
    request.get(
      {
        url: helper.formsUrl(accountId),
        headers: this.headers
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  },
  fetchForm: function (accountId, formId, callback) {
    request.get(
      {
        url: helper.formsUrl(accountId) + formId,
        headers: this.headers
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  }
}
