'use strict';

var sinon = require('sinon')
  , client = require('../../lib/index')({ token: 'abc123' })
  , request = require('request')
  , helper = require('../../lib/helpers');

describe('Webhooks', function () {
  var accountId = 123;
  var webhookId = 456;

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
    expect(helper.webhooksUrl(accountId))
      .toBe('https://api.getdrip.com/v2/123/webhooks/')
  })

  it('should list all webhooks and call request with get', function (done) {
    expect(typeof client.listWebhooks).toEqual('function');

    client.listWebhooks(accountId, function(error, response, body) {
      expect(response.statusCode).toBe(200);
      expect(request.get.callCount).toBe(1);
    });
    done();
  });

  it('should fetch a specific webhook and call request with get', function (done) {
    expect(typeof client.fetchWebhook).toEqual('function');

    client.fetchWebhook(accountId, webhookId, function (error, response, body) {
      expect(response.statusCode).toBe(200);
      expect(request.get.callCount).toBe(1);
    });
    done();
  });

  it('should create a webhook and call request with post', function (done) {
    expect(typeof client.createWebhook).toEqual('function');

    client.createWebhook(accountId, { "hook_details": "hook value" }, function (error, response, body) {
      expect(response.statusCode).toBe(204);
      expect(request.post.callCount).toBe(1);
    });
    done();
  });

  it('should delete a webhook and call request with delete', function (done) {
    expect(typeof client.destroyWebhook).toEqual('function');

    client.destroyWebhook(accountId, webhookId, function (error, response, body) {
      expect(response.statusCode).toBe(204);
      expect(request.del.callCount).toBe(1);
    });
    done();
  });
});
