const sinon = require('sinon');
const client = require('../../lib/index')({ token: 'abc123', accountId: 9999999 });
const MissingAttributeError = require('../../lib/errors');

const cart = {
  provider: 'my_custom_platform',
  email: 'user@gmail.com',
  action: 'created',
  cart_id: '456445746',
  occurred_at: '2019-01-17T20:50:00Z',
  cart_public_id: '#5',
  grand_total: 16.99,
  total_discounts: 5.34,
  currency: 'USD',
  cart_url: 'https://mysuperstore.com/cart/456445746',
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
      quantity: 2,
      discounts: 5.34,
      total: 16.99,
      product_url: 'https://mysuperstore.com/dp/B01J4SWO1G',
      image_url: 'https://www.getdrip.com/images/example_products/water_bottle.png',
      product_tag: 'Best Seller'
    }
  ]
};

describe('Shopper Activity', () => {
  beforeEach(() => {
    sinon.stub(client, 'request')
      .yields(null, { statusCode: 202 }, { events: {} });
  });

  afterEach(() => {
    client.request.restore();
  });

  it('should raise an error if required fields are missing', (done) => {
    expect(() => {
      client.createUpdateCartActivity({}, () => {});
    }).toThrow(new MissingAttributeError('Fields: provider,action,cart_id,cart_url should all be present'));
    done();
  });

  it('should create a cart activity and call request with post', (done) => {
    expect(typeof client.createUpdateCartActivity).toEqual('function');

    client.createUpdateCartActivity(cart, (error, response) => {
      expect(response.statusCode).toBe(202);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });
});
