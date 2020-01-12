module.exports = {
  /**
   * Fetch a list of all custom field identifiers
   *
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  listAllCustomFields(callback) {
    return this.get(`v2/${this.accountId}/custom_field_identifiers/`, {}, callback);
  }
};
