'use strict';

var request = require('request');
var helper = require('./helpers');

module.exports = {
  fetchUser: function (callback) {
    request.get(
      {
        url: helper.baseUrl + "user",
        headers: this.headers
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  }
}
