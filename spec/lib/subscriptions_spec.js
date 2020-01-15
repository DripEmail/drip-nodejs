const sinon = require('sinon');
const client = require('../../lib/index')({ token: 'abc123', accountId: 9999999 });

const subscriberId = 'abc123';

describe('Campaign subscriptions', () => {
  beforeEach(() => {
    sinon.stub(client, 'request')
      .yields(null, { statusCode: 200 }, { accounts: {} });
  });

  afterEach(() => {
    client.request.restore();
  });

  it('should list all campaign subscriptions and call request with get', (done) => {
    expect(typeof client.subscriberCampaignSubscriptions).toEqual('function');

    client.subscriberCampaignSubscriptions(subscriberId, (error, response) => {
      expect(response.statusCode).toBe(200);
      expect(client.request.callCount).toBe(1);
    });
    done();
  });
});

describe('Campaign subscriptions with promise', () => {
  const expectedResponse = {
    statusCode: 200,
    body: {
      campaign_subscripions: [{}]
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

  it('should list all workflows', (done) => {
    expect(typeof client.subscriberCampaignSubscriptions).toEqual('function');

    client.subscriberCampaignSubscriptions(subscriberId)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(client.request.callCount).toBe(1);
      })
      .catch(failTest);
    done();

    expect(client.get).toHaveBeenCalledWith('v2/9999999/subscribers/abc123/campaign_subscriptions', {}, undefined);
  });
});
