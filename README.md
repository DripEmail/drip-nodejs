[![Build Status](https://travis-ci.org/samudary/drip-nodejs.svg?branch=master)](https://travis-ci.org/samudary/drip-nodejs)

# Drip Rest API Wrapper for Node.js

A complete Nodejs wrapper for the Drip REST API.

## How to install

`npm install drip-nodejs --save`

## NOTE: Potential Breaking Changes for Version 3.0.0

Drip's documentation doesn't explicitly describe the required schema for each endpoint. In versions prior to 3 you would need to explicitly pass payloads with the required schema, which aren't obvious. In version 3 and later, I've attempted to make this a bit simpler. For example, batch endpoints will now only need you to pass an array of objects as:

```js
payload = [
  {
    email: 'user@example.com',
    action: 'Purchased'
  },
  {
    email: 'user@example.com',
    action: 'Purchased'
  }
]
// client.recordBatchEvents(payload, ...)
```

Prior to v3 changes you would need to do something like the following where the entire payload structure is defined:

```js
payload = {
  batches: [
    {
      events: [
        {
          email: 'user@example.com',
          action: 'Purchased'
        },
        {
          email: 'user@example.com',
          action: 'Purchased'
        }
      ]
    }
  ]
}
// client.recordBatchEvents(payload, ...)
```

This should help to get up and running simpler without much knowledge of the required schema. **However, existing users will need to take special note of these changes**.

## Authentication

For private use and integrations, use your API Token found [here](https://www.getdrip.com/user/edit). Create a new instance of the client library with:

`const client = require('drip-nodejs')({ token: YOUR_API_KEY, accountId: YOUR_ACCOUNT_ID });`

For public integrations with an OAuth2 application registered with Drip, you'll need to specify the type of token you're passing (e.g. "Bearer"):

`const client = require('drip-nodejs')({ token: YOUR_ACCESS_TOKEN, tokenType: TOKEN_TYPE, accountId: YOUR_ACCOUNT_ID });`

You'll need your Drip Account ID when requiring the client which can be found [here](https://www.getdrip.com/settings/general) in your Drip account.

## Usage

The following methods are currently available on the client instance. You can find a detailed explanation of all methods and their effect on resources in your Drip account [here](https://www.getdrip.com/docs/rest-api).

**Note:** All methods except `updateBatchSubscribers` return promises and support an optional asynchronous callback. The batch subscribers method only supports callbacks for now.

### Accounts
| Action                               | Method                                                                       |
|--------------------------------------|------------------------------------------------------------------------------|
| List all accounts                    | `client.listAccounts(callback)`                                              |
| Fetch an account                     | `client.fetchAccount(accountId, callback)`                                   |

### Broadcasts
| Action                               | Method                                                                       |
|--------------------------------------|------------------------------------------------------------------------------|
| List broadcasts                      | `client.listBroadcasts(options = {}, callback)`                              |
| Fetch a broadcast                    | `client.fetchBroadcast(broadcastId, callback)`                               |

### Campaigns
| Action                               | Method                                                                       |
|--------------------------------------|------------------------------------------------------------------------------|
| List all campaigns                   | `client.listCampaigns(options = {}, callback)`                               |
| Fetch a campaign                     | `client.fetchCampaign(campaignId, callback)`                                 |
| Activate a campaign                  | `client.activateCampaign(campaignId, callback)`                              |
| Pause a campaign                     | `client.pauseCampaign(campaignId, callback)`                                 |
| List specific campaign's subscribers | `client.listAllSubscribesToCampaign(campaignId, options = {}, callback)`                   |
| Subscribe to a campaign              | `client.subscribeToCampaign(campaignId, payload, callback)`                  |

### Campaign subscriptions
| Action                               | Method                                                                       |
|--------------------------------------|------------------------------------------------------------------------------|
| List campaign subscriptions          | `client.subscriberCampaignSubscriptions(subscriberId, callback)`             |

### Conversions
| Action                               | Method                                                                       |
|--------------------------------------|------------------------------------------------------------------------------|
| List all conversions                 | `client.listConversions(options = {}, callback)`                             |
| Fetch a conversion                   | `client.fetchConversion(conversionId, callback)`                             |

### Custom fields
| Action                               | Method                                                                       |
|--------------------------------------|------------------------------------------------------------------------------|
| List all custom fields               | `client.listAllCustomFields(callback)`                                       |

### Events
| Action                               | Method                                                                       |
|--------------------------------------|------------------------------------------------------------------------------|
| Record an event                      | `client.recordEvent(payload, callback)`                                      |
| Record a batch of events             | `client.recordBatchEvents(payload, callback)`                                |
| List all events in account           | `client.listEventActions(options = {}, callback)`                            |

### Forms
| Action                               | Method                                                                       |
|--------------------------------------|------------------------------------------------------------------------------|
| List all forms                       | `client.listForms(callback)`                                                 |
| Fetch a form                         | `client.fetchForm(formId, callback)`                                         |

**Note:** The beta purchases endpoint has been deprecated and its methods have been removed from the package except `createPurchase`, which now sends requests to the Order creation endpoint [here](https://developer.drip.com/#orders).

### Orders
| Action                               | Method                                                                       |
|--------------------------------------|------------------------------------------------------------------------------|
| Record an order for a subscriber     | `client.createUpdateOrder(payload, callback)`                                |
| Record a batch of orders             | `client.createUpdateBatchOrders(payload, callback)`                          |
| Record a refund for an order         | `client.createUpdateRefund(payload, callback)`                               |

### Shopper Activity
| Action                               | Method                                                                       |
|--------------------------------------|------------------------------------------------------------------------------|
| Create or update a cart for a customer | `client.createUpdateCartActivity(payload, callback)`                       |
| Create or update an order for a customer | `client.createUpdateOrderActivity(payload, callback)`                    |
| Create or update a product | `client.createUpdateProductActivity(payload, callback)`                                |

### Subscribers
| Action                               | Method                                                                       |
|--------------------------------------|------------------------------------------------------------------------------|
| List all subscribers                 | `client.listSubscribers(options = {}, callback)`                             |
| Update a subscriber                  | `client.createUpdateSubscriber(payload, callback)`                           |
| Fetch a subscriber                   | `client.fetchSubscriber(idOrEmail, callback)`                                |
| Unsubscribe from a campaign          | `client.unsubscribeFromCampaign(idOrEmail, campaignId, callback)`            |
| Unsubscribe from all mailings        | `client.unsubscribeFromAllMailings(idOrEmail, callback)`                     |
| Delete a subscriber                  | `client.deleteSubscriber(idOrEmail, callback)`                               |
| Update a batch of subscribers        | `client.updateBatchSubscribers(payload, callback)`                           |
| Unsubscribe a batch of subscribers   | `client.unsubscribeBatchSubscribers(payload, callback)`                      |

### Tags
| Action                               | Method                                                                       |
|--------------------------------------|------------------------------------------------------------------------------|
| List all tags                        | `client.listAllTags(callback)`                                               |
| Tag a subscriber                     | `client.tagSubscriber(payload, callback)`                                    |
| Remove tag from subscriber           | `client.removeSubscriberTag(email, tag, callback)`                           |

### User
| Action                               | Method                                                                       |
|--------------------------------------|------------------------------------------------------------------------------|
| Fetch authenticated user             | `client.fetchUser(callback)`                                                 |

### Webhooks
| Action                               | Method                                                                       |
|--------------------------------------|------------------------------------------------------------------------------|
| List all webhooks                    | `client.listWebhooks(callback)`                                              |
| Fetch a webhook                      | `client.fetchWebhook(webhookId, callback)`                                   |
| Create a webhook                     | `client.createWebhook(payload, callback)`                                    |
| Destroy a webhook                    | `client.destroyWebhook(webhookId, callback)`                                 |

### Workflows
| Action                               | Method                                                                       |
|--------------------------------------|------------------------------------------------------------------------------|
| List all workflows                   | `client.listAllWorkflows(options = {}, callback)`                            |
| Fetch a workflow                     | `client.fetchWorkflow(workflowId, callback)`                                 |
| Activate a workflow                  | `client.activateWorkflow(workflowId, callback)`                              |
| Pause a workflow                     | `client.pauseWorkflow(workflowId, callback)`                                 |
| Start a subscriber on a workflow     | `client.startOnWorkflow(workflowId, payload, callback)`                      |
| Remove a subscriber from a workflow  | `client.removeFromWorkflow(workflowId, idOrEmail, callback)`                 |

### Workflow triggers
| Action                               | Method                                                                       |
|--------------------------------------|------------------------------------------------------------------------------|
| List all workflow triggers           | `client.listTriggers(workflowId, callback)`                                  |
| Create a workflow trigger            | `client.createTrigger(workflowId, payload, callback)`                        |
| Update a trigger                     | `client.updateTrigger(workflowId, triggerId, payload, callback)`             |

See the official [REST API docs](https://www.getdrip.com/docs/rest-api) for a complete API reference.

## Examples

### Listing subscribers

The `listSubscribers` accepts an optional object of filter arguments. Refer to Drip's API docs for all the available filters.

```javascript
/**
 * Using a promise
 */

const options = {
  status: "unsubscribed",
  page: 2
  // or with more options
};

client.listSubscribers(options)
  .then((response) => {
    // do something with the raw response object or with `response.body`
  })
  .catch((error) => {
    // do something with the error
  });

/**
 * Using a callback
 */

client.listSubscribers(options, (error, response, body) => {
  // do someting with the response or handle errors
});
```

### Updating a batch of subscribers

The `updateBatchSubscribers` method takes a batch object for the payload and is most suitable for sending thousands of subscriber updates.

Because Drip's batch APIs support a maximum of 1000 records, this method breaks the payload into *N* "batches" and calls the API *N* times. The callback is invoked only after all batches' API calls have returned, and receives *N*-sized arrays for values (i.e. `errors`, `responses`, and `bodies`).

It is the responsibility of the caller to interpret these values and handle any errors.

```javascript
var batch = {
  "batches": [{
    "subscribers": [
      {
        "email": "john@acme.com",
        "tags": "Dog Person"
      },
      {
        "email": "joe@acme.com",
        "tags": "Cat Person"
      }
      // Lots more subscribers...
    ]
  }]
}

client.updateBatchSubscribers(batch, function (errors, responses, bodies) {
  // Do stuff
  }
)
```

### Sending a batch of events

The `recordBatchEvents` methods takes a batch object for the payload and is most suitable for sending thousands of events. **Note** that the batch events method will not break up the payload into nice chunks like the subscribers batch method. This will be handled in a future update.

```javascript
var batch = {
  "batches": [{
    "events": [
      {
        "email": "john@acme.com",
        "action": "Opened a door"
      },
      {
        "email": "joe@acme.com",
        "action": "Closed a door"
      }
      // Lots more events...
    ]
  }]
}

client.recordBatchEvents(batch, function (error, response, body) {
  // Do stuff
  }
)
```

## Contributing

1. Fork it ( https://github.com/samudary/drip-nodejs/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

Note: Jasmine is used for testing
