'use strict';

module.exports = {
  baseUrl: 'https://api.getdrip.com/v2/',
  campaignsUrl: function (accountId, campaignId) {
    return "/" + accountId + "/campaigns/" + campaignId;
  }
}
