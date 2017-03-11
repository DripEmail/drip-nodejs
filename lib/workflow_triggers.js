'use strict';

var request = require('request');
var helper = require('./helpers');

module.exports = {
  listTriggers: function (accountId, workflowId, callback) {
    request.get(
      {
        url: helper.workflowTriggerUrl(accountId, workflowId),
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
        url: helper.workflowTriggerUrl(accountId, workflowId),
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
        url: helper.workflowTriggerUrl(accountId, workflowId) + triggerId,
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
