module.exports = {
  listAccounts(callback) {
    return this.get('accounts', {}, callback);
  },
  fetchAccount(accountId, callback) {
    return this.get(`accounts/${accountId}`, {}, callback);
  }
};
