module.exports = {
  /**
   * List all forms
   *
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  listForms(callback) {
    return this.get(`v2/${this.accountId}/forms`, {}, callback);
  },
  /**
   * Fetch a form
   *
   * @param {number} formId - Required. The form's id
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  fetchForm(formId, callback) {
    return this.get(`v2/${this.accountId}/forms/${formId}`, {}, callback);
  }
};
