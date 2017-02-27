'use strict';

var request = require('request');
var helper = require('./helpers');

module.exports = {
  listCampaigns: function (accountId, callback, status) {
    // Using this since default assignment not widely supported
    if (arguments.length === 2) {
      status = "all"
    } else {
      status = arguments[2];
    }

    request.get(
      {
        url: helper.baseUrl + "/" + accountId + "/campaigns",
        headers: this.headers,
        qs: { status: status }
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  },
  fetchCampaign: function (accountId, campaignId, callback) {
    request.get(
      {
        url: helper.baseUrl + "/" + accountId + "/campaigns/" + campaignId,
        headers: this.headers
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  },
  activateCampaign: function (accountId, campaignId, callback) {
    request.post(
      {
        url: helper.baseUrl + "/" + accountId + "/campaigns/" + campaignId + "/activate",
        headers: this.headers
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  },
  pauseCampaign: function (accountId, campaignId, callback) {
    request.post(
      {
        url: helper.baseUrl + "/" + accountId + "/campaigns/" + campaignId + "/pause",
        headers: this.headers
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  }
}
