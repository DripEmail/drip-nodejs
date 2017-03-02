'use strict';

var request = require('request');
var helper = require('./helpers');

module.exports = {
  listTriggers: function (accountId, workflowId, callback) {
    request.get(
      {
        url: helper.baseUrl + accountId + "/workflows/" + workflowId + "/triggers",
        headers: this.headers
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  },
  createTrigger: function (accountId, workflowId, payload, callback) {
    request.post(
      {
        url: helper.baseUrl + accountId + "/workflows/" + workflowId + "/triggers",
        headers: this.headers,
        json: true,
        body: payload
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  },
  // To do: Revisit this
  updateTrigger: function (accountId, workflowId, triggerId, payload, callback) {
    request.put(
      {
        url: helper.baseUrl + accountId + "/workflows/" + workflowId + "/triggers/" + triggerId,
        headers: this.headers,
        json: true,
        body: payload
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  }
}
