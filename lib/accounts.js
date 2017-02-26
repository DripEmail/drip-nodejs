"use strict";

var request = require('request');

module.exports = function () {
  function callback (error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      console.log(info);
    } else {
      console.log(error);
    }
  }
  
  request( { url: this.url, headers: this.headers }, callback)
}
