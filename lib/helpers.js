'use strict';

module.exports = {
  baseUrl: 'https://api.getdrip.com/v2/',
  accountsUrl: function () {
    return this.baseUrl + 'accounts/';
  },
  broadcastsUrl: function (accountId) {
    return this.baseUrl + accountId + '/broadcasts/';
  },
  campaignsUrl: function (accountId, campaignId) {
    return this.baseUrl + accountId + '/campaigns/' + campaignId;
  },
  conversionsUrl: function (accountId) {
    return this.baseUrl + accountId + '/goals/';
  },
  customFieldsUrl: function (accountId) {
    return this.baseUrl + accountId + "/custom_field_identifiers/";
  },
  eventsUrl: function (accountId) {
    return this.baseUrl + accountId + '/events/';
  },
  formsUrl: function (accountId) {
    return this.baseUrl + accountId + '/forms/';
  },
  purchasesUrl: function (accountId, emailOrId) {
    return this.baseUrl + accountId + '/subscribers/' + emailOrId + '/purchases/';
  },
  subscribersUrl: function (accountId) {
    return this.baseUrl + accountId + '/subscribers/';
  },
  subscriptionsUrl: function (accountId, subscriberId) {
    return this.baseUrl + accountId + "/subscribers/" + subscriberId + "/campaign_subscriptions/"
  },
  tagsUrl: function (accountId) {
    return this.baseUrl + accountId + '/tags/';
  },
  userUrl: function () {
    return this.baseUrl + 'user/';
  },
  webhooksUrl: function (accountId) {
    return this.baseUrl + accountId + '/webhooks/';
  },
  workflowTriggerUrl: function (accountId, workflowId) {
    return this.baseUrl + accountId + '/workflows/' + workflowId + '/triggers/';
  },
  workflowUrl: function (accountId, workflowId) {
    return this.baseUrl + accountId + '/workflows/' + workflowId;
  }
}
