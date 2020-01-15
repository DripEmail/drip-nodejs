const sinon = require('sinon');
const client = require('../../lib/index')({ token: 'abc123', accountId: 9999999 });

const idOrEmail = 'test@example.com';
const workflowId = 444555;

describe('Workflows with callback', () => {
  beforeEach(() => {
    sinon.stub(client, 'request')
      .yields(null, { statusCode: 200 }, { workflows: {} });
  });

  afterEach(() => {
    client.request.restore();
  });

  it('should list all workflows and call request with get', (done) => {
    expect(typeof client.listAllWorkflows).toEqual('function');

    client.listAllWorkflows({}, (error, response) => {
      expect(response.statusCode).toBe(200);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });

  it('should fetch a specific workflow and call request with get', (done) => {
    expect(typeof client.fetchWorkflow).toEqual('function');

    client.fetchWorkflow(workflowId, (error, response) => {
      expect(response.statusCode).toBe(200);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });

  it('should activate a workflow and call request with post', (done) => {
    expect(typeof client.activateWorkflow).toEqual('function');

    client.activateWorkflow(workflowId, (error, response) => {
      expect(response.statusCode).toBe(200);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });

  it('should pause a workflow and call request with post', (done) => {
    expect(typeof client.pauseWorkflow).toEqual('function');

    client.pauseWorkflow(workflowId, (error, response) => {
      expect(response.statusCode).toBe(200);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });

  it('should start a subscriber a workflow and call request with post', (done) => {
    expect(typeof client.startOnWorkflow).toEqual('function');

    client.startOnWorkflow(workflowId, idOrEmail, (error, response) => {
      expect(response.statusCode).toBe(200);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });

  it('should remove a subscriber from a workflow and call request with delete', (done) => {
    expect(typeof client.removeFromWorkflow).toEqual('function');

    client.removeFromWorkflow(workflowId, idOrEmail, (error, response) => {
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
      workflows: [{}]
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

  it('should list all workflows', (done) => {
    expect(typeof client.listAllWorkflows).toEqual('function');

    client.listAllWorkflows()
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.get).toHaveBeenCalledWith('v2/9999999/workflows/', { qs: {} }, undefined);
  });

  it('should fetch a workflow', (done) => {
    expect(typeof client.fetchWorkflow).toEqual('function');

    client.fetchWorkflow(workflowId)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.get).toHaveBeenCalledWith('v2/9999999/workflows/444555', {}, undefined);
  });

  it('should activate a workflow', (done) => {
    expect(typeof client.activateWorkflow).toEqual('function');

    client.activateWorkflow(workflowId)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.post).toHaveBeenCalledWith('v2/9999999/workflows/444555/activate', {}, undefined);
  });

  it('should pause a workflow', (done) => {
    expect(typeof client.pauseWorkflow).toEqual('function');

    client.pauseWorkflow(workflowId)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.post).toHaveBeenCalledWith('v2/9999999/workflows/444555/pause', {}, undefined);
  });

  it('should start a subscriber on a workflow', (done) => {
    expect(typeof client.startOnWorkflow).toEqual('function');

    client.startOnWorkflow(workflowId, { email: 'test@example.com' })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.post).toHaveBeenCalledWith('v2/9999999/workflows/444555/subscribers', { subscribers: [{ email: 'test@example.com' }] }, undefined);
  });

  it('should remove a subscriber on a workflow', (done) => {
    expect(typeof client.removeFromWorkflow).toEqual('function');

    client.removeFromWorkflow(workflowId, idOrEmail)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.del).toHaveBeenCalledWith('v2/9999999/workflows/444555/subscribers/test%40example.com', {}, undefined);
  });
});
