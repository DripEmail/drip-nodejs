const helpers = require('./helpers');

module.exports = {
  /**
   * Create or update a cart for a customer
   * Docs: https://developer.drip.com/#create-or-update-a-cart
   *
   * @param {object} payload - An object with cart details
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  createUpdateCartActivity(payload, callback) {
    const requiredFields = ['provider', 'action', 'cart_id', 'cart_url'];
    helpers.checkRequiredFields(payload, requiredFields);

    return this.post(`v3/${this.accountId}/shopper_activity/cart`, { payload }, callback);
  }
};
