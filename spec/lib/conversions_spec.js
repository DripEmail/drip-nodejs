const sinon = require('sinon');
const client = require('../../lib/index')({ token: 'abc123', accountId: 9999999 });

const conversionId = 999888;

describe('Conversions with callback', () => {
  beforeEach(() => {
    sinon.stub(client, 'request')
      .yields(null, { statusCode: 200 }, { conversions: {} });
  });

  afterEach(() => {
    client.request.restore();
  });

  it('should list all account-wide conversions and call request with get', (done) => {
    expect(typeof client.listConversions).toEqual('function');

    client.listConversions({}, (error, response) => {
      expect(response.statusCode).toBe(200);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });

  it('should fetch a conversion', (done) => {
    expect(typeof client.fetchConversion).toEqual('function');

    client.fetchConversion(conversionId, (error, response) => {
      expect(response.statusCode).toBe(200);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });
});

describe('Conversions with Promise', () => {
  const expectedResponse = {
    statusCode: 200,
    body: {
      conversions: [{}]
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

  it('should list conversions', (done) => {
    expect(typeof client.listConversions).toEqual('function');

    client.listConversions()
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.get).toHaveBeenCalledWith('v2/9999999/goals/', { qs: {} }, undefined);
  });

  it('should fetch a conversion', (done) => {
    expect(typeof client.fetchConversion).toEqual('function');

    client.fetchConversion(conversionId)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.get).toHaveBeenCalledWith('v2/9999999/goals/999888', {}, undefined);
  });
});
