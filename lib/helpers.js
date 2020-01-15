const MissingAttributeError = require('./errors');

module.exports = {
  baseUrl: 'https://api.getdrip.com/',
  escapeString(string) {
    return encodeURIComponent(string);
  },
  checkRequiredFields(payload, requiredFields, personRequest = false) {
    if (!requiredFields.every((prop) => prop in payload)) {
      throw new MissingAttributeError(`Fields: ${requiredFields} should all be present`);
    }

    if (!Object.prototype.hasOwnProperty.call(payload, 'email')
      && !Object.prototype.hasOwnProperty.call(payload, 'person_id')
      && personRequest) {
      throw new MissingAttributeError('An email or person_id field is required');
    }
  }
};
