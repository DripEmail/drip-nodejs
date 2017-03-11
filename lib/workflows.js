'use strict';

var request = require('request');
var helper = require('./helpers');

module.exports = {
  listAllWorkflows: function (accountId, callback, status) {
    // Using this since default assignment not widely supported
    if (arguments.length === 2) {
      status = "all"
    } else {
      status = arguments[2];
    }

    request.get(
      {
        url: helper.baseUrl + accountId + "/workflows",
        headers: this.headers,
        qs: { status: status }
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  },
  fetchWorkflow: function (accountId, workflowId, callback) {
    request.get(
      {
        url: helper.workflowUrl(accountId, workflowId),
        headers: this.headers
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  },
  activateWorkflow: function (accountId, workflowId, callback) {
    request.post(
      {
        url: helper.workflowUrl(accountId, workflowId) + "/activate",
        headers: this.headers
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  },
  pauseWorkflow: function (accountId, workflowId, callback) {
    request.post(
      {
        url: helper.workflowUrl(accountId, workflowId) + "/pause",
        headers: this.headers
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  },
  startOnWorkflow: function (accountId, workflowId, payload, callback) {
    request.post(
      {
        url: helper.workflowUrl(accountId, workflowId) + "/subscribers",
        headers: this.headers,
        json: true,
        body: payload
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  },
  removeFromWorkflow: function (accountId, workflowId, emailOrId, callback) {
    request.del(
      {
        url: helper.workflowUrl(accountId, workflowId) + "/subscribers/" + emailOrId,
        headers: this.headers
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  }
}
