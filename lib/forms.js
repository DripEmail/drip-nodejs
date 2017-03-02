'use strict';

var request = require('request');
var helper = require('./helpers');

module.exports = {
  listForms: function (accountId, callback) {
    request.get(
      {
        url: helper.baseUrl + accountId + "/forms",
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
        url: helper.baseUrl + accountId + "/forms/" + formId,
        headers: this.headers
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  }
}
