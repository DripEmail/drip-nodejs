module.exports = {
  baseUrl: 'https://api.getdrip.com/',
  escapeString(string) {
    return encodeURIComponent(string);
  }
};
