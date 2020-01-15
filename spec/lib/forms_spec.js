const sinon = require('sinon');
const client = require('../../lib/index')({ token: 'abc123', accountId: 9999999 });

const formId = 5555555;

describe('Forms with callback', () => {
  beforeEach(() => {
    sinon.stub(client, 'request')
      .yields(null, { statusCode: 200 }, { forms: {} });
  });

  afterEach(() => {
    client.request.restore();
  });

  it('should list all forms and call request with get', (done) => {
    expect(typeof client.listForms).toEqual('function');

    client.listForms((error, response) => {
      expect(response.statusCode).toBe(200);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });

  it('should fetch a form and call request with get', (done) => {
    expect(typeof client.fetchForm).toEqual('function');

    client.fetchForm(formId, (error, response) => {
      expect(response.statusCode).toBe(200);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });
});

describe('Forms with promise', () => {
  const expectedResponse = {
    statusCode: 200,
    body: {
      forms: [{}]
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

  it('should list forms', (done) => {
    expect(typeof client.listForms).toEqual('function');

    client.listForms()
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.get).toHaveBeenCalledWith('v2/9999999/forms', {}, undefined);
  });

  it('should fetch a form', (done) => {
    expect(typeof client.fetchForm).toEqual('function');

    client.fetchForm(formId)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.get).toHaveBeenCalledWith('v2/9999999/forms/5555555', {}, undefined);
  });
});
