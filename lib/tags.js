'use strict';

var request = require('request');
var helper = require('./helpers');

module.exports = {
  listAllTags: function (accountId, callback) {
    request.get(
      {
        url: helper.tagsUrl(accountId),
        headers: this.headers
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  },
  // This accepts a single array of tags
  tagSubscriber: function (accountId, tags, email, callback) {
    tags.forEach(function (tag) {
      request.post(
        {
          url: helper.tagsUrl(accountId),
          headers: this.headers,
          json: true,
          body: {
            "tags": [{
              "email": email,
              "tag": tag
            }]
          }
        },
        function (error, response, body) {
          callback(error, response, body);
        }
      )
    }, this)
  },
  removeSubscriberTag: function (accountId, email, tag, callback) {
    request.del(
      {
        url: helper.baseUrl + accountId + "/subscribers/" + email + "/tags/" + tag,
        headers: this.headers
      },
      function (error, response, body) {
        callback(error, response, body);
      }
    )
  }
}
