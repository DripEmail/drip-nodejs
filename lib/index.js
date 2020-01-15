const requestPromise = require('request-promise');

// Resources
const Accounts = require('./accounts');
const Broadcasts = require('./broadcasts');
const Campaigns = require('./campaigns');
const Conversions = require('./conversions.js');
const Events = require('./events');
const Fields = require('./custom_fields');
const Forms = require('./forms');
const Orders = require('./orders');
const ShopperActivity = require('./shopper_activity');
const Subscribers = require('./subscribers');
const Subscriptions = require('./subscriptions');
const Tags = require('./tags');
const Triggers = require('./workflow_triggers');
const Users = require('./users');
const Webhooks = require('./webhooks');
const Workflows = require('./workflows');

// Utilities
const helper = require('./helpers');
const VERSION = require('./version');

class Client {
  constructor(options) {
    this.accountId = options.accountId;
    this.tokenType = options.tokenType || 'Basic';
    this.token = options.token;

    if (this.tokenType === 'Basic') {
      // Encode the token before setting headers
      this.token = Buffer.from(options.token).toString('base64');
    }
  }

  requestHeaders() {
    return {
      'Content-Type': 'application/json',
      authorization: `${this.tokenType} ${this.token}`,
      'User-Agent': `Drip NodeJS Wrapper ${VERSION}`
    };
  }

  request(requestOptions, callback) {
    if (callback) {
      return requestPromise(requestOptions).then((response) => {
        const { body } = response;
        callback(null, response, body);
      }).catch((error) => {
        callback(error, null, null);
      });
    }
    return requestPromise(requestOptions);
  }

  generateResource(key, ...args) {
    return { [key]: args };
  }

  get(url, data, callback) {
    return this.request({
      method: 'GET',
      headers: this.requestHeaders(),
      uri: helper.baseUrl + url,
      qs: data.qs,
      json: true,
      resolveWithFullResponse: true
    }, callback);
  }

  post(url, data, callback) {
    return this.request({
      method: 'POST',
      headers: this.requestHeaders(),
      uri: helper.baseUrl + url,
      body: data,
      qs: data.qs,
      json: true,
      resolveWithFullResponse: true
    }, callback);
  }

  del(url, data, callback) {
    return this.request({
      method: 'DELETE',
      headers: this.requestHeaders(),
      uri: helper.baseUrl + url,
      json: true,
      resolveWithFullResponse: true
    }, callback);
  }

  put(url, data, callback) {
    return this.request({
      method: 'PUT',
      headers: this.requestHeaders(),
      uri: helper.baseUrl + url,
      body: data,
      qs: data.qs,
      json: true,
      resolveWithFullResponse: true
    }, callback);
  }
}

// Account methods
Client.prototype.listAccounts = Accounts.listAccounts;
Client.prototype.fetchAccount = Accounts.fetchAccount;

// Broadcast methods
Client.prototype.listBroadcasts = Broadcasts.listBroadcasts;
Client.prototype.fetchBroadcast = Broadcasts.fetchBroadcast;

// Campaign methods
Client.prototype.listCampaigns = Campaigns.listCampaigns;
Client.prototype.fetchCampaign = Campaigns.fetchCampaign;
Client.prototype.activateCampaign = Campaigns.activateCampaign;
Client.prototype.pauseCampaign = Campaigns.pauseCampaign;
Client.prototype.listAllSubscribesToCampaign = Campaigns.listAllSubscribesToCampaign;
Client.prototype.subscribeToCampaign = Campaigns.subscribeToCampaign;

// Campaign subscrpition methods
Client.prototype.subscriberCampaignSubscriptions = Subscriptions.subscriberCampaignSubscriptions;

// Conversion methods
Client.prototype.listConversions = Conversions.listConversions;
Client.prototype.fetchConversion = Conversions.fetchConversion;

// Custom field methods
Client.prototype.listAllCustomFields = Fields.listAllCustomFields;

// Event methods
Client.prototype.recordEvent = Events.recordEvent;
Client.prototype.recordBatchEvents = Events.recordBatchEvents;
Client.prototype.listEventActions = Events.listEventActions;

// Form methods
Client.prototype.listForms = Forms.listForms;
Client.prototype.fetchForm = Forms.fetchForm;

// Order methods
Client.prototype.createUpdateOrder = Orders.createUpdateOrder;
Client.prototype.createUpdateBatchOrders = Orders.createUpdateBatchOrders;
Client.prototype.createUpdateRefund = Orders.createUpdateRefund;

// Shopper Activity
Client.prototype.createUpdateCartActivity = ShopperActivity.createUpdateCartActivity;
Client.prototype.createUpdateOrderActivity = ShopperActivity.createUpdateOrderActivity;
Client.prototype.createUpdateProductActivity = ShopperActivity.createUpdateProductActivity;

// Subscriber methods
Client.prototype.listSubscribers = Subscribers.listSubscribers;
Client.prototype.createUpdateSubscriber = Subscribers.createUpdateSubscriber;
Client.prototype.fetchSubscriber = Subscribers.fetchSubscriber;
Client.prototype.unsubscribeFromCampaign = Subscribers.unsubscribeFromCampaign;
Client.prototype.unsubscribeFromAllMailings = Subscribers.unsubscribeFromAllMailings;
Client.prototype.deleteSubscriber = Subscribers.deleteSubscriber;
Client.prototype.updateBatchSubscribers = Subscribers.updateBatchSubscribers;
Client.prototype.unsubscribeBatchSubscribers = Subscribers.unsubscribeBatchSubscribers;

// Tag methods
Client.prototype.listAllTags = Tags.listAllTags;
Client.prototype.tagSubscriber = Tags.tagSubscriber;
Client.prototype.removeSubscriberTag = Tags.removeSubscriberTag;

// User methods
Client.prototype.fetchUser = Users.fetchUser;

// Webhook methods
Client.prototype.listWebhooks = Webhooks.listWebhooks;
Client.prototype.fetchWebhook = Webhooks.fetchWebhook;
Client.prototype.createWebhook = Webhooks.createWebhook;
Client.prototype.destroyWebhook = Webhooks.destroyWebhook;

// Workflow methods
Client.prototype.listAllWorkflows = Workflows.listAllWorkflows;
Client.prototype.fetchWorkflow = Workflows.fetchWorkflow;
Client.prototype.activateWorkflow = Workflows.activateWorkflow;
Client.prototype.pauseWorkflow = Workflows.pauseWorkflow;
Client.prototype.startOnWorkflow = Workflows.startOnWorkflow;
Client.prototype.removeFromWorkflow = Workflows.removeFromWorkflow;

// Workflow trigger methods
Client.prototype.listTriggers = Triggers.listTriggers;
Client.prototype.createTrigger = Triggers.createTrigger;
Client.prototype.updateTrigger = Triggers.updateTrigger;

function init(options) {
  const client = new Client(options);
  return client;
}

module.exports = init;
