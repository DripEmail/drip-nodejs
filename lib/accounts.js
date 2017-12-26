'use strict';

module.exports = {
  listAccounts: function(callback) {
    return this.get("accounts", {}, callback);
  },
  fetchAccount: function (accountId, callback) {
    return this.get(`accounts/${accountId}`, {}, callback);
  }
}
