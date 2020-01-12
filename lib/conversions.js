module.exports = {
  /**
   * Fetch a list of all conversions
   *
   * @param {object} options - An object with a sort property as `status`. Accepts `all`,
   *                           `disabled`, `active`
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  listConversions(options = {}, callback) {
    return this.get(`v2/${this.accountId}/goals/`, { qs: options }, callback);
  },
  /**
   * Fetch a conversion
   *
   * @param {object} conversionId - Required. The conversion id
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  fetchConversion(conversionId, callback) {
    return this.get(`v2/${this.accountId}/goals/${conversionId}`, {}, callback);
  }
};
