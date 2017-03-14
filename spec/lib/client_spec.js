'use strict';

var Client = require('../../lib/index');

describe('Client', function () {
  it('should contain the correct headers', function () {
    var client = new Client({ token: 'abc123' });
    expect(client.token).toEqual('abc123');
    expect(client.headers).toEqual({
      "content-type": "application/vnd.api+json",
      "authorization": 'abc123',
      "User-Agent": "Drip NodeJS Wrapper"
    });
  });

  it('should return a client instance with all methods', function () {
    var client = new Client({ token: 'abc123' });

    // Custom fields
    expect(typeof client.listAllCustomFields).toEqual('function');

    // Events
    expect(typeof client.recordEvent).toEqual('function');
    expect(typeof client.recordBatchEvents).toEqual('function');
    expect(typeof client.listEventActions).toEqual('function');

    // Forms
    expect(typeof client.listForms).toEqual('function');
    expect(typeof client.fetchForm).toEqual('function');

    // Purchases
    expect(typeof client.createPurchase).toEqual('function');
    expect(typeof client.listPurchases).toEqual('function');
    expect(typeof client.fetchPurchase).toEqual('function');

    // Subscribers
    expect(typeof client.listSubscribers).toEqual('function');
    expect(typeof client.updateSubscriber).toEqual('function');
    expect(typeof client.fetchSubscriber).toEqual('function');
    expect(typeof client.unsubscribeFromCampaign).toEqual('function');
    expect(typeof client.unsubscribeFromAllMailings).toEqual('function');
    expect(typeof client.deleteSubscriber).toEqual('function');

    // Tags
    expect(typeof client.listAllTags).toEqual('function');
    expect(typeof client.tagSubscriber).toEqual('function');
    expect(typeof client.removeSubscriberTag).toEqual('function');

    // User
    expect(typeof client.fetchUser).toEqual('function');

    // Webhooks
    expect(typeof client.listWebhooks).toEqual('function');
    expect(typeof client.fetchWebhook).toEqual('function');
    expect(typeof client.createWebhook).toEqual('function');
    expect(typeof client.destroyWebhook).toEqual('function');

    // Workflows
    expect(typeof client.listAllWorkflows).toEqual('function');
    expect(typeof client.fetchWorkflow).toEqual('function');
    expect(typeof client.activateWorkflow).toEqual('function');
    expect(typeof client.pauseWorkflow).toEqual('function');
    expect(typeof client.startOnWorkflow).toEqual('function');
    expect(typeof client.removeFromWorkflow).toEqual('function');

    // Workflow triggers
    expect(typeof client.listTriggers).toEqual('function');
    expect(typeof client.createTrigger).toEqual('function');
    expect(typeof client.updateTrigger).toEqual('function');
  });
});
