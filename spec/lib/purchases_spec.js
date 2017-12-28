const sinon = require('sinon');
const client = require('../../lib/index')({ token: 'abc123', accountId: 9999999 });

const idOrEmail = 'someone@example.com';
const purchaseId = 444555;
const payload = {
  properties: {
    address: '123 Anywhere St'
  },
  items: [
    {
      id: '8888888',
      product_id: '765432',
      sku: '4444',
      amount: 4900,
      name: 'Canoe',
      quantity: 1,
      properties: {
        color: 'black'
      }
    }
  ],
  occurred_at: '2013-06-21T10:31:58Z'
};

describe('Purchases with callback', () => {
  beforeEach(() => {
    sinon.stub(client, 'request')
      .yields(null, { statusCode: 200 }, { purchases: {} });
  });

  afterEach(() => {
    client.request.restore();
  });

  it('should record a purchase event and call request with post', (done) => {
    expect(typeof client.createPurchase).toEqual('function');

    client.createPurchase(idOrEmail, payload, (error, response) => {
      expect(response.statusCode).toBe(200);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });

  it('should list all purchase events for a subscriber and call request with get', (done) => {
    expect(typeof client.listPurchases).toEqual('function');

    client.listPurchases(idOrEmail, {}, (error, response) => {
      expect(response.statusCode).toBe(200);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });

  it('should fetch a specific purchase event and call request with get', (done) => {
    expect(typeof client.fetchPurchase).toEqual('function');

    client.fetchPurchase(idOrEmail, purchaseId, (error, response) => {
      expect(response.statusCode).toBe(200);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });
});

describe('Purchases with Promise', () => {
  const expectedResponse = {
    statusCode: 200,
    body: {
      purchases: [{}]
    }
  };

  const failTest = (error) => {
    expect(error).toBeUndefined();
  };

  beforeEach(() => {
    sinon.stub(client, 'request').resolves(expectedResponse);
    spyOn(client, 'get').and.callThrough();
    spyOn(client, 'post').and.callThrough();
  });

  afterEach(() => {
    client.request.restore();
  });

  it('should create a purchase', (done) => {
    expect(typeof client.createPurchase).toEqual('function');

    client.createPurchase(idOrEmail, payload)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.post).toHaveBeenCalledWith('9999999/subscribers/someone%40example.com/purchases', { payload }, undefined);
  });

  it('should list purchases for a subscriber', (done) => {
    expect(typeof client.listPurchases).toEqual('function');

    client.listPurchases(idOrEmail, {})
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.get).toHaveBeenCalledWith('9999999/subscribers/someone%40example.com/purchases', { qs: {} }, undefined);
  });

  it('should fetch a purchase', (done) => {
    expect(typeof client.fetchPurchase).toEqual('function');

    client.fetchPurchase(idOrEmail, purchaseId)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.get).toHaveBeenCalledWith('9999999/subscribers/someone%40example.com/purchases/444555', {}, undefined);
  });
});
