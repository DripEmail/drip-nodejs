module.exports = {
  /**
   * Fetch a list of all webhooks
   *
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  listWebhooks(callback) {
    return this.get(`v2/${this.accountId}/webhooks`, {}, callback);
  },
  /**
   * Fetch a webhook
   *
   * @param {number} webhookId - Required. The webhook id
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  fetchWebhook(webhookId, callback) {
    return this.get(`v2/${this.accountId}/webhooks/${webhookId}`, {}, callback);
  },
  /**
   * Create a webhook
   *
   * @param {number} webhookId - Required. The webhook id
   * @param {object} payload - Required. The webhook event details
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  createWebhook(payload, callback) {
    return this.post(`v2/${this.accountId}/webhooks`, this.generateResource('webhooks', payload), callback);
  },
  /**
   * Destroy a webhook
   *
   * @param {number} webhookId - Required. The webhook id
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  destroyWebhook(webhookId, callback) {
    return this.del(`v2/${this.accountId}/webhooks/${webhookId}`, {}, callback);
  }
};
