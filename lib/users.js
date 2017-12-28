module.exports = {
  fetchUser(callback) {
    return this.get('user', {}, callback);
  }
};
