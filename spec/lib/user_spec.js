const sinon = require('sinon');
const client = require('../../lib/index')({ token: 'abc123', accountId: 9999999 });

describe('User with callback', () => {
  beforeEach(() => {
    sinon.stub(client, 'request')
      .yields(null, { statusCode: 200 }, { users: {} });
  });

  afterEach(() => {
    client.request.restore();
  });

  it('should fetch currently authenticated user and call request with get', (done) => {
    expect(typeof client.fetchUser).toEqual('function');

    client.fetchUser((error, response) => {
      expect(response.statusCode).toBe(200);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });
});

describe('User with promise', () => {
  const expectedResponse = {
    statusCode: 200,
    body: {
      users: [{}]
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

  it('should fetch authenticated user', (done) => {
    expect(typeof client.fetchUser).toEqual('function');

    client.fetchUser()
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.get).toHaveBeenCalledWith('v2/user', {}, undefined);
  });
});
