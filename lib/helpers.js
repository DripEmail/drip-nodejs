module.exports = {
  baseUrl: 'https://api.getdrip.com/v2/',
  escapeIdOrEmail(string) {
    return encodeURIComponent(string);
  }
};
