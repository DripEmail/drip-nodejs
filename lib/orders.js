module.exports = {
  /**
   * Record an order for a subscriber
   * Docs: http://developer.drip.com/#create-or-update-an-order
   *
   * @param {object} payload - An object with order details
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  createUpdateOrder(payload, callback) {
    return this.post(`v2/${this.accountId}/orders`, this.generateResource('orders', payload), callback);
  },
  /**
   * Record a batch of orders
   * Docs: http://developer.drip.com/#create-or-update-a-batch-of-orders
   *
   * @param {object} payload - An array of multiple order objects
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  createUpdateBatchOrders(payload, callback) {
    return this.post(`v2/${this.accountId}/orders/batches`, this.generateResource('batches', { orders: payload }), callback);
  },
  /**
   * Record a refund for an order
   * Docs: http://developer.drip.com/#create-or-update-a-refund
   *
   * @param {object} payload - Required. An object with refund details
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  createUpdateRefund(payload, callback) {
    return this.post(`v2/${this.accountId}/refunds`, this.generateResource('refunds', payload), callback);
  }
};
