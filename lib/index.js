var Accounts = require('./accounts');
var Subscribers = require('./subscribers');
var Campaigns = require('./campaigns');
var Subscriptions = require('./subscriptions');
var Events = require('./events');
var Tags = require('./tags');
var Fields = require('./custom_fields');
var Workflows = require('./workflows');

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

// Campaign subscrpition methods
Client.prototype.subscriberCampaignSubscriptions = Subscriptions.subscriberCampaignSubscriptions;

// Event methods
Client.prototype.recordEvent = Events.recordEvent;
Client.prototype.recordBatchEvents = Events.recordBatchEvents;
Client.prototype.listEventActions = Events.listEventActions;

// Tag methods
Client.prototype.listAllTags = Tags.listAllTags;
Client.prototype.tagSubscriber = Tags.tagSubscriber;
Client.prototype.removeSubscriberTag = Tags.removeSubscriberTag;

// Custom field methods
Client.prototype.listAllCustomFields = Fields.listAllCustomFields;

// Workflow methods
Client.prototype.listAllWorkflows = Workflows.listAllWorkflows;
Client.prototype.fetchWorkflow = Workflows.fetchWorkflow;
Client.prototype.activateWorkflow = Workflows.activateWorkflow;
Client.prototype.pauseWorkflow = Workflows.pauseWorkflow;
Client.prototype.startOnWorkflow = Workflows.startOnWorkflow;
Client.prototype.removeFromWorkflow = Workflows.removeFromWorkflow;

module.exports = Client

// Todo: create error logging function
// Todo: Handle auth errors separately from server errors
