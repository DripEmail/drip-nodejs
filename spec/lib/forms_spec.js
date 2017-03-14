'use strict';

var sinon = require('sinon')
  , client = require('../../lib/index')({ token: 'abc123' })
  , request = require('request')
  , helper = require('../../lib/helpers');

describe('Forms', function (){
  var accountId = 123;
  var formId = 555;

  beforeEach(function (){
    sinon.stub(request, 'get')
      .yields(null, { statusCode: 200 }, { accounts : {} }
    );
  });

  afterEach(function () {
    request.get.restore();
  });

  it('should provide the correct base URL', function () {
    expect(helper.formsUrl(123)).toBe('https://api.getdrip.com/v2/123/forms/')
  });

  it('should list all forms and call request with get', function (done) {
    expect(typeof client.listForms).toEqual('function');

    client.listForms(accountId, function (error, response, body) {
      expect(response.statusCode).toBe(200);
      expect(request.get.callCount).toBe(1);
    });
    done()
  });

  it('should fetch a form and call request with get', function (done) {
    expect(typeof client.fetchForm).toEqual('function');

    client.fetchForm(accountId, formId, function (error, response, body) {
      expect(response.statusCode).toBe(200);
      expect(request.get.callCount).toBe(1);
    });
    done();
  });
});
