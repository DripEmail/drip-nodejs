const helpers = require('./helpers');

module.exports = {
  /**
   * Fetch a list of all tags
   *
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  listAllTags(callback) {
    return this.get(`v2/${this.accountId}/tags`, {}, callback);
  },
  /**
   * Tag a subscriber
   *
   * @param {callback} callback - An optional callback
   * @param {object} payload - An object with the subscriber's email and tag
   * @returns {promise}
   */
  tagSubscriber(payload, callback) {
    return this.post(`v2/${this.accountId}/tags`, this.generateResource('tags', payload), callback);
  },
  /**
   * Remove a tag from a subscriber
   *
   * @param {string} email - The subscriber's email
   * @param {string} tag - The tag to be removed
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  removeSubscriberTag(email, tag, callback) {
    const encodedEmail = helpers.escapeString(email);
    const encodedTag = helpers.escapeString(tag);
    return this.del(`v2/${this.accountId}/subscribers/${encodedEmail}/tags/${encodedTag}`, {}, callback);
  }
};
