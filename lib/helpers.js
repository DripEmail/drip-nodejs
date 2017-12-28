module.exports = {
  baseUrl: 'https://api.getdrip.com/v2/',
  escapeString(string) {
    return encodeURIComponent(string);
  }
};
