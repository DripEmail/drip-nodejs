const sinon = require('sinon');
const client = require('../../lib/index')({ token: 'abc123' });

describe('Accounts with callback', () => {
  beforeEach(() => {
    sinon.stub(client, 'request')
      .yields(null, { statusCode: 200 }, { accounts: {} });
  });

  afterEach(() => {
    client.request.restore();
  });

  it('should list accounts and call request with get', (done) => {
    expect(typeof client.listAccounts).toEqual('function');

    client.listAccounts((error, response) => {
      expect(response.statusCode).toBe(200);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });

  it('should fetch an account and call request with get', (done) => {
    expect(typeof client.fetchAccount).toEqual('function');

    client.fetchAccount(9999999, (error, response) => {
      expect(response.statusCode).toBe(200);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });
});

describe('Accounts with Promise', () => {
  const expectedResponse = {
    statusCode: 200,
    body: {
      accounts: [{}]
    }
  };

  const failTest = (error) => {
    expect(error).toBeUndefined();
  };

  beforeEach(() => {
    sinon.stub(client, 'request').resolves(expectedResponse);
    spyOn(client, 'get').and.callThrough();
  });

  afterEach(() => {
    client.request.restore();
  });

  it('should list accounts', (done) => {
    expect(typeof client.listAccounts).toEqual('function');

    client.listAccounts()
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.get).toHaveBeenCalledWith('v2/accounts', {}, undefined);
  });

  it('should fetch accounts', (done) => {
    expect(typeof client.fetchAccount).toEqual('function');

    client.fetchAccount(9999999)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.get).toHaveBeenCalledWith('v2/accounts/9999999', {}, undefined);
  });
});
