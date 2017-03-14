'use strict';

var sinon = require('sinon')
  , client = require('../../lib/index')({ token: 'abc123' })
  , request = require('request')
  , helper = require('../../lib/helpers');

describe('Purchases', function () {
  var accountId = 123;
  var emailOrId = "someone@example.com";
  var purchaseId = 444;

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
    expect(helper.purchasesUrl(accountId, emailOrId))
      .toBe('https://api.getdrip.com/v2/123/subscribers/someone@example.com/purchases/')
  })

  it('should record a purchase event and call request with post', function (done) {
    expect(typeof client.createPurchase).toEqual('function');

    client.createPurchase(accountId, emailOrId, { "name": "test" }, function(error, response, body) {
      expect(response.statusCode).toBe(204);
      expect(request.post.callCount).toBe(1);
    });
    done();
  });

  it('should list all purchase events for a subscriber and call request with get', function (done) {
    expect(typeof client.listPurchases).toEqual('function');

    client.listPurchases(accountId, emailOrId, function (error, response, body) {
      expect(response.statusCode).toBe(200);
      expect(request.get.callCount).toBe(1);
    });
    done();
  });

  it('should fetch a specific purchase event and call request with get', function (done) {
    expect(typeof client.fetchPurchase).toEqual('function');

    client.fetchPurchase(accountId, emailOrId, purchaseId, function (error, response, body) {
      expect(response.statusCode).toBe(200);
      expect(request.get.callCount).toBe(1);
    });
    done();
  });
});
