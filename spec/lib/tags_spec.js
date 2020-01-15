const sinon = require('sinon');
const client = require('../../lib/index')({ token: 'abc123', accountId: 9999999 });

const email = 'someone@example.com';

describe('Tags with callback', () => {
  beforeEach(() => {
    sinon.stub(client, 'request')
      .yields(null, { statusCode: 200 }, { accounts: {} });
  });

  afterEach(() => {
    client.request.restore();
  });

  it('should list all tags and call request with get', (done) => {
    expect(typeof client.listAllTags).toEqual('function');

    client.listAllTags((error, response) => {
      expect(response.statusCode).toBe(200);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });

  it('should tag a subscriber and call request with post', (done) => {
    expect(typeof client.tagSubscriber).toEqual('function');

    client.tagSubscriber({ email, tag: 'Customer' }, (error, response) => {
      expect(response.statusCode).toBe(200);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });

  it('should remove a tag from a subscriber and call request with delete', (done) => {
    expect(typeof client.removeSubscriberTag).toEqual('function');

    client.removeSubscriberTag(email, 'Test tag', (error, response) => {
      expect(response.statusCode).toBe(200);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });
});

describe('Tags with promise', () => {
  const expectedResponse = {
    statusCode: 200,
    body: {
      tags: [{}]
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

  it('should list all tags', (done) => {
    expect(typeof client.listAllTags).toEqual('function');

    client.listAllTags()
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.get).toHaveBeenCalledWith('v2/9999999/tags', {}, undefined);
  });

  it('should tag a subscriber', (done) => {
    expect(typeof client.tagSubscriber).toEqual('function');

    client.tagSubscriber({ email, tag: 'Customer' })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.post).toHaveBeenCalledWith('v2/9999999/tags', { tags: [{ email, tag: 'Customer' }] }, undefined);
  });

  it('remove a subscriber tag', (done) => {
    expect(typeof client.removeSubscriberTag).toEqual('function');

    client.removeSubscriberTag(email, 'Customer')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.del).toHaveBeenCalledWith('v2/9999999/subscribers/someone%40example.com/tags/Customer', {}, undefined);
  });
});
