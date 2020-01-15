const sinon = require('sinon');
const client = require('../../lib/index')({ token: 'abc123', accountId: 9999999 });
const MissingAttributeError = require('../../lib/errors');

describe('Shopper Activity', () => {
  const payload = {
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

  it('should create a cart activity and call request with POST', (done) => {
    expect(typeof client.createUpdateCartActivity).toEqual('function');

    client.createUpdateCartActivity(payload, (_, response) => {
      expect(response.statusCode).toBe(202);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });

  it('should create an order activity and call request with POST', (done) => {
    expect(typeof client.createUpdateOrderActivity).toEqual('function');

    payload.order_id = '1234';
    client.createUpdateOrderActivity(payload, (_, response) => {
      expect(response.statusCode).toBe(202);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });

  it('should create a product activity and call request with POST', (done) => {
    expect(typeof client.createUpdateProductActivity).toEqual('function');

    payload.product_variant_id = 'ABC123';
    payload.product_id = 'XYZ321';
    payload.price = 90;
    payload.name = 'Shirt';

    client.createUpdateProductActivity(payload, (_, response) => {
      expect(response.statusCode).toBe(202);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });
});

describe('Shopper Activity with Promise', () => {
  const payload = {
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

  it('should create a cart activity and call request with POST', (done) => {
    expect(typeof client.createUpdateCartActivity).toEqual('function');

    client.createUpdateCartActivity(payload)
      .then((response) => {
        expect(response.statusCode).toBe(202);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.post).toHaveBeenCalledWith('v3/9999999/shopper_activity/cart', payload, undefined);
  });

  it('should create an order activity and call request with POST', (done) => {
    expect(typeof client.createUpdateOrderActivity).toEqual('function');

    payload.order_id = '1234';
    client.createUpdateOrderActivity(payload)
      .then((response) => {
        expect(response.statusCode).toBe(202);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.post).toHaveBeenCalledWith('v3/9999999/shopper_activity/order', payload, undefined);
  });

  it('should create a product activity and call request with POST', (done) => {
    expect(typeof client.createUpdateProductActivity).toEqual('function');

    payload.product_variant_id = 'ABC123';
    payload.product_id = 'XYZ321';
    payload.price = 90;
    payload.name = 'Shirt';

    client.createUpdateProductActivity(payload)
      .then((response) => {
        expect(response.statusCode).toBe(202);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.post).toHaveBeenCalledWith('v3/9999999/shopper_activity/product', payload, undefined);
  });
});
