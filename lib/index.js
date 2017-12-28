"use strict";

const Accounts = require('./accounts');
const Broadcasts = require('./broadcasts');
const Campaigns = require('./campaigns');
const Conversions = require('./conversions.js');
const Events = require('./events');
const Fields = require('./custom_fields');
const Forms = require('./forms');
const Purchases = require('./purchases');
const Subscribers = require('./subscribers');
const Subscriptions = require('./subscriptions');
const Tags = require('./tags');
const Triggers = require('./workflow_triggers');
const Users = require('./users');
const Workflows = require('./workflows');
const Webhooks = require('./webhooks');

// Utilities
const helper = require("./helpers");
const requestPromise = require('request-promise');
const VERSION = require("./version");

function Client (options) {
  if (!(this instanceof Client)) {
    return new Client(options);
  }

  let accountId = this.accountId = options.accountId;
  let token = this.token = options.token;
  let tokenType = options.tokenType || "Basic";
  if(tokenType === "Basic") {
    // Encode the token before setting headers
    token = new Buffer(this.token).toString('base64');
  }

  this.headers = {
    "content-type": "application/vnd.api+json",
    "authorization": tokenType + " " + token,
    "User-Agent": `Drip NodeJS Wrapper ${VERSION}`
  }

  this.request = function(options, callback) {
    if (callback) {
      requestPromise(options).then(function (response) {
        var body = response.body;
        callback(null, response, body);
      }).catch(function (error) {
        callback(error, null, null);
      })
    } else {
      return requestPromise(options);
    }
  }

  this.get = function(url, data, callback) {
    return this.request({
      method: "GET",
      headers: this.headers,
      uri: helper.baseUrl + url,
      body: data.payload,
      qs: data.qs,
      json: true,
      resolveWithFullResponse: true
    }, callback);
  }

  this.post = function (url, data, callback) {
    return this.request({
      method: "POST",
      headers: this.headers,
      uri: helper.baseUrl + url,
      body: data.payload,
      qs: data.qs,
      json: true,
      resolveWithFullResponse: true
    }, callback);
  }

  this.delete = function (url, data, callback) {
    return this.request({
      method: "DELETE",
      headers: this.headers,
      uri: helper.baseUrl + url,
      json: true,
      resolveWithFullResponse: true
    }, callback);
  }

  this.put = function (url, data, callback) {
    return this.request({
      method: "PUT",
      headers: this.headers,
      uri: helper.baseUrl + url,
      body: data.payload,
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

// Purchases methods
Client.prototype.createPurchase = Purchases.createPurchase;
Client.prototype.listPurchases = Purchases.listPurchases;
Client.prototype.fetchPurchase = Purchases.fetchPurchase;

// Subscriber methods
Client.prototype.listSubscribers = Subscribers.listSubscribers;
Client.prototype.updateSubscriber = Subscribers.updateSubscriber;
Client.prototype.fetchSubscriber = Subscribers.fetchSubscriber;
Client.prototype.unsubscribeFromCampaign = Subscribers.unsubscribeFromCampaign;
Client.prototype.unsubscribeFromAllMailings = Subscribers.unsubscribeFromAllMailings;
Client.prototype.deleteSubscriber = Subscribers.deleteSubscriber;
Client.prototype.updateBatchSubscribers = Subscribers.updateBatchSubscribers;

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
Client.prototype.updateTrigger = Triggers.updateTrigger; // <- To do: Revisit this

module.exports = Client

// Todo: create error logging function
// Todo: Handle auth errors separately from server errors
