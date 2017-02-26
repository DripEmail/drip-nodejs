'use strict';

module.exports = {
  callback: function (error, response, body) {
    var result = JSON.parse(body);

    if (!error && response.statusCode == 200) {
      console.log(result);
    } else {
      console.log("Error code: " + response.statusCode + " - " + result.errors[0].message);
    }
  },
  baseUrl: 'https://api.getdrip.com/v2/'
}
