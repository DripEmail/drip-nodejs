module.exports = {
  /**
   * Record an order for a subscriber
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
   *
   * @param {string} orderId - The order's unique ID in Drip
   * @param {object} payload - An object with refund details
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  createUpdateRefund(orderId, payload, callback) {
    return this.post(`${this.accountId}/orders/${orderId}/refunds`, { payload }, callback);
  }
};
