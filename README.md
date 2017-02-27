# Drip Rest API Node.js Wrapper

A complete Nodejs wrapper for the Drip REST API.

Note: Work in progress

## How to install

`npm install drip-api-nodejs --save`

## Authentication

For private use and integrations, use your API Token found here. Create a new instance of the client library with:

```javascript
var client = require('drip-api-nodejs')({ token: YOUR_API_KEY });
```

For most API methods, you'll need your Drip Account ID found [here](https://www.getdrip.com/settings/general). Most client methods accept an account ID argument which allows interaction with any account maintained in your Drip account.

## Usage

The following methods are currently available and are available on the client instance:

| Action                     | Method                                                             |
| :------------------------- | :------------------------------------------------------------------|
| List accounts              | `client.accounts(callback)`                                        |
| Fetch an account           | `client.accounts(account_id, callback)`                            |
| List subscribers           | `client.listSubscribers(accountId, callback)`                      |
| Fetch a subscriber         | `client.fetchSubscriber(accountId, emailOrId, callback)`           |

See the official [REST API docs](https://www.getdrip.com/docs/rest-api) for a complete API reference.

## Examples

### Listing campaigns

The `listCampaigns` method accepts an optional `status` argument to filter the response be campaign's status in your account:

```javascript
// Fetching only active campaigns
client.listCampaigns(2271521, function (error, response, body) {
  console.log(body)
}, "active")

// This fetches all campaigns by default
client.listCampaigns(2271521, function (error, response, body) {
  console.log(body)
})
```
