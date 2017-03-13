'use strict';

var sinon = require('sinon')
  , client = require('../../lib/index')({ token: 'abc123' })
  , request = require('request')
  , helper = require('../../lib/helpers');

describe('Campaigns', function () {
  var accountId = 123;
  var campaignId = 456;

  beforeEach(function () {
    sinon.stub(request, 'get')
      .yields(null, { statusCode: 200 }, { accounts : {} }
    );
    sinon.stub(request, 'post')
      .yields(null, { statusCode: 204 }, {}
    );
  });

  afterEach(function () {
    request.get.restore();
    request.post.restore();
  });

  it('should provide the correct base URL', function () {
    expect(helper.campaignsUrl(accountId, campaignId))
      .toBe('https://api.getdrip.com/v2/123/campaigns/456')
  })

  it('should list all broadcasts and call request with get', function (done) {
    expect(typeof client.listCampaigns).toEqual('function');

    client.listCampaigns(accountId, function(error, response, body) {
      expect(response.statusCode).toBe(200);
      expect(request.get.callCount).toBe(1);
    }, "active");
    done();
  });

  it('should fetch a campaign and call request with get', function (done) {
    expect(typeof client.fetchCampaign).toEqual('function');

    client.fetchCampaign(accountId, campaignId, function (error, response, body) {
      expect(response.statusCode).toBe(200);
      expect(request.get.callCount).toBe(1);
    });
    done();
  });

  it('should activate a campaign and call request with post', function (done) {
    expect(typeof client.activateCampaign).toEqual('function');

    client.activateCampaign(accountId, campaignId, function (error, response, body) {
      expect(response.statusCode).toBe(204);
      expect(request.post.callCount).toBe(1);
    });
    done();
  });

  it('should pause a campaign and call request with post', function (done) {
    expect(typeof client.pauseCampaign).toEqual('function');

    client.pauseCampaign(accountId, campaignId, function (error, response, body) {
      expect(response.statusCode).toBe(204);
      expect(request.post.callCount).toBe(1);
    });
    done();
  });

  it('should list a subscribers to a campaign and call request with get', function (done) {
    expect(typeof client.listAllSubscribesToCampaign).toEqual('function');

    client.listAllSubscribesToCampaign(accountId, campaignId, function (error, response, body) {
      expect(response.statusCode).toBe(200);
      expect(request.get.callCount).toBe(1);
    });
    done();
  });

  it('should subscriber someone to a campaign and call request with post', function (done) {
    expect(typeof client.subscribeToCampaign).toEqual('function');

    client.subscribeToCampaign(accountId, campaignId, {}, function (error, response, body) {
      expect(response.statusCode).toBe(204);
      expect(request.post.callCount).toBe(1);
    });
    done();
  });
});
