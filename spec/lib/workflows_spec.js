'use strict';

var sinon = require('sinon')
  , client = require('../../lib/index')({ token: 'abc123' })
  , request = require('request')
  , helper = require('../../lib/helpers');

describe('Workflows', function () {
  var accountId = 123;
  var workflowId = 456;
  var email = "test@example.com";

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
    expect(helper.workflowUrl(accountId, workflowId))
      .toBe('https://api.getdrip.com/v2/123/workflows/456')
  })

  it('should list all workflows and call request with get', function (done) {
    expect(typeof client.listAllWorkflows).toEqual('function');

    client.listAllWorkflows(accountId, function(error, response, body) {
      expect(response.statusCode).toBe(200);
      expect(request.get.callCount).toBe(1);
    }, "active");
    done();
  });

  it('should fetch a specific workflow and call request with get', function (done) {
    expect(typeof client.fetchWorkflow).toEqual('function');

    client.fetchWorkflow(accountId, workflowId, function (error, response, body) {
      expect(response.statusCode).toBe(200);
      expect(request.get.callCount).toBe(1);
    });
    done();
  });

  it('should activate a workflow and call request with post', function (done) {
    expect(typeof client.activateWorkflow).toEqual('function');

    client.activateWorkflow(accountId, workflowId, function (error, response, body) {
      expect(response.statusCode).toBe(204);
      expect(request.post.callCount).toBe(1);
    });
    done();
  });

  it('should pause a workflow and call request with post', function (done) {
    expect(typeof client.pauseWorkflow).toEqual('function');

    client.pauseWorkflow(accountId, workflowId, function (error, response, body) {
      expect(response.statusCode).toBe(204);
      expect(request.post.callCount).toBe(1);
    });
    done();
  });

  it('should start a subscriber a workflow and call request with post', function (done) {
    expect(typeof client.startOnWorkflow).toEqual('function');

    client.startOnWorkflow(accountId, workflowId, { "email": "test@example.com" }, function (error, response, body) {
      expect(response.statusCode).toBe(204);
      expect(request.post.callCount).toBe(1);
    });
    done();
  });

  it('should remove a subscriber from a workflow and call request with delete', function (done) {
    expect(typeof client.removeFromWorkflow).toEqual('function');

    client.removeFromWorkflow(accountId, workflowId, email, function (error, response, body) {
      expect(response.statusCode).toBe(204);
      expect(request.del.callCount).toBe(1);
    });
    done();
  });
});
