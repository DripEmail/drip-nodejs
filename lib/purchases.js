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
    const options = Object.assign(payload, { email: idOrEmail });
    return this.post(`${this.accountId}/orders`, { options }, callback);
  }
};
