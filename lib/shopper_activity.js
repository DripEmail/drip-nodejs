const helpers = require("./helpers");

module.exports = {
  /**
   * Create or update a cart for a customer
   * Docs: https://developer.drip.com/#create-or-update-a-cart
   *
   * @param {object} payload - An object with cart details
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  createUpdateCartActivity(payload, callback) {
    const requiredFields = ["provider", "action", "cart_id", "cart_url"];
    helpers.checkRequiredFields(payload, requiredFields, true);

    return this.post(
      `v3/${this.accountId}/shopper_activity/cart`,
      payload,
      callback
    );
  },

  /**
   * Create or update a batch of carts
   *
   * @param {object} payload - An object with the subscriber's details
   * @param {callback} callback - Required. A callback
   */

  updateBatchCarts(payload, callback) {
    const carts =
      (payload && payload.batches && payload.batches[0].carts) || [];
    const batchSize = 1000;
    const batches = [];
    const errors = [];
    const responses = [];
    const bodies = [];
    const headers = this.requestHeaders();
    let done = 0;
    let hasError = false;

    // Break the payload into batch-sized chunks
    for (let i = 0, j = carts.length; i < j; i += batchSize) {
      batches.push(carts.slice(i, batchSize));
    }

    batches.forEach((batch, batchIndex) => {
      request.post(
        {
          url: `${helpers.baseUrl}v2/${this.accountId}/cart/batches`,
          headers,
          json: true,
          body: {
            batches: [
              {
                carts: batch,
              },
            ],
          },
        },
        (error, response, body) => {
          errors[batchIndex] = error;
          responses[batchIndex] = response;
          bodies[batchIndex] = body;
          hasError = hasError || error;
          done += 1;

          if (done === batches.length) {
            // All batches complete; call back
            callback(hasError ? errors : null, responses, bodies);
          }
        }
      );
    });
  },

  /**
   * Create or update an order for a customer
   * Docs: https://developer.drip.com/#order-activity
   *
   * @param {object} payload - An object with order details
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  createUpdateOrderActivity(payload, callback) {
    const requiredFields = ["provider", "action", "order_id"];
    helpers.checkRequiredFields(payload, requiredFields);

    return this.post(
      `v3/${this.accountId}/shopper_activity/order`,
      payload,
      callback
    );
  },

  /**
   * Create or update a batch of orders
   *
   * @param {object} payload - An object with the subscriber's details
   * @param {callback} callback - Required. A callback
   */

  updateBatchOrders(payload, callback) {
    const orders =
      (payload && payload.batches && payload.batches[0].orders) || [];
    const batchSize = 1000;
    const batches = [];
    const errors = [];
    const responses = [];
    const bodies = [];
    const headers = this.requestHeaders();
    let done = 0;
    let hasError = false;

    // Break the payload into batch-sized chunks
    for (let i = 0, j = orders.length; i < j; i += batchSize) {
      batches.push(orders.slice(i, batchSize));
    }

    batches.forEach((batch, batchIndex) => {
      request.post(
        {
          url: `${helpers.baseUrl}v2/${this.accountId}/order/batches`,
          headers,
          json: true,
          body: {
            batches: [
              {
                orders: batch,
              },
            ],
          },
        },
        (error, response, body) => {
          errors[batchIndex] = error;
          responses[batchIndex] = response;
          bodies[batchIndex] = body;
          hasError = hasError || error;
          done += 1;

          if (done === batches.length) {
            // All batches complete; call back
            callback(hasError ? errors : null, responses, bodies);
          }
        }
      );
    });
  },

  /**
   * Create or update a product
   * Docs: https://developer.drip.com/#product-activity
   *
   * @param {object} payload - An object with product details
   * @param {callback} callback - An optional callback
   * @returns {promise}
   */
  createUpdateProductActivity(payload, callback) {
    const requiredFields = [
      "provider",
      "action",
      "product_id",
      "name",
      "price",
      "product_variant_id",
    ];
    helpers.checkRequiredFields(payload, requiredFields);

    return this.post(
      `v3/${this.accountId}/shopper_activity/product`,
      payload,
      callback
    );
  },

  /**
   * Create or update a batch of products
   *
   * @param {object} payload - An object with the subscriber's details
   * @param {callback} callback - Required. A callback
   */

  updateBatchProducts(payload, callback) {
    const products =
      (payload && payload.batches && payload.batches[0].products) || [];
    const batchSize = 1000;
    const batches = [];
    const errors = [];
    const responses = [];
    const bodies = [];
    const headers = this.requestHeaders();
    let done = 0;
    let hasError = false;

    // Break the payload into batch-sized chunks
    for (let i = 0, j = products.length; i < j; i += batchSize) {
      batches.push(products.slice(i, batchSize));
    }

    batches.forEach((batch, batchIndex) => {
      request.post(
        {
          url: `${helpers.baseUrl}v2/${this.accountId}/product/batches`,
          headers,
          json: true,
          body: {
            batches: [
              {
                products: batch,
              },
            ],
          },
        },
        (error, response, body) => {
          errors[batchIndex] = error;
          responses[batchIndex] = response;
          bodies[batchIndex] = body;
          hasError = hasError || error;
          done += 1;

          if (done === batches.length) {
            // All batches complete; call back
            callback(hasError ? errors : null, responses, bodies);
          }
        }
      );
    });
  },
};
