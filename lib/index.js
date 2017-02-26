var getAccounts = require('./accounts');
var getSubscriber = require('./subscribers')

function Client (url, token) {
  this.url = url;
  this.token = token;
  this.headers = {
    "content-type": "application/vnd.api+json",
    "authorization": this.token
  }
}

Client.prototype.getAccounts = getAccounts;
Client.prototype.getSubscriber = getSubscriber;

module.exports = Client
