const sinon = require('sinon');
const client = require('../../lib/index')({ token: 'abc123', accountId: 9999999 });

describe('Events', () => {
  beforeEach(() => {
    sinon.stub(client, 'request')
      .yields(null, { statusCode: 200 }, { events: {} });
  });

  afterEach(() => {
    client.request.restore();
  });

  it('should record an event and call request with post', (done) => {
    expect(typeof client.recordEvent).toEqual('function');

    client.recordEvent({ email: 'test@example.com', action: 'Purchased' }, (error, response) => {
      expect(response.statusCode).toBe(200);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });

  it('should post a batch of events and call request with post', (done) => {
    expect(typeof client.recordBatchEvents).toEqual('function');

    client.recordBatchEvents({ email: 'test@example.com', action: 'Purchased' }, (error, response) => {
      expect(response.statusCode).toBe(200);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });

  it('should list all account event actions and call request with get', (done) => {
    expect(typeof client.listEventActions).toEqual('function');

    client.listEventActions({}, (error, response) => {
      expect(response.statusCode).toBe(200);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });
});

describe('Events with Promise', () => {
  const expectedResponse = {
    statusCode: 200,
    body: {
      events: [{}]
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

  it('should record an event', (done) => {
    expect(typeof client.recordEvent).toEqual('function');

    client.recordEvent({ email: 'test@example.com', action: 'Purchased' })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.post).toHaveBeenCalledWith('v2/9999999/events', { events: [{ email: 'test@example.com', action: 'Purchased' }] }, undefined);
  });

  it('should record a batch of events', (done) => {
    expect(typeof client.recordBatchEvents).toEqual('function');

    client.recordBatchEvents([{ email: 'test@example.com', action: 'Purchased' }])
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.post).toHaveBeenCalledWith('v2/9999999/events/batches', { batches: [{ events: [{ email: 'test@example.com', action: 'Purchased' }] }] }, undefined);
  });

  it('should fetch a list of event actions', (done) => {
    expect(typeof client.listEventActions).toEqual('function');

    client.listEventActions({})
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.get).toHaveBeenCalledWith('v2/9999999/event_actions/', { qs: {} }, undefined);
  });
});
