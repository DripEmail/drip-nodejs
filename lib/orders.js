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
    return this.post(`${this.accountId}/orders`, { payload }, callback);
  },
  /**
   * Record a batch of orders
   * Docs: http://developer.drip.com/#create-or-update-a-batch-of-orders
   *
   * @param {object} payload - An object of an array of multiple orders
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  createUpdateBatchOrders(payload, callback) {
    return this.post(`${this.accountId}/orders/batches`, { payload }, callback);
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
    return this.post(`${this.accountId}/refunds`, { payload }, callback);
  }
};
