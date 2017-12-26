const request = require('request');
const helper = require('./helpers');

module.exports = {
  listAllWorkflows(accountId, callback, status = 'all') {
    request.get(
      {
        url: `${helper.baseUrl + accountId}/workflows`,
        headers: this.headers,
        qs: { status }
      },
      (error, response, body) => {
        callback(error, response, body);
      }
    );
  },
  fetchWorkflow(accountId, workflowId, callback) {
    request.get(
      {
        url: helper.workflowUrl(accountId, workflowId),
        headers: this.headers
      },
      (error, response, body) => {
        callback(error, response, body);
      }
    );
  },
  activateWorkflow(accountId, workflowId, callback) {
    request.post(
      {
        url: `${helper.workflowUrl(accountId, workflowId)}/activate`,
        headers: this.headers
      },
      (error, response, body) => {
        callback(error, response, body);
      }
    );
  },
  pauseWorkflow(accountId, workflowId, callback) {
    request.post(
      {
        url: `${helper.workflowUrl(accountId, workflowId)}/pause`,
        headers: this.headers
      },
      (error, response, body) => {
        callback(error, response, body);
      }
    );
  },
  startOnWorkflow(accountId, workflowId, payload, callback) {
    request.post(
      {
        url: `${helper.workflowUrl(accountId, workflowId)}/subscribers`,
        headers: this.headers,
        json: true,
        body: payload
      },
      (error, response, body) => {
        callback(error, response, body);
      }
    );
  },
  removeFromWorkflow(accountId, workflowId, emailOrId, callback) {
    request.del(
      {
        url: `${helper.workflowUrl(accountId, workflowId)}/subscribers/${emailOrId}`,
        headers: this.headers
      },
      (error, response, body) => {
        callback(error, response, body);
      }
    );
  }
};
