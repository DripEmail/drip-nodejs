module.exports = {
  /**
   * Fetch a list of all of a workflow's triggers
   *
   * @param {number} workflowId - Required. The workflow's id
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  listTriggers(workflowId, callback) {
    return this.get(`v2/${this.accountId}/workflows/${workflowId}/triggers`, {}, callback);
  },
  /**
   * Create a workflow trigger
   *
   * @param {number} workflowId - Required. The workflow's id
   * @param {object} payload - An object with the workflow trigger details
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  createTrigger(workflowId, payload, callback) {
    return this.post(`v2/${this.accountId}/workflows/${workflowId}/triggers`, this.generateResource('triggers', payload), callback);
  },
  /**
   * Update a workflow trigger
   *
   * @param {number} workflowId - Required. The workflow's id
   * @param {number} workflowTriggerId - Required. The workflow's trigger id
   * @param {object} payload - An object with the workflow trigger details
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  updateTrigger(workflowId, workflowTriggerId, payload, callback) {
    return this.put(`v2/${this.accountId}/workflows/${workflowId}/triggers/${workflowTriggerId}`, this.generateResource('triggers', payload), callback);
  }
};
