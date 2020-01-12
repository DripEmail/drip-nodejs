module.exports = {
  /**
   * Fetch all accounts
   *
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  listAccounts(callback) {
    return this.get('v2/accounts', {}, callback);
  },
  /**
   * Fetch an account
   *
   * @param {number} accountId - Required. The account id
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  fetchAccount(accountId, callback) {
    return this.get(`v2/accounts/${accountId}`, {}, callback);
  }
};
