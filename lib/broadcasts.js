module.exports = {
  /**
   * Fetch a list of all broadcasts
   *
   * @param {object} options - An object with a sort property as `status`. Accepts `all`,
   *                           `draft`, `scheduled`, `sent`
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  listBroadcasts(options, callback) {
    return this.get(
      `${this.accountId}/broadcasts/`,
      { qs: { status: options.status } },
      callback
    );
  },
  /**
   * Fetch a broadcast
   *
   * @param {number} broadcastId - Required. The broadcast id
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  fetchBroadcast(broadcastId, callback) {
    return this.get(`${this.accountId}/broadcasts/${broadcastId}`, {}, callback);
  }
};
