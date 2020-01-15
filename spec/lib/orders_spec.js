const sinon = require('sinon');
const client = require('../../lib/index')({ token: 'abc123', accountId: 9999999 });

const order = {
  email: 'ordertest@gmail.com',
  provider: 'shopify',
  upstream_id: 'abcdef',
  identifier: 'Order_123456',
  amount: 4900,
  tax: 100,
  fees: 0,
  discount: 0,
  permalink: 'http://myorders.com/orders/123456',
  currency_code: 'USD',
  properties: {
    size: 'medium',
    color: 'red'
  },
  financial_state: 'paid',
  fulfillment_state: 'fulfilled',
  billing_address: {
    name: 'Bill Billington',
    first_name: 'Bill',
    last_name: 'Billington',
    company: 'Bills R US',
    address_1: '123 Bill St.',
    address_2: 'Apt. B',
    city: 'Billtown',
    state: 'CA',
    zip: '01234',
    country: 'United States',
    phone: '555-555-5555',
    email: 'bill@bills.com'
  },
  shipping_address: {
    name: 'Ship Shippington',
    first_name: 'Ship',
    last_name: 'Shipington',
    company: 'Shipping 4 Less',
    address_1: '123 Ship St.',
    address_2: 'null',
    city: 'Shipville',
    state: 'CA',
    zip: '01234',
    country: 'United States',
    phone: '555-555-5555',
    email: 'ship@shipping.com'
  },
  items: [{
    id: '8888888',
    product_id: '765432',
    sku: '4444',
    amount: 4900,
    name: 'Canoe',
    quantity: 1,
    upstream_id: 'hijkl',
    upstream_product_id: 'opqrs',
    upstream_product_variant_id: 'zyxwv',
    price: 4900,
    tax: 100,
    fees: 0,
    discount: 100,
    taxable: true,
    properties: {
      color: 'black'
    }
  }]
};

const batch = {
  batches: [{
    orders: [
      {
        email: 'john@acme.com',
        provider: 'shopify',
        upstream_id: 'abcdef',
        identifier: 'Order_123456',
        amount: 4900,
        tax: 100,
        fees: 0,
        discount: 0,
        permalink: 'http://myorders.com/orders/123456',
        currency_code: 'USD',
        properties: {
          size: 'medium',
          color: 'red'
        },
        occurred_at: '2013-06-21T10:31:58Z',
        closed_at: '2013-06-21T10:35:58Z',
        cancelled_at: null,
        financial_state: 'paid',
        fulfillment_state: 'fulfilled',
        billing_address: {
          name: 'Bill Billington',
          first_name: 'Bill',
          last_name: 'Billington',
          company: 'Bills R US',
          address_1: '123 Bill St.',
          address_2: 'Apt. B',
          city: 'Billtown',
          state: 'CA',
          zip: '01234',
          country: 'United States',
          phone: '555-555-5555',
          email: 'bill@bills.com'
        },
        shipping_address: {
          name: 'Ship Shippington',
          first_name: 'Ship',
          last_name: 'Shipington',
          company: 'Shipping 4 Less',
          address_1: '123 Ship St.',
          address_2: 'null',
          city: 'Shipville',
          state: 'CA',
          zip: '01234',
          country: 'United States',
          phone: '555-555-5555',
          email: 'ship@shipping.com'
        },
        items: [{
          id: '8888888',
          product_id: '765432',
          sku: '4444',
          amount: 4900,
          name: 'Canoe',
          quantity: 1,
          upstream_id: 'hijkl',
          upstream_product_id: 'opqrs',
          upstream_product_variant_id: 'zyxwv',
          price: 4900,
          tax: 100,
          fees: 0,
          discount: 100,
          taxable: true,
          properties: {
            color: 'black'
          }
        }]
      },
      {
        email: 'joe@acme.com',
        provider: 'shopify',
        upstream_id: 'fedcba',
        identifier: 'Order_654321',
        amount: 4900,
        tax: 100,
        fees: 0,
        discount: 0,
        permalink: 'http://myorders.com/orders/654321',
        currency_code: 'USD',
        properties: {
          size: 'small',
          color: 'blue'
        },
        occurred_at: '2013-05-18T10:31:58Z',
        closed_at: '2013-05-18T10:35:58Z',
        cancelled_at: null,
        financial_state: 'paid',
        fulfillment_state: 'fulfilled',
        billing_address: {
          name: 'Bill Billington',
          first_name: 'Bill',
          last_name: 'Billington',
          company: 'Bills R US',
          address_1: '123 Bill St.',
          address_2: 'Apt. B',
          city: 'Billtown',
          state: 'CA',
          zip: '01234',
          country: 'United States',
          phone: '555-555-5555',
          email: 'bill@bills.com'
        },
        shipping_address: {
          name: 'Ship Shippington',
          first_name: 'Ship',
          last_name: 'Shipington',
          company: 'Shipping 4 Less',
          address_1: '123 Ship St.',
          address_2: 'null',
          city: 'Shipville',
          state: 'CA',
          zip: '01234',
          country: 'United States',
          phone: '555-555-5555',
          email: 'ship@shipping.com'
        },
        items: [{
          id: '8888888',
          product_id: '765432',
          sku: '4444',
          amount: 4900,
          name: 'Canoe',
          quantity: 1,
          upstream_id: 'hijkl',
          upstream_product_id: 'opqrs',
          upstream_product_variant_id: 'zyxwv',
          price: 4900,
          tax: 100,
          fees: 0,
          discount: 100,
          taxable: true,
          properties: {
            color: 'black'
          }
        }]
      }
    ]
  }]
};

const refund = {
  upstream_id: 'tuvwx',
  provider: 'my_store',
  order_upstream_id: 'a1234567',
  amount: 2000,
  note: 'Incorrect size'
};

describe('Orders', () => {
  beforeEach(() => {
    sinon.stub(client, 'request')
      .yields(null, { statusCode: 202 }, { events: {} });
  });

  afterEach(() => {
    client.request.restore();
  });

  it('should create an order and call request with post', (done) => {
    expect(typeof client.createUpdateOrder).toEqual('function');

    client.createUpdateOrder(order, (error, response) => {
      expect(response.statusCode).toBe(202);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });

  it('should post a batch of orders and call request with post', (done) => {
    expect(typeof client.createUpdateBatchOrders).toEqual('function');

    client.createUpdateBatchOrders(batch, (error, response) => {
      expect(response.statusCode).toBe(202);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });

  it('should create a refund and call request with post', (done) => {
    expect(typeof client.createUpdateRefund).toEqual('function');

    client.createUpdateRefund(refund, (error, response) => {
      expect(response.statusCode).toBe(202);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });
});

describe('Orders with Promise', () => {
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

  it('should create an order and call request with POST', (done) => {
    expect(typeof client.createUpdateOrder).toEqual('function');

    client.createUpdateOrder(order)
      .then((response) => {
        expect(response.statusCode).toBe(202);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.post).toHaveBeenCalledWith('v2/9999999/orders', { orders: [order] }, undefined);
  });

  it('should post a batch of orders and call request with POST', (done) => {
    expect(typeof client.createUpdateBatchOrders).toEqual('function');

    client.createUpdateBatchOrders(batch.batches[0].orders)
      .then((response) => {
        expect(response.statusCode).toBe(202);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.post).toHaveBeenCalledWith('v2/9999999/orders/batches', batch, undefined);
  });

  it('should create a refund and call request with POST', (done) => {
    expect(typeof client.createUpdateRefund).toEqual('function');

    client.createUpdateRefund(refund)
      .then((response) => {
        expect(response.statusCode).toBe(202);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.post).toHaveBeenCalledWith('v2/9999999/refunds', { refunds: [refund] }, undefined);
  });
});
