module.exports = {
  fetchUser(callback) {
    return this.get('v2/user', {}, callback);
  }
};
