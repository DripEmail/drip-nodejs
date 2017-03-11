'use strict';

module.exports = {
  baseUrl: 'https://api.getdrip.com/v2/',
  campaignsUrl: function (accountId, campaignId) {
    return "/" + accountId + "/campaigns/" + campaignId;
  },
  eventsUrl: function (accountId) {
    return this.baseUrl + accountId + "/events/";
  },
  purchasesUrl: function (accountId, emailOrId) {
    return this.baseUrl + accountId + "/subscribers/" + emailOrId + "/purchases/";
  },
  tagsUrl: function (accountId) {
    return this.baseUrl + accountId + "/tags";
  },
  workflowTriggerUrl: function (accountId, workflowId) {
    return this.baseUrl + accountId + "/workflows/" + workflowId + "/triggers/";
  },
  workflowUrl: function (accountId, workflowId) {
    return this.baseUrl + accountId + "/workflows/" + workflowId;
  }
}
