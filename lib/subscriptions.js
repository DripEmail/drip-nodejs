module.exports = {
  /**
   * Fetch a list of a subscriber's campaign subscriptions
   *
   * @param {string} subscriberId - The subscriber's id
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  subscriberCampaignSubscriptions(subscriberId, callback) {
    return this.get(`v2/${this.accountId}/subscribers/${subscriberId}/campaign_subscriptions`, {}, callback);
  }
};
