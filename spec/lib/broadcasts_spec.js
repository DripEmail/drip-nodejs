const sinon = require('sinon');
const client = require('../../lib/index')({ token: 'abc123', accountId: 9999999 });

const broadcastId = 8888888;

describe('Broadcasts with callback', () => {
  beforeEach(() => {
    sinon.stub(client, 'request')
      .yields(null, { statusCode: 200 }, { broadcasts: {} });
  });

  afterEach(() => {
    client.request.restore();
  });

  it('should list broadcasts and call request with get', (done) => {
    expect(typeof client.listBroadcasts).toEqual('function');

    client.listBroadcasts({ status: 'all' }, (error, response) => {
      expect(response.statusCode).toBe(200);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });

  it('should fetch a broadcast and call request with get', (done) => {
    expect(typeof client.fetchBroadcast).toEqual('function');

    client.fetchBroadcast(broadcastId, (error, response) => {
      expect(response.statusCode).toBe(200);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });
});

describe('Broadcasts with Promise', () => {
  const expectedResponse = {
    statusCode: 200,
    body: {
      broadcasts: [{}]
    }
  };

  const failTest = (error) => {
    expect(error).toBeUndefined();
  };

  beforeEach(() => {
    sinon.stub(client, 'request').resolves(expectedResponse);
    spyOn(client, 'get').and.callThrough();
  });

  afterEach(() => {
    client.request.restore();
  });

  it('should list broadcasts', (done) => {
    expect(typeof client.listBroadcasts).toEqual('function');

    client.listBroadcasts()
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.get).toHaveBeenCalledWith('v2/9999999/broadcasts/', { qs: {} }, undefined);
  });

  it('should fetch broadcast', (done) => {
    expect(typeof client.fetchBroadcast).toEqual('function');

    client.fetchBroadcast(broadcastId)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.get).toHaveBeenCalledWith('v2/9999999/broadcasts/8888888', {}, undefined);
  });
});
