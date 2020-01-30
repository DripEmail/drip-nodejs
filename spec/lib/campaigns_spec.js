const sinon = require('sinon');
const client = require('../../lib/index')({ token: 'abc123', accountId: 9999999 });

const campaignId = 4444444;

describe('Campaigns with callback', () => {
  beforeEach(() => {
    sinon.stub(client, 'request')
      .yields(null, { statusCode: 200 }, { campaigns: {} });
  });

  afterEach(() => {
    client.request.restore();
  });

  it('should list all campaigns and call request with get', (done) => {
    expect(typeof client.listCampaigns).toEqual('function');

    client.listCampaigns({}, (error, response) => {
      expect(response.statusCode).toBe(200);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });

  it('should fetch a campaign and call request with get', (done) => {
    expect(typeof client.fetchCampaign).toEqual('function');

    client.fetchCampaign(campaignId, (error, response) => {
      expect(response.statusCode).toBe(200);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });

  it('should activate a campaign and call request with post', (done) => {
    expect(typeof client.activateCampaign).toEqual('function');

    client.activateCampaign(campaignId, (error, response) => {
      expect(response.statusCode).toBe(200);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });

  it('should pause a campaign and call request with post', (done) => {
    expect(typeof client.pauseCampaign).toEqual('function');

    client.pauseCampaign(campaignId, (error, response) => {
      expect(response.statusCode).toBe(200);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });

  it('should list all subscribers to a campaign and call request with get', (done) => {
    expect(typeof client.listAllSubscribesToCampaign).toEqual('function');

    client.listAllSubscribesToCampaign(campaignId, {}, (error, response) => {
      expect(response.statusCode).toBe(200);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });

  it('should list all active subscribers to a campaign and call request with get', (done) => {
    expect(typeof client.listAllSubscribesToCampaign).toEqual('function');

    client.listAllSubscribesToCampaign(campaignId, { status: 'active' }, (error, response) => {
      expect(response.statusCode).toBe(200);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });

  it('should subscriber someone to a campaign and call request with post', (done) => {
    expect(typeof client.subscribeToCampaign).toEqual('function');

    client.subscribeToCampaign(campaignId, {}, (error, response) => {
      expect(response.statusCode).toBe(200);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });
});

describe('Campaigns with Promise', () => {
  const expectedResponse = {
    statusCode: 200,
    body: {
      campaigns: [{}]
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

  it('should list campaigns', (done) => {
    expect(typeof client.listCampaigns).toEqual('function');

    client.listCampaigns()
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.get).toHaveBeenCalledWith('v2/9999999/campaigns/', { qs: {} }, undefined);
  });

  it('should fetch campaign', (done) => {
    expect(typeof client.fetchCampaign).toEqual('function');

    client.fetchCampaign(campaignId)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.get).toHaveBeenCalledWith('v2/9999999/campaigns/4444444', {}, undefined);
  });

  it('should activate a campaign', (done) => {
    expect(typeof client.activateCampaign).toEqual('function');

    client.activateCampaign(campaignId)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.post).toHaveBeenCalledWith('v2/9999999/campaigns/4444444/activate', {}, undefined);
  });

  it('should pause a campaign', (done) => {
    expect(typeof client.pauseCampaign).toEqual('function');

    client.pauseCampaign(campaignId)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.post).toHaveBeenCalledWith('v2/9999999/campaigns/4444444/pause', {}, undefined);
  });

  it('should list all subscribers to a campaign', (done) => {
    expect(typeof client.listAllSubscribesToCampaign).toEqual('function');

    client.listAllSubscribesToCampaign(campaignId, {})
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.get).toHaveBeenCalledWith('v2/9999999/campaigns/4444444/subscribers', { qs: {} }, undefined);
  });

  it('should list all active subscribers to a campaign', (done) => {
    expect(typeof client.listAllSubscribesToCampaign).toEqual('function');

    client.listAllSubscribesToCampaign(campaignId, { status: 'active' })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.get).toHaveBeenCalledWith('v2/9999999/campaigns/4444444/subscribers', { qs: { status: 'active' } }, undefined);
  });

  it('should list all subscribers to a campaign', (done) => {
    expect(typeof client.subscribeToCampaign).toEqual('function');

    client.subscribeToCampaign(campaignId, {})
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.post).toHaveBeenCalledWith('v2/9999999/campaigns/4444444/subscribers', { subscribers: [{}] }, undefined);
  });
});
