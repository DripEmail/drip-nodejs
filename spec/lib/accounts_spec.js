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
    expect(helper.accountsUrl()).toBe('https://api.getdrip.com/v2/accounts/')
  })

  it('should return an accounts list object', function(done) {
    expect(typeof client.listAccounts).toEqual('function');

    client.listAccounts(function(error, response, body) {
      expect(response.statusCode).toBe(200)
      expect(request.get.callCount).toBe(1)
    })
    done()
  });

  it('should return a specific account object', function(done) {
    expect(typeof client.fetchAccount).toEqual('function');

    client.fetchAccount(9999999, function(error, response, body) {
      expect(response.statusCode).toBe(200)
      expect(request.get.callCount).toBe(1)
    })
    done();
  });
});
