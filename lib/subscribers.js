const request = require('axios');
const helpers = require('./helpers');

module.exports = {
  /**
   * List all subscribers
   *
   * @param {callback} callback - An optional callback
   * @param {object} options - An object with status and sort details
   * @returns {promise}
   */
  listSubscribers(options = {}, callback) {
    return this.get(`v2/${this.accountId}/subscribers/`, { qs: options }, callback);
  },
  /**
   * Create or update a subscriber
   *
   * @param {callback} callback - An optional callback
   * @param {object} payload - An object with the subscriber's details
   * @returns {promise}
   */
  createUpdateSubscriber(payload, callback) {
    return this.post(`v2/${this.accountId}/subscribers`, this.generateResource('subscribers', payload), callback);
  },
  /**
   * Fetch a subscriber
   *
   * @param {string} idOrEmail - The subscriber's id or email
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  fetchSubscriber(idOrEmail, callback) {
    const encodedIdOrEmail = helpers.escapeString(idOrEmail);
    return this.get(`v2/${this.accountId}/subscribers/${encodedIdOrEmail}`, {}, callback);
  },
  /**
   * Unsubscribe a subscriber from one or all campaigns
   *
   * @param {string} idOrEmail - The subscriber's id or email
   * @param {string} campaignId - Optional. Id of the campaign to be unsubscribed
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  unsubscribeFromCampaign(idOrEmail, campaignId = '', callback) {
    const encodedIdOrEmail = helpers.escapeString(idOrEmail);
    return this.post(`v2/${this.accountId}/subscribers/${encodedIdOrEmail}/remove`, { qs: { campaign_id: campaignId } }, callback);
  },
  /**
   * Unsubscribe a batch of subscribers
   *
   * @param {object} payload - An object with an array of subscriber emails
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  unsubscribeBatchSubscribers(payload, callback) {
    return this.post(`v2/${this.accountId}/unsubscribes/batches`, this.generateResource('batches', { subscribers: payload }), callback);
  },
  /**
   * Unsubscribe a subscriber from all mailings
   *
   * @param {string} idOrEmail - The subscriber's id or email
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  unsubscribeFromAllMailings(idOrEmail, callback) {
    const encodedIdOrEmail = helpers.escapeString(idOrEmail);
    return this.post(`v2/${this.accountId}/subscribers/${encodedIdOrEmail}/unsubscribe_all`, {}, callback);
  },
  /**
   * Delete a subscriber
   *
   * @param {string} idOrEmail - The subscriber's id or email
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  deleteSubscriber(idOrEmail, callback) {
    const encodedIdOrEmail = helpers.escapeString(idOrEmail);
    return this.del(`v2/${this.accountId}/subscribers/${encodedIdOrEmail}`, {}, callback);
  },
  /**
   * Create or update a batch of subscribers
   *
   * @param {object} payload - An object with the subscriber's details
   * @param {callback} callback - Required. A callback
   */

  updateBatchSubscribers: async function (payload, callback) {
    const subscribers = (payload && payload.batches && payload.batches[0].subscribers) || [];
    const batchSize = 1000;
    const batches = [];
    const errors = [];
    const responses = [];
    const bodies = [];
    const headers = this.requestHeaders();
    let hasError = false;

    // Break the payload into batch-sized chunks
    for (let i = 0; i < subscribers.length; i += batchSize) {
      batches.push(subscribers.slice(i, i + batchSize));
    }

    // Map each batch to an axios request and store the results
    await Promise.all(
      batches.map((batch, batchIndex) =>
        request({
          method: 'post',
          url: `${helpers.baseUrl}v2/${this.accountId}/subscribers/batches`,
          headers,
          responseType: 'json',
          data: {
            batches: [{
              subscribers: batch
            }]
          }
        })
        .then((response) => {
          responses[batchIndex] = response;
          bodies[batchIndex] = response.data;
          errors[batchIndex] = null;
        })
        .catch((error) => {
          errors[batchIndex] = error;
          responses[batchIndex] = null;
          bodies[batchIndex] = null;
          hasError = true;
        })
      )
    );

    callback(hasError ? errors : null, responses, bodies);
  }
};
