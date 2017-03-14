'use strict';

var sinon = require('sinon')
  , client = require('../../lib/index')({ token: 'abc123' })
  , request = require('request')
  , helper = require('../../lib/helpers');

describe('Subscribers', function () {
  var accountId = 123;
  var campaignId = 456;
  var email = "someone@example.com";

  beforeEach(function () {
    sinon.stub(request, 'get')
      .yields(null, { statusCode: 200 }, { accounts : {} }
    );
    sinon.stub(request, 'post')
      .yields(null, { statusCode: 204 }, {}
    );
    sinon.stub(request, 'del')
      .yields(null, { statusCode: 204 }, {}
    );
  });

  afterEach(function () {
    request.get.restore();
    request.post.restore();
    request.del.restore();
  });

  it('should provide the correct base URL', function () {
    expect(helper.subscribersUrl(accountId))
      .toBe('https://api.getdrip.com/v2/123/subscribers/')
  })

  it('should list all subscribers and call request with get', function (done) {
    expect(typeof client.listSubscribers).toEqual('function');

    client.listSubscribers(accountId, function(error, response, body) {
      expect(response.statusCode).toBe(200);
      expect(request.get.callCount).toBe(1);
    });
    done();
  });

  it('should update a subscriber and call request with post', function (done) {
    expect(typeof client.updateSubscriber).toEqual('function');

    client.updateSubscriber(accountId, email, { "test_field": "value" }, function (error, response, body) {
      expect(response.statusCode).toBe(204);
      expect(request.post.callCount).toBe(1);
    });
    done();
  });

  it('should fetch a specific subscriber and call request with get', function (done) {
    expect(typeof client.fetchSubscriber).toEqual('function');

    client.fetchSubscriber(accountId, email, function (error, response, body) {
      expect(response.statusCode).toBe(200);
      expect(request.get.callCount).toBe(1);
    });
    done();
  });

  it('should unsubscribe someone from a campaign and call request with post', function (done) {
    expect(typeof client.unsubscribeFromCampaign).toEqual('function');

    client.unsubscribeFromCampaign(accountId, email, campaignId, function (error, response, body) {
      expect(response.statusCode).toBe(204);
      expect(request.post.callCount).toBe(1);
    });
    done();
  });

  it('should unsubscribe someone from all mailings and call request with post', function (done) {
    expect(typeof client.unsubscribeFromAllMailings).toEqual('function');

    client.unsubscribeFromAllMailings(accountId, email, function (error, response, body) {
      expect(response.statusCode).toBe(204);
      expect(request.post.callCount).toBe(1);
    });
    done();
  });

  it('should delete a subscriber and call request with delete', function (done) {
    expect(typeof client.deleteSubscriber).toEqual('function');

    client.deleteSubscriber(accountId, email, function (error, response, body) {
      expect(response.statusCode).toBe(204);
      expect(request.del.callCount).toBe(1);
    });
    done();
  });
});
