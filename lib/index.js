var Accounts = require('./accounts');
var Subscribers = require('./subscribers');
var Campaigns = require('./campaigns');

function Client (options) {
  if (!(this instanceof Client)) {
    return new Client(options);
  }

  this.token = options.token;
  this.headers = {
    "content-type": "application/vnd.api+json",
    "authorization": this.token,
    "User-Agent": "Drip NodeJS Wrapper"
  }
}

// Account methods
Client.prototype.listAccounts = Accounts.listAccounts;
Client.prototype.fetchAccount = Accounts.fetchAccount;

// Subscriber methods
Client.prototype.listSubscribers = Subscribers.listSubscribers;
Client.prototype.updateSubscriber = Subscribers.updateSubscriber;
Client.prototype.fetchSubscriber = Subscribers.fetchSubscriber;
Client.prototype.unsubscribeFromCampaign = Subscribers.unsubscribeFromCampaign;
Client.prototype.unsubscribeFromAllMailings = Subscribers.unsubscribeFromAllMailings;
Client.prototype.deleteSubscriber = Subscribers.deleteSubscriber;

// Campaign methods
Client.prototype.listCampaigns = Campaigns.listCampaigns;
Client.prototype.fetchCampaign = Campaigns.fetchCampaign;
Client.prototype.activateCampaign = Campaigns.activateCampaign;
Client.prototype.pauseCampaign = Campaigns.pauseCampaign;
Client.prototype.listAllSubscribesToCampaign = Campaigns.listAllSubscribesToCampaign;
Client.prototype.subscribeToCampaign = Campaigns.subscribeToCampaign;

module.exports = Client

// Todo: create error logging function
// Todo: Handle auth errors separately from server errors
