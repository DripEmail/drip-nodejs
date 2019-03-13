const sinon = require('sinon');
const client = require('../../lib/index')({ token: 'abc123', accountId: 9999999 });

const cart = {
  provider: 'magento',
  email: 'user@gmail.com',
  action: 'created',
  occurred_at: '2019-01-17T20:50:00Z',
  order_id: '456445746',
  order_public_id: '#5',
  grand_total: 22.99,
  total_discounts: 5.34,
  total_taxes: 1.00,
  total_fees: 2.00,
  total_shipping: 5.00,
  currency: 'USD',
  order_url: 'https://mysuperstore.com/order/456445746',
  items: [
    {
      product_id: 'B01J4SWO1G',
      product_variant_id: 'B01J4SWO1G-CW-BOTT',
      sku: 'XHB-1234',
      name: 'The Coolest Water Bottle',
      brand: 'Drip',
      categories: [
        'Accessories'
      ],
      price: 11.16,
      sale_price: 10.16,
      quantity: 2,
      discounts: 5.34,
      taxes: 1.00,
      fees: 0.50,
      shipping: 5.00,
      total: 23.99,
      product_url: 'https://mysuperstore.com/dp/B01J4SWO1G',
      image_url: 'https://www.getdrip.com/images/example_products/water_bottle.png',
      product_tag: 'Best Seller'
    }
  ],
  billing_address: {
    label: 'Primary Billing',
    first_name: 'Bill',
    last_name: 'Billington',
    company: 'Bills R US',
    address_1: '123 Bill St.',
    address_2: 'Apt. B',
    city: 'Billtown',
    state: 'CA',
    postal_code: '01234',
    country: 'United States',
    phone: '555-555-5555'
  },
  shipping_address: {
    label: 'Downtown Office',
    first_name: 'Ship',
    last_name: 'Shipington',
    company: 'Shipping 4 Less',
    address_1: '123 Ship St.',
    city: 'Shipville',
    state: 'CA',
    postal_code: '01234',
    country: 'United States',
    phone: '555-555-5555'
  }
};

describe('Carts', () => {
  beforeEach(() => {
    sinon.stub(client, 'request')
      .yields(null, { statusCode: 202 }, { events: {} });
  });

  afterEach(() => {
    client.request.restore();
  });

  it('should create a cart and call request with post', (done) => {
    expect(typeof client.createUpdateCart).toEqual('function');

    client.createUpdateCart(cart, (error, response) => {
      expect(response.statusCode).toBe(202);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });
});

describe('Carts with Promise', () => {
  const expectedResponse = {
    statusCode: 202,
    body: {}
  };

  const failTest = (error) => {
    expect(error).toBeUndefined();
  };

  beforeEach(() => {
    sinon.stub(client, 'request').resolves(expectedResponse);
    spyOn(client, 'v3post').and.callThrough();
  });

  afterEach(() => {
    client.request.restore();
  });

  it('should create a cart and call request with v3post', (done) => {
    expect(typeof client.createUpdateCart).toEqual('function');

    client.createUpdateCart(cart)
      .then((response) => {
        expect(response.statusCode).toBe(202);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.v3post).toHaveBeenCalledWith('9999999/shopper_activity/cart', { payload: cart }, undefined);
  });
});
