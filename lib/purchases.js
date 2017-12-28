const helpers = require('./helpers');

module.exports = {
  /**
   * Record purchases for a subscriber
   *
   * @param {string} idOrEmail - The subscriber's email or id
   * @param {object} payload - An object with purchase details
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  createPurchase(idOrEmail, payload, callback) {
    const encodedIdOrEmail = helpers.escapeString(idOrEmail);
    return this.post(`${this.accountId}/subscribers/${encodedIdOrEmail}/purchases`, { payload }, callback);
  },
  /**
   * List purchases for a subscriber
   *
   * @param {string} idOrEmail - The subscriber's email or id
   * @param {object} options - An object with `page` properties
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  listPurchases(idOrEmail, options = {}, callback) {
    const encodedIdOrEmail = helpers.escapeString(idOrEmail);
    return this.get(`${this.accountId}/subscribers/${encodedIdOrEmail}/purchases`, { qs: options }, callback);
  },
  /**
   * Fetch a purchase record
   *
   * @param {string} idOrEmail - The subscriber's email or id
   * @param {number} purchaseId - Required. A purchase id
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  fetchPurchase(idOrEmail, purchaseId, callback) {
    const encodedIdOrEmail = helpers.escapeString(idOrEmail);
    return this.get(`${this.accountId}/subscribers/${encodedIdOrEmail}/purchases/${purchaseId}`, {}, callback);
  }
};
