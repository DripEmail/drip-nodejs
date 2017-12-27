module.exports = {
  baseUrl: 'https://api.getdrip.com/v2/',
  escapeIdOrEmail(string) {
    return encodeURIComponent(string);
  },
  accountsUrl() {
    return `${this.baseUrl}accounts/`;
  },
  broadcastsUrl(accountId) {
    return `${this.baseUrl + accountId}/broadcasts/`;
  },
  campaignsUrl(accountId, campaignId) {
    return `${this.baseUrl + accountId}/campaigns/${campaignId}`;
  },
  conversionsUrl(accountId) {
    return `${this.baseUrl + accountId}/goals/`;
  },
  customFieldsUrl(accountId) {
    return `${this.baseUrl + accountId}/custom_field_identifiers/`;
  },
  eventsUrl(accountId) {
    return `${this.baseUrl + accountId}/events/`;
  },
  formsUrl(accountId) {
    return `${this.baseUrl + accountId}/forms/`;
  },
  purchasesUrl(accountId, emailOrId) {
    return `${this.baseUrl + accountId}/subscribers/${emailOrId}/purchases/`;
  },
  subscribersUrl(accountId) {
    return `${this.baseUrl + accountId}/subscribers/`;
  },
  subscriptionsUrl(accountId, subscriberId) {
    return `${this.baseUrl + accountId}/subscribers/${subscriberId}/campaign_subscriptions/`;
  },
  tagsUrl(accountId) {
    return `${this.baseUrl + accountId}/tags/`;
  },
  userUrl() {
    return `${this.baseUrl}user/`;
  },
  webhooksUrl(accountId) {
    return `${this.baseUrl + accountId}/webhooks/`;
  },
  workflowTriggerUrl(accountId, workflowId) {
    return `${this.baseUrl + accountId}/workflows/${workflowId}/triggers/`;
  },
  workflowUrl(accountId, workflowId) {
    return `${this.baseUrl + accountId}/workflows/${workflowId}`;
  }
};
