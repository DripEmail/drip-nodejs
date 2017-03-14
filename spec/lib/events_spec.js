'use strict';

var sinon = require('sinon')
  , client = require('../../lib/index')({ token: 'abc123' })
  , request = require('request')
  , helper = require('../../lib/helpers');

describe('Events', function () {
  var accountId = 123;

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
    expect(helper.eventsUrl(accountId))
      .toBe('https://api.getdrip.com/v2/123/events/')
  })

  it('should record an event and call request with post', function (done) {
    expect(typeof client.recordEvent).toEqual('function');

    client.recordEvent(accountId, { "name": "test" }, function(error, response, body) {
      expect(response.statusCode).toBe(204);
      expect(request.post.callCount).toBe(1);
    });
    done();
  });

  it('should post a batch of events and call request with post', function (done) {
    expect(typeof client.recordBatchEvents).toEqual('function');

    client.recordBatchEvents(accountId, { "name": "test" }, function (error, response, body) {
      expect(response.statusCode).toBe(204);
      expect(request.post.callCount).toBe(1);
    });
    done();
  });

  it('should list all account event actions and call request with get', function (done) {
    expect(typeof client.listEventActions).toEqual('function');

    client.listEventActions(accountId, function (error, response, body) {
      expect(response.statusCode).toBe(200);
      expect(request.get.callCount).toBe(1);
    }, { per_page: 100 });
    done();
  });
});
