const sinon = require('sinon');
const client = require('../../lib/index')({ token: 'abc123', accountId: 9999999 });

const webhookId = 456789;

describe('Webhooks', () => {
  beforeEach(() => {
    sinon.stub(client, 'request')
      .yields(null, { statusCode: 200 }, { webhooks: {} });
  });

  afterEach(() => {
    client.request.restore();
  });

  it('should list all webhooks and call request with get', (done) => {
    expect(typeof client.listWebhooks).toEqual('function');

    client.listWebhooks((error, response) => {
      expect(response.statusCode).toBe(200);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });

  it('should fetch a specific webhook and call request with get', (done) => {
    expect(typeof client.fetchWebhook).toEqual('function');

    client.fetchWebhook(webhookId, (error, response) => {
      expect(response.statusCode).toBe(200);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });

  it('should create a webhook and call request with post', (done) => {
    expect(typeof client.createWebhook).toEqual('function');

    client.createWebhook({ hook_details: 'hook value' }, (error, response) => {
      expect(response.statusCode).toBe(200);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });

  it('should delete a webhook and call request with delete', (done) => {
    expect(typeof client.destroyWebhook).toEqual('function');

    client.destroyWebhook(webhookId, (error, response) => {
      expect(response.statusCode).toBe(200);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });
});

describe('Webhooks with promise', () => {
  const expectedResponse = {
    statusCode: 200,
    body: {
      webhooks: [{}]
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

  it('should list all webhooks', (done) => {
    expect(typeof client.listWebhooks).toEqual('function');

    client.listWebhooks()
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.get).toHaveBeenCalledWith('v2/9999999/webhooks', {}, undefined);
  });

  it('should fetch a webhook', (done) => {
    expect(typeof client.fetchWebhook).toEqual('function');

    client.fetchWebhook(webhookId)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.get).toHaveBeenCalledWith('v2/9999999/webhooks/456789', {}, undefined);
  });

  it('should create a webhook', (done) => {
    expect(typeof client.createWebhook).toEqual('function');

    client.createWebhook({ hook_details: 'hook value' })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.post).toHaveBeenCalledWith('v2/9999999/webhooks', { webhooks: [{ hook_details: 'hook value' }] }, undefined);
  });

  it('should destroy a webhook', (done) => {
    expect(typeof client.destroyWebhook).toEqual('function');

    client.destroyWebhook(webhookId)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.del).toHaveBeenCalledWith('v2/9999999/webhooks/456789', {}, undefined);
  });
});
