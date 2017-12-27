module.exports = {
  listAllCustomFields(callback) {
    return this.get(`${this.accountId}/custom_field_identifiers/`, {}, callback);
  }
};
