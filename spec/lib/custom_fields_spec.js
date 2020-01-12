const sinon = require('sinon');
const client = require('../../lib/index')({ token: 'abc123', accountId: 9999999 });

describe('Custom fields with callback', () => {
  beforeEach(() => {
    sinon.stub(client, 'request')
      .yields(null, { statusCode: 200 }, { custom_field_identifiers: {} });
  });

  afterEach(() => {
    client.request.restore();
  });

  it('should list all account-wide custom fields and call request with get', (done) => {
    expect(typeof client.listAllCustomFields).toEqual('function');

    client.listAllCustomFields((error, response) => {
      expect(response.statusCode).toBe(200);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });
});

describe('Custom fields with Promise', () => {
  const expectedResponse = {
    statusCode: 200,
    body: {
      custom_field_identifiers: [{}]
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

  it('should list campaigns', (done) => {
    expect(typeof client.listAllCustomFields).toEqual('function');

    client.listAllCustomFields()
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.get).toHaveBeenCalledWith('v2/9999999/custom_field_identifiers/', {}, undefined);
  });
});
