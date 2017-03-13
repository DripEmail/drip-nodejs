'use strict';

var sinon = require('sinon')
  , client = require('../../lib/index')({ token: 'abc123' })
  , request = require('request')
  , helper = require('../../lib/helpers');

describe('Broadcasts', function (){
  beforeEach(function (){
    sinon.stub(request, 'get')
      .yields(null, { statusCode: 200 }, { accounts : {} }
    );
  });

  afterEach(function () {
    request.get.restore();
  });

  it('should provide the correct base URL', function () {
    expect(helper.broadcastsUrl(123)).toBe('https://api.getdrip.com/v2/123/broadcasts/')
  });

  it('should list broadcasts and call request with get', function (done) {
    expect(typeof client.listBroadcasts).toEqual('function');

    client.listBroadcasts(9999999, function (error, response, body) {
      expect(response.statusCode).toBe(200);
      expect(request.get.callCount).toBe(1);
    }, "active");
    done()
  });

  it('should fetch a broadcast and call request with get', function (done) {
    expect(typeof client.fetchBroadcast).toEqual('function');

    client.fetchBroadcast(9999999, 8888888, function (error, response, body) {
      expect(response.statusCode).toBe(200);
      expect(request.get.callCount).toBe(1);
    });
    done();
  });
});
