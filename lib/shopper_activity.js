const MissingAttributeError = require('./errors');

function findMissingRequiredFields(payload) {
  let requiredFields = ['provider', 'action', 'cart_id', 'cart_url'];

  return Object.entries(payload).
    filter(field => requiredFields.includes(field[0]));
}

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
    let missingRequiredFields = findMissingRequiredFields(payload);
    if (missingRequiredFields.length > 0) {
      throw new MissingAttributeError(`Required Attribute(s) Missing: ${missingRequiredFields}`);
    }

    return this.post(`v3/${this.accountId}/shopper_activity/cart`, { payload }, callback);
  }
}
