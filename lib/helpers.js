const MissingAttributeError = require('./errors');

module.exports = {
  baseUrl: 'https://api.getdrip.com/',
  escapeString(string) {
    return encodeURIComponent(string);
  },
  checkRequiredFields(payload, requiredFields) {
    if (!requiredFields.every((prop) => prop in payload)) {
      throw new MissingAttributeError(`Fields: ${requiredFields} should all be present`);
    }
  }
};
