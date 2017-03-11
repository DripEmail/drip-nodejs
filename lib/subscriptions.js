'use strict';

var request = require('request');
var helper = require('./helpers');

module.exports = {
  subscriberCampaignSubscriptions: function (accountId, subscriberId, callback) {
    request.get(
      {
        url: helper.baseUrl + accountId + "/subscribers/" + subscriberId + "/campaign_subscriptions",
        headers: this.headers
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  }
}
