module.exports = {
  /**
   * Record purchases for a subscriber
   *
   * @deprecated Deprecated since version 2.0.0. Will be deleted in version 3.0.0.
   * The beta Purchase endpoint has been deprecated and this method now sends requests
   * to the Order creation endpoint. Please use `createUpdateOrder` instead
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
