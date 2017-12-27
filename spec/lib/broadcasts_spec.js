'use strict';

const sinon = require('sinon');
const client = require('../../lib/index')({ token: 'abc123', accountId: 9999999 });
const helper = require('../../lib/helpers');

describe('Broadcasts with callback', function (){
  beforeEach(function(){
    sinon.stub(client, 'request')
      .yields(null, { statusCode: 200 }, { broadcasts : {} }
    );
  });

  afterEach(function() {
    client.request.restore();
  });

  it('should provide the correct base URL', function () {
    expect(helper.broadcastsUrl(123)).toBe('https://api.getdrip.com/v2/123/broadcasts/')
  });

  it('should list broadcasts and call request with get', function (done) {
    expect(typeof client.listBroadcasts).toEqual('function');

    client.listBroadcasts({status: 'all'}, function (error, response, body) {
      expect(response.statusCode).toBe(200);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });

  it('should fetch a broadcast and call request with get', function (done) {
    expect(typeof client.fetchBroadcast).toEqual('function');

    client.fetchBroadcast(8888888, function (error, response, body) {
      expect(response.statusCode).toBe(200);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });
});
