'use strict';

let sinon = require('sinon');
let client = require('../../lib/index')({ token: 'abc123' });
let helper = require('../../lib/helpers');

describe('Accounts with callback', function () {
  beforeEach(function () {
    sinon.stub(client, "request")
      .yields(null, { statusCode: 200 }, { accounts : {} }
    );
  });

  afterEach(function() {
    client.request.restore();
  });

  it('should provide the correct base URL', function () {
    expect(helper.accountsUrl()).toBe('https://api.getdrip.com/v2/accounts/')
  });

  it('should list accounts and call request with get', function (done) {
    expect(typeof client.listAccounts).toEqual('function');

    client.listAccounts(function (error, response, body) {
      expect(response.statusCode).toBe(200);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });

  it('should fetch an account and call request with get', function (done) {
    expect(typeof client.fetchAccount).toEqual('function');

    client.fetchAccount(9999999, function (error, response, body) {
      expect(response.statusCode).toBe(200);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });
});

describe('Accounts with Promise', function () {
  let expectedResponse = {
    statusCode: 200,
    body: {
      accounts: [{}]
    }
  };

  let failTest = function(error) {
    expect(error).toBeUndefined();
  }

  beforeEach(function () {
    sinon.stub(client, "request").resolves(expectedResponse);
    spyOn(client, "get").and.callThrough();
  });

  afterEach(function () {
    client.request.restore();
  });

  it('should list accounts', function (done) {
    expect(typeof client.listAccounts).toEqual('function');
    
    client.listAccounts()
      .then(function (response) {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest)
    done()

    expect(client.get).toHaveBeenCalledWith('accounts', {}, undefined);
  });

  it('should fetch accounts', function (done) {
    expect(typeof client.fetchAccount).toEqual('function');

    client.fetchAccount(9999999)
      .then(function (response) {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest)
    done()

    expect(client.get).toHaveBeenCalledWith('accounts/9999999', {}, undefined);
  });
});