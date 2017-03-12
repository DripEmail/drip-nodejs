'use strict';

var sinon = require('sinon');
var client = require('../../lib/index')({ token: 'abc123' });
var request = require('request')
var helper = require('../../lib/helpers');

describe('Accounts', function(){
  beforeEach(function(){
    sinon.stub(request, 'get')
      .yields(null, { statusCode: 200 }, { accounts : {} }
    );
  });

  afterEach(function(){
    request.get.restore();
  });

  it('should provide the correct base URL', function() {
    expect(helper.broadcastsUrl()).toBe('https://api.getdrip.com/v2/broadcasts/')
  })

  it('should return a broadcast list object', function(done) {
    expect(typeof client.listBroadcasts).toEqual('function');

    client.listBroadcasts(9999999, function(error, response, body) {
      expect(response.statusCode).toBe(200)
      expect(request.get.callCount).toBe(1)
    }, "active")
    done()
  });

  it('should return a specific broadcast object', function(done) {
    expect(typeof client.fetchBroadcast).toEqual('function');

    client.fetchBroadcast(9999999, 8888888, function(error, response, body) {
      expect(response.statusCode).toBe(200)
      expect(request.get.callCount).toBe(1)
    })
    done();
  });
});
