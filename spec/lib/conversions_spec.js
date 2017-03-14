'use strict';

var sinon = require('sinon')
  , client = require('../../lib/index')({ token: 'abc123' })
  , request = require('request')
  , helper = require('../../lib/helpers');

describe('Conversions', function () {
  var accountId = 123;
  var conversionId = 999888;

  beforeEach(function () {
    sinon.stub(request, 'get')
      .yields(null, { statusCode: 200 }, { accounts : {} }
    );
  });

  afterEach(function () {
    request.get.restore();
  });

  it('should provide the correct base URL', function () {
    expect(helper.conversionsUrl(accountId))
      .toBe('https://api.getdrip.com/v2/123/goals/')
  })

  it('should list all account-wide conversions and call request with get', function (done) {
    expect(typeof client.listAllCustomFields).toEqual('function');

    client.listAllCustomFields(accountId, function(error, response, body) {
      expect(response.statusCode).toBe(200);
      expect(request.get.callCount).toBe(1);
    }, "active");
    done();
  });
});
