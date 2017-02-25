var request = require('request');

var AUTH = "Basic aHphcXp1am5vZ24zZ2hncmVoMWE6"

function Client (token, accountId) {
  this.token = token;
  this.accountId = accountId;
  this.options = {
    url: 'https://api.getdrip.com/v2/accounts',
    headers: {
      "content-type": "application/vnd.api+json",
      "authorization": this.token
    }
  }
}

Client.prototype.getAccounts = function () {
  function callback (error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      console.log(info);
    } else {
      console.log(error);
    }
  }

  request(this.options, callback)
}

Client.prototype.getSubscriber = function (email) {
  
}

var client = new Client(AUTH, 24552245);
client.getAccounts();
