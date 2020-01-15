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
    helpers.checkRequiredFields(payload, requiredFields, true);

    return this.post(`v3/${this.accountId}/shopper_activity/cart`, payload, callback);
  },
  /**
   * Create or update an order for a customer
   * Docs: https://developer.drip.com/#order-activity
   *
   * @param {object} payload - An object with order details
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  createUpdateOrderActivity(payload, callback) {
    const requiredFields = ['provider', 'action', 'order_id'];
    helpers.checkRequiredFields(payload, requiredFields);

    return this.post(`v3/${this.accountId}/shopper_activity/order`, payload, callback);
  },
  /**
   * Create or update a product
   * Docs: https://developer.drip.com/#product-activity
   *
   * @param {object} payload - An object with product details
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  createUpdateProductActivity(payload, callback) {
    const requiredFields = ['provider', 'action', 'product_id', 'name', 'price', 'product_variant_id'];
    helpers.checkRequiredFields(payload, requiredFields);

    return this.post(`v3/${this.accountId}/shopper_activity/product`, payload, callback);
  }
};
