'use strict';

var sinon = require('sinon')
  , client = require('../../lib/index')({ token: 'abc123' })
  , request = require('request')
  , helper = require('../../lib/helpers');

describe('Workflow triggers', function () {
  var accountId = 123;
  var workflowId = 456;
  var triggerId = 999;

  beforeEach(function () {
    sinon.stub(request, 'get')
      .yields(null, { statusCode: 200 }, { accounts : {} }
    );
    sinon.stub(request, 'post')
      .yields(null, { statusCode: 204 }, {}
    );
    sinon.stub(request, 'put')
      .yields(null, { statusCode: 200 }, {}
    );
  });

  afterEach(function () {
    request.get.restore();
    request.post.restore();
    request.put.restore();
  });

  it('should provide the correct base URL', function () {
    expect(helper.workflowTriggerUrl(accountId, workflowId))
      .toBe('https://api.getdrip.com/v2/123/workflows/456/triggers/')
  })

  it('should list all workflow triggers and call request with get', function (done) {
    expect(typeof client.listTriggers).toEqual('function');

    client.listTriggers(accountId, workflowId, function(error, response, body) {
      expect(response.statusCode).toBe(200);
      expect(request.get.callCount).toBe(1);
    });
    done();
  });

  it('should create a workflow trigger and call request with post', function (done) {
    expect(typeof client.createTrigger).toEqual('function');

    client.createTrigger(accountId, workflowId, { "provider": "some_app" }, function (error, response, body) {
      expect(response.statusCode).toBe(204);
      expect(request.post.callCount).toBe(1);
    });
    done();
  });

  it('should update a workflow trigger and call request with put', function (done) {
    expect(typeof client.updateTrigger).toEqual('function');

    client.updateTrigger(accountId, workflowId, triggerId, { "provider": "some_other_app" }, function (error, response, body) {
      expect(response.statusCode).toBe(200);
      expect(request.put.callCount).toBe(1);
    });
    done();
  });
});
