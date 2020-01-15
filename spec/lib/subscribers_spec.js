const request = require('request');
const sinon = require('sinon');
const client = require('../../lib/index')({ token: 'abc123', accountId: 9999999 });

const email = 'someone@example.com';
const campaignId = 456789;
const batchPayload = [{ email: 'someone@example.com' }];

describe('Subscribers with callback', () => {
  describe('non-batch functions', () => {
    beforeEach(() => {
      sinon.stub(client, 'request')
        .yields(null, { statusCode: 200 }, { subscribers: {} });
    });

    afterEach(() => {
      client.request.restore();
    });

    it('should list all subscribers and call request with get', (done) => {
      expect(typeof client.listSubscribers).toEqual('function');

      client.listSubscribers({}, (error, response) => {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      });
      done();
    });

    it('should update a subscriber and call request with post', (done) => {
      expect(typeof client.createUpdateSubscriber).toEqual('function');

      client.createUpdateSubscriber({ test_field: 'value' }, (error, response) => {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      });
      done();
    });

    it('should fetch a specific subscriber and call request with get', (done) => {
      expect(typeof client.fetchSubscriber).toEqual('function');

      client.fetchSubscriber(email, (error, response) => {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      });
      done();
    });

    it('should unsubscribe someone from a campaign and call request with post', (done) => {
      expect(typeof client.unsubscribeFromCampaign).toEqual('function');

      client.unsubscribeFromCampaign(email, campaignId, (error, response) => {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      });
      done();
    });

    it('should batch unsubscribe subscribers', (done) => {
      expect(typeof client.unsubscribeBatchSubscribers).toEqual('function');

      client.unsubscribeBatchSubscribers(batchPayload, (error, response) => {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      });
      done();
    });

    it('should unsubscribe someone from all mailings and call request with post', (done) => {
      expect(typeof client.unsubscribeFromAllMailings).toEqual('function');

      client.unsubscribeFromAllMailings(email, (error, response) => {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      });
      done();
    });

    it('should delete a subscriber and call request with delete', (done) => {
      expect(typeof client.deleteSubscriber).toEqual('function');

      client.deleteSubscriber(email, (error, response) => {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      });
      done();
    });
  });

  describe('batch functions', () => {
    const payload = {
      batches: [{
        subscribers: new Array(1001)
      }]
    };

    beforeEach(() => {
      sinon.stub(request, 'post')
        .yields(null, { statusCode: 201 }, {});
    });

    afterEach(() => {
      request.post.restore();
    });

    it('should post batches of subscribers and call request with post', (done) => {
      expect(typeof client.updateBatchSubscribers).toEqual('function');

      client.updateBatchSubscribers(payload, (errors, responses, bodies) => {
        expect(errors).toBe(null);
        expect(responses.length).toBe(2);
        expect(responses[0].statusCode).toBe(201);
        expect(responses[1].statusCode).toBe(201);
        expect(bodies).toEqual([{}, {}]);
        expect(request.post.callCount).toBe(2);
      });
      done();
    });
  });

  describe('batch request URL', () => {
    const payload = {
      batches: [{
        subscribers: new Array(1)
      }]
    };

    beforeEach(() => {
      sinon.stub(request, 'post')
        .yields(null, { statusCode: 201 }, {});
      spyOn(request, 'post').and.callThrough();
    });

    afterEach(() => {
      request.post.restore();
    });

    it('should set the correct request URL', (done) => {
      client.updateBatchSubscribers(payload, (errors, responses, bodies) => {
        expect(errors).toBe(null);
        expect(responses.length).toBe(1);
        expect(responses[0].statusCode).toBe(201);
        expect(bodies).toEqual([{}]);
      });
      done();

      expect(request.post).toHaveBeenCalledWith({
        url: 'https://api.getdrip.com/v2/9999999/subscribers/batches',
        headers: client.requestHeaders(),
        json: true,
        body: {
          batches: [{
            subscribers: [undefined]
          }]
        }
      }, jasmine.any(Function));
    });
  });

  describe('Subscribers with promise', () => {
    const expectedResponse = {
      statusCode: 200,
      body: {
        subscribers: [{}]
      }
    };

    const failTest = (error) => {
      expect(error).toBeUndefined();
    };

    beforeEach(() => {
      sinon.stub(client, 'request').resolves(expectedResponse);
      spyOn(client, 'get').and.callThrough();
      spyOn(client, 'post').and.callThrough();
      spyOn(client, 'del').and.callThrough();
    });

    afterEach(() => {
      client.request.restore();
    });

    it('should list all subscribers', (done) => {
      expect(typeof client.listSubscribers).toEqual('function');

      client.listSubscribers({})
        .then((response) => {
          expect(response.statusCode).toBe(200);
          expect(client.request.callCount).toBe(1);
        })
        .catch(failTest);
      done();

      expect(client.get).toHaveBeenCalledWith('v2/9999999/subscribers/', { qs: {} }, undefined);
    });

    it('create or update subscribers', (done) => {
      expect(typeof client.createUpdateSubscriber).toEqual('function');

      client.createUpdateSubscriber({ test_field: 'value' })
        .then((response) => {
          expect(response.statusCode).toBe(200);
          expect(client.request.callCount).toBe(1);
        })
        .catch(failTest);
      done();

      expect(client.post).toHaveBeenCalledWith('v2/9999999/subscribers', { subscribers: [{ test_field: 'value' }] }, undefined);
    });

    it('unsubscribe a batch of subscribers', (done) => {
      expect(typeof client.unsubscribeBatchSubscribers).toEqual('function');

      client.unsubscribeBatchSubscribers(batchPayload)
        .then((response) => {
          expect(response.statusCode).toBe(200);
          expect(client.request.callCount).toBe(1);
        })
        .catch(failTest);
      done();

      expect(client.post).toHaveBeenCalledWith('v2/9999999/unsubscribes/batches', { batches: [{ subscribers: [{ email: 'someone@example.com' }] }] }, undefined);
    });

    it('fetch a subscriber', (done) => {
      expect(typeof client.fetchSubscriber).toEqual('function');

      client.fetchSubscriber(email)
        .then((response) => {
          expect(response.statusCode).toBe(200);
          expect(client.request.callCount).toBe(1);
        })
        .catch(failTest);
      done();

      expect(client.get).toHaveBeenCalledWith('v2/9999999/subscribers/someone%40example.com', {}, undefined);
    });

    it('unsubscribe from a campaign', (done) => {
      expect(typeof client.unsubscribeFromCampaign).toEqual('function');

      client.unsubscribeFromCampaign(email, campaignId)
        .then((response) => {
          expect(response.statusCode).toBe(200);
          expect(client.request.callCount).toBe(1);
        })
        .catch(failTest);
      done();

      expect(client.post).toHaveBeenCalledWith('v2/9999999/subscribers/someone%40example.com/remove', { qs: { campaign_id: campaignId } }, undefined);
    });

    it('unsubscribe a subscriber from all mailings', (done) => {
      expect(typeof client.unsubscribeFromAllMailings).toEqual('function');

      client.unsubscribeFromAllMailings(email)
        .then((response) => {
          expect(response.statusCode).toBe(200);
          expect(client.request.callCount).toBe(1);
        })
        .catch(failTest);
      done();

      expect(client.post).toHaveBeenCalledWith('v2/9999999/subscribers/someone%40example.com/unsubscribe_all', {}, undefined);
    });

    it('delete a subscriber', (done) => {
      expect(typeof client.deleteSubscriber).toEqual('function');

      client.deleteSubscriber(email)
        .then((response) => {
          expect(response.statusCode).toBe(200);
          expect(client.request.callCount).toBe(1);
        })
        .catch(failTest);
      done();

      expect(client.del).toHaveBeenCalledWith('v2/9999999/subscribers/someone%40example.com', {}, undefined);
    });

    // TODO: Implement Promise based batch methods
  });
});
