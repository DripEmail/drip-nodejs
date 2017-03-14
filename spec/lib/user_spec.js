'use strict';

var sinon = require('sinon')
  , client = require('../../lib/index')({ token: 'abc123' })
  , request = require('request')
  , helper = require('../../lib/helpers');

describe('User', function () {

  beforeEach(function () {
    sinon.stub(request, 'get')
      .yields(null, { statusCode: 200 }, { accounts : {} }
    );
  });

  afterEach(function () {
    request.get.restore();
  });

  it('should provide the correct base URL', function () {
    expect(helper.userUrl())
      .toBe('https://api.getdrip.com/v2/user/')
  })

  it('should fetch currently authenticated user and call request with get', function (done) {
    expect(typeof client.fetchUser).toEqual('function');

    client.fetchUser(function(error, response, body) {
      expect(response.statusCode).toBe(200);
      expect(request.get.callCount).toBe(1);
    });
    done();
  });
});
