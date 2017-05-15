'use strict';

var request = require('request');
var helper = require('./helpers');

module.exports = {
  listSubscribers: function (accountId, callback) {
    request.get(
      {
        url: helper.subscribersUrl(accountId),
        headers: this.headers
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  },
  updateSubscriber: function (accountId, payload, callback) {
    request.post(
      {
        url: helper.subscribersUrl(accountId),
        headers: this.headers,
        json: true,
        body: payload
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  },
  fetchSubscriber: function (accountId, emailOrId, callback) {
    request.get(
      {
        url: helper.subscribersUrl(accountId) + emailOrId,
        headers: this.headers
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  },
  unsubscribeFromCampaign: function (accountId, emailOrId, campaignId, callback) {
    request.post(
      {
        url: helper.subscribersUrl(accountId) + emailOrId + "/remove",
        headers: this.headers,
        qs: { campaignId }
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  },
  unsubscribeFromAllMailings: function (accountId, emailOrId, callback) {
    request.post(
      {
        url: helper.subscribersUrl(accountId) + emailOrId + "/unsubscribe_all",
        headers: this.headers
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  },
  deleteSubscriber: function (accountId, emailOrId, callback) {
    request.del(
      {
        url: helper.subscribersUrl(accountId) + emailOrId,
        headers: this.headers
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  },
  updateBatchSubscribers: function (accountId, payload, callback) {
    var subscribers = payload && payload.batches && payload.batches[0].subscribers || [];
    var batchSize = 1000;
    var batches = [];
    var errors = [], responses = [], bodies = [];
    var headers = this.headers;
    var done = 0;
    var hasError = false;

    // Break the payload into batch-sized chunks
    for(var i = 0, j = subscribers.length; i < j; i += batchSize) {
      batches.push(subscribers.slice(i, batchSize));
    }

    batches.forEach(function(batch, batchIndex) {
      request.post(
        {
          url: helper.subscribersUrl(accountId) + "batches",
          headers: headers,
          json: true,
          body: {
            batches: [{
              subscribers: batch
            }]
          }
        },
        function(error, response, body) {
          errors[batchIndex] = error;
          responses[batchIndex] = response;
          bodies[batchIndex] = body;
          hasError = hasError || error;
          done += 1;

          if(done === batches.length) {
            // All batches complete; call back
            callback(
              hasError ? errors : null,
              responses,
              bodies);
          }
        }
      )
    })
  }
}
