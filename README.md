[![Build Status](https://travis-ci.org/samudary/drip-nodejs.svg?branch=master)](https://travis-ci.org/samudary/drip-nodejs)

# Drip Rest API Wrapper for Node.js

A complete Nodejs wrapper for the Drip REST API.

## How to install

`npm install drip-nodejs --save`

## Authentication

For private use and integrations, use your API Token found [here](https://www.getdrip.com/user/edit). Create a new instance of the client library with:

`var client = require('drip-nodejs')({ token: YOUR_API_KEY });`

For public integrations with an OAuth2 application registered with Drip, you'll need to specify the type of token you're passing (e.g. "Bearer"):

`var client = require('drip-nodejs')({ token: YOUR_ACCESS_TOKEN, tokenType: TOKEN_TYPE });`

For most API methods, you'll need your Drip Account ID found [here](https://www.getdrip.com/settings/general). Most client methods accept an account ID argument which allows interaction with any account maintained in your Drip account.

## Usage

The following methods are currently available on the client instance. You can find a detailed explanation of all methods and their effect on resources in your Drip account [here](https://www.getdrip.com/docs/rest-api).

### Accounts
| Action                               | Method                                                                       |
|--------------------------------------|------------------------------------------------------------------------------|
| List all accounts                    | `client.listAccounts(callback)`                                                  |
| Fetch an account                     | `client.fetchAccount(account_id, callback)`                                      |

### Broadcats
| Action                               | Method                                                                       |
|--------------------------------------|------------------------------------------------------------------------------|
| List broadcasts                      | `client.listBroadcasts(accountId, callback, status)`                         |
| Fetch a broadcast                    | `client.fetchBroadcast(accountId, broadcastId, callback)`                    |

### Campaigns
| Action                               | Method                                                                       |
|--------------------------------------|------------------------------------------------------------------------------|
| List all campaigns                   | `client.listCampaigns(accountId, callback, status)`                          |
| Fetch a campaign                     | `client.fetchCampaign(accountId, campaignId, callback)`                      |
| Activate a campaign                  | `client.activateCampaign(accountId, campaignId, callback)`                   |
| Pause a campaign                     | `client.pauseCampaign(accountId, campaignId, callback)`                      |
| List specific campaign's subscribers | `client.listAllSubscribesToCampaign(accountId, campaignId, callback)`        |
| Subscribe to a campaign              | `client.subscribeToCampaign(accountId, campaignId, payload, callback)`       |

### Campaign subscriptions
| Action                               | Method                                                                       |
|--------------------------------------|------------------------------------------------------------------------------|
| List campaign subscriptions          | `client.subscriberCampaignSubscriptions(accountId, subscriberId, callback)`  |

### Conversions
| Action                               | Method                                                                       |
|--------------------------------------|------------------------------------------------------------------------------|
| List all conversions                 | `client.listConversions(accountId, callback, status)`                        |
| Fetch a conversion                   | `client.fetchConversion(accountId, conversionId, callback)`                  |

### Custom fields
| Action                               | Method                                                                       |
|--------------------------------------|------------------------------------------------------------------------------|
| List all custom fields               | `client.listAllCustomFields(accountId, callback)`                            |

### Events
| Action                               | Method                                                                       |
|--------------------------------------|------------------------------------------------------------------------------|
| Record an event                      | `client.recordEvent(accountId, payload, callback)`                           |
| Record a batch of events             | `client.recordBatchEvents(accountId, payload, callback)`                     |
| List all events in account           | `client.listEventActions(accountId, callback, options)`                      |

### Forms
| Action                               | Method                                                                       |
|--------------------------------------|------------------------------------------------------------------------------|
| List all forms                       | `client.listForms(accountId, callback)`                                      |
| Fetch a form                         | `client.fetchForm(accountId, formId, callback)`                              |

### Purchases
| Action                               | Method                                                                       |
|--------------------------------------|------------------------------------------------------------------------------|
| List all purchases                   | `client.listPurchases(accountId, emailOrId, callback)`                       |
| Create a purchase                    | `client.createPurchase(accountId, emailOrId, payload, callback)`             |
| Fetch a purchase                     | `client.fetchPurchase(accountId, emailOrId, purchaseId, callback)`           |

### Subscribers
| Action                               | Method                                                                       |
|--------------------------------------|------------------------------------------------------------------------------|
| List all subscribers                 | `client.listSubscribers(accountId, callback)`                                |
| Update a subscriber                  | `client.updateSubscriber(accountId, payload, callback)`               |
| Fetch a subscriber                   | `client.fetchSubscriber(accountId, emailOrId, callback)`                     |
| Unsubscribe from a campaign          | `client.unsubscribeFromCampaign(accountId, emailOrId, campaignId, callback)` |
| Unsubscribe from all mailings        | `client.unsubscribeFromAllMailings(accountId, emailOrId, callback)`          |
| Delete a subscriber                  | `client.deleteSubscriber(accountId, emailOrId, callback)`                    |
| Update a batch of subscribers        | `client.updateBatchSubscribers(accountId, payload, callback)`                |

### Tags
| Action                               | Method                                                                       |
|--------------------------------------|------------------------------------------------------------------------------|
| List all tags                        | `client.listAllTags(accountId, callback)`                                    |
| Tag a subscriber                     | `client.tagSubscriber(accountId, tags, email, callback)`                     |
| Remove tag from subscriber           | `client.removeSubscriberTag(accountId, email, tag, callback)`                |

### User
| Action                               | Method                                                                       |
|--------------------------------------|------------------------------------------------------------------------------|
| Fetch authenticated user             | `client.fetchUser(callback)`                                                 |

### Webhooks
| Action                               | Method                                                                       |
|--------------------------------------|------------------------------------------------------------------------------|
| List all webhooks                    | `client.listWebhooks(accountId)`                                             |
| Fetch a webhook                      | `client.fetchWebhook(accountId, webhookId, callback)`                        |
| Create a webhook                     | `client.createWebhook(accountId, payload, callback)`                         |
| Destroy a webhook                    | `client.destroyWebhook(accountId, webhookId, callback)`                      |

### Workflows
| Action                               | Method                                                                       |
|--------------------------------------|------------------------------------------------------------------------------|
| List all workflows                   | `client.listAllWorkflows(accountId, callback, status)`                       |
| Fetch a workflow                     | `client.fetchWorkflow(accountId, workflowId, callback)`                      |
| Activate a workflow                  | `client.activateWorkflow(accountId, workflowId, callback)`                   |
| Pause a workflow                     | `client.pauseWorkflow(accountId, workflowId, callback)`                      |
| Start a subscriber on a workflow     | `client.startOnWorkflow(accountId, workflowId, payload, callback)`           |
| Remove a subscriber from a workflow  | `client.removeFromWorkflow(accountId, workflowId, emailOrId, callback)`      |

### Workflow triggers
| Action                               | Method                                                                       |
|--------------------------------------|------------------------------------------------------------------------------|
| List all workflow triggers           | `client.listTriggers(accountId, workflowId, callback)`                       |
| Create a workflow trigger            | `client.createTrigger(accountId, workflowId, payload, callback)`             |
| Update a trigger                     | `client.updateTrigger(accountId, workflowId, triggerId, payload, callback)`  |

See the official [REST API docs](https://www.getdrip.com/docs/rest-api) for a complete API reference.

## Examples

### Listing campaigns

The `listCampaigns` method accepts an optional `status` argument to filter the response be campaign's status in your account:

```javascript
// Fetching only active campaigns
client.listCampaigns(9999999, function (error, response, body) {
  console.log(body)
}, "active")

// This fetches all campaigns by default
client.listCampaigns(9999999, function (error, response, body) {
  console.log(body)
})
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

client.updateBatchSubscribers(2271521, batch, function (errors, responses, bodies) {
  // Do stuff
  }
)
```

### Sending a batch of events

The `recordBatchEvents` methods takes a batch object for the payload and is most suitable for sending thousands of events.

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

client.recordBatchEvents(2271521, batch, function (error, response, body) {
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
