module.exports = {
  /**
   * Record a cart for a subscriber
   * Docs: https://developer.drip.com/#create-or-update-a-cart
   *
   * @param {object} payload - An object with cart details
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  createUpdateCart(payload, callback) {
    return this.v3post(`${this.accountId}/shopper_activity/cart`, { payload }, callback);
  }
};
