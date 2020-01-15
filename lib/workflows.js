const helpers = require('./helpers');

module.exports = {
  /**
   * Fetch a list of all workflows
   *
   * @param {object} options - An object with a sort property as `status`. Accepts `all`,
   *                           `draft`, `active`, `paused`
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  listAllWorkflows(options = {}, callback) {
    return this.get(`v2/${this.accountId}/workflows/`, { qs: options }, callback);
  },
  /**
   * Fetch a workflow
   *
   * @param {number} workflowId - Required. The workflow's id
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  fetchWorkflow(workflowId, callback) {
    return this.get(`v2/${this.accountId}/workflows/${workflowId}`, {}, callback);
  },
  /**
   * Activate a workflow
   *
   * @param {number} workflowId - Required. The workflow's id
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  activateWorkflow(workflowId, callback) {
    return this.post(`v2/${this.accountId}/workflows/${workflowId}/activate`, {}, callback);
  },
  /**
   * Pause a workflow
   *
   * @param {number} workflowId - Required. The workflow's id
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  pauseWorkflow(workflowId, callback) {
    return this.post(`v2/${this.accountId}/workflows/${workflowId}/pause`, {}, callback);
  },
  /**
   * Start a subscriber on a workflow
   *
   * @param {number} workflowId - Required. The workflow's id
   * @param {object} payload - Required. The subscriber's details
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  startOnWorkflow(workflowId, payload, callback) {
    return this.post(`v2/${this.accountId}/workflows/${workflowId}/subscribers`, this.generateResource('subscribers', payload), callback);
  },
  /**
   * Start a subscriber on a workflow
   *
   * @param {number} workflowId - Required. The workflow's id
   * @param {string} idOrEmail - The subscriber's email or id
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  removeFromWorkflow(workflowId, idOrEmail, callback) {
    const encodedIdOrEmail = helpers.escapeString(idOrEmail);
    return this.del(`v2/${this.accountId}/workflows/${workflowId}/subscribers/${encodedIdOrEmail}`, {}, callback);
  }
};
