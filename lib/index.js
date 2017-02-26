var Accounts = require('./accounts');
var Subscribers = require('./subscribers');

function Client (token) {
  this.token = token;
  this.headers = {
    "content-type": "application/vnd.api+json",
    "authorization": this.token,
    "User-Agent": "Drip NodeJS Wrapper"
  }
}

// Methods for interacting with Accounts
Client.prototype.listAccounts = Accounts.listAccounts;
Client.prototype.fetchAccount = Accounts.fetchAccount;

// Methods for interacting with Subscribers
Client.prototype.listSubscribers = Subscribers.listSubscribers;
Client.prototype.updateSubscriber = Subscribers.updateSubscriber;

module.exports = Client

// Todo: create error logging function
