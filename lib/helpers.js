module.exports = {
  baseUrl: 'https://api.getdrip.com/v2/',
  v3baseUrl: 'https://api.getdrip.com/v3/',
  escapeString(string) {
    return encodeURIComponent(string);
  }
};
