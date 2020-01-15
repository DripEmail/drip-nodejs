module.exports = {
  /**
   * Record an event for a subscriber
   *
   * @param {object} payload - An object with event and subscriber properties
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  recordEvent(payload, callback) {
    return this.post(`v2/${this.accountId}/events`, this.generateResource('events', payload), callback);
  },
  /**
   * Record a batch of events
   *
   * @param {object} payload - An array of event objects with at least
   *                           an action and subscriber emails
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  recordBatchEvents(payload, callback) {
    return this.post(`v2/${this.accountId}/events/batches`, this.generateResource('batches', { events: payload }), callback);
  },
  /**
   * Fetch a list of all event actions
   *
   * @param {object} options - An object with `page` and `per_page` properties
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  listEventActions(options = {}, callback) {
    return this.get(`v2/${this.accountId}/event_actions/`, { qs: options }, callback);
  }
};
