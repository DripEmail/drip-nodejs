const sinon = require('sinon');
const client = require('../../lib/index')({ token: 'abc123', accountId: 9999999 });

const workflowId = 444555;
const workflowTriggerId = 'df1234';

describe('Workflow triggers with callback', () => {
  beforeEach(() => {
    sinon.stub(client, 'request')
      .yields(null, { statusCode: 200 }, { accounts: {} });
  });

  afterEach(() => {
    client.request.restore();
  });

  it('should list all workflow triggers and call request with get', (done) => {
    expect(typeof client.listTriggers).toEqual('function');

    client.listTriggers(workflowId, (error, response) => {
      expect(response.statusCode).toBe(200);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });

  it('should create a workflow trigger and call request with post', (done) => {
    expect(typeof client.createTrigger).toEqual('function');

    client.createTrigger(workflowId, { provider: 'some_app' }, (error, response) => {
      expect(response.statusCode).toBe(200);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });

  it('should update a workflow trigger and call request with put', (done) => {
    expect(typeof client.updateTrigger).toEqual('function');

    client.updateTrigger(workflowId, workflowTriggerId, { provider: 'some_other_app' }, (error, response) => {
      expect(response.statusCode).toBe(200);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });
});

describe('Workflows with promise', () => {
  const expectedResponse = {
    statusCode: 200,
    body: {
      triggers: [{}]
    }
  };

  const failTest = (error) => {
    expect(error).toBeUndefined();
  };

  beforeEach(() => {
    sinon.stub(client, 'request').resolves(expectedResponse);
    spyOn(client, 'get').and.callThrough();
    spyOn(client, 'post').and.callThrough();
    spyOn(client, 'put').and.callThrough();
  });

  afterEach(() => {
    client.request.restore();
  });

  it('should list all workflow triggers', (done) => {
    expect(typeof client.listTriggers).toEqual('function');

    client.listTriggers(workflowId)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.get).toHaveBeenCalledWith('v2/9999999/workflows/444555/triggers', {}, undefined);
  });

  it('should create a workflow trigger', (done) => {
    expect(typeof client.createTrigger).toEqual('function');

    client.createTrigger(workflowId, { provider: 'some_app' })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.post).toHaveBeenCalledWith('v2/9999999/workflows/444555/triggers', { triggers: [{ provider: 'some_app' }] }, undefined);
  });

  it('should update a workflow trigger', (done) => {
    expect(typeof client.updateTrigger).toEqual('function');

    client.updateTrigger(workflowId, 'df1234', { provider: 'some_app' })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.put).toHaveBeenCalledWith('v2/9999999/workflows/444555/triggers/df1234', { triggers: [{ provider: 'some_app' }] }, undefined);
  });
});
