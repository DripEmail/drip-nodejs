const sinon = require('sinon');
const client = require('../../lib/index')({ token: 'abc123', accountId: 9999999 });

const idOrEmail = 'someone@example.com';
const options = {
  email: idOrEmail,
  provider: 'shopify',
  upstream_id: 'abcdef',
  amount: 4900,
  tax: 100,
  fees: 0,
  discount: 0,
  currency_code: 'USD',
  properties: {
    size: 'medium',
    color: 'red'
  }
};

describe('Purchases with callback', () => {
  beforeEach(() => {
    sinon.stub(client, 'request')
      .yields(null, { statusCode: 202 }, { purchases: {} });
  });

  afterEach(() => {
    client.request.restore();
  });

  it('should record a purchase event and call request with post', (done) => {
    expect(typeof client.createPurchase).toEqual('function');

    client.createPurchase(idOrEmail, options, (error, response) => {
      expect(response.statusCode).toBe(202);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });
});

describe('Purchases with Promise', () => {
  const expectedResponse = {
    statusCode: 202,
    body: {}
  };

  const failTest = (error) => {
    expect(error).toBeUndefined();
  };

  beforeEach(() => {
    sinon.stub(client, 'request').resolves(expectedResponse);
    spyOn(client, 'post').and.callThrough();
  });

  afterEach(() => {
    client.request.restore();
  });

  it('should create a purchase', (done) => {
    expect(typeof client.createPurchase).toEqual('function');

    client.createPurchase(idOrEmail, options)
      .then((response) => {
        expect(response.statusCode).toBe(202);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.post).toHaveBeenCalledWith('v2/9999999/orders', { options }, undefined);
  });
});
