'use strict';

var sinon = require('sinon')
  , client = require('../../lib/index')({ token: 'abc123' })
  , request = require('request')
  , helper = require('../../lib/helpers');

describe('Campaign subscriptions', function () {
  var accountId = 123;
  var subscriberId = 999;

  beforeEach(function () {
    sinon.stub(request, 'get')
      .yields(null, { statusCode: 200 }, { accounts : {} }
    );
  });

  afterEach(function () {
    request.get.restore();
  });

  it('should provide the correct base URL', function () {
    expect(helper.subscriptionsUrl(accountId, subscriberId))
      .toBe('https://api.getdrip.com/v2/123/subscribers/999/campaign_subscriptions/')
  })

  it('should list all campaign subscriptions and call request with get', function (done) {
    expect(typeof client.subscriberCampaignSubscriptions).toEqual('function');

    client.subscriberCampaignSubscriptions(accountId, subscriberId, function(error, response, body) {
      expect(response.statusCode).toBe(200);
      expect(request.get.callCount).toBe(1);
    });
    done();
  });
});
