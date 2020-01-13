const client = require('../../lib/index')({ token: 'abc123', accountId: 9999999 });
const bearerClient = require('../../lib/index')({ token: 'abc123', tokenType: 'Bearer', accountId: 9999999 });
const VERSION = require('../../lib/version');

const headers = client.requestHeaders();
const bearerHeaders = bearerClient.requestHeaders();
const token = 'abc123';

describe('Client', () => {
  it('should have token attribute', () => {
    expect(client.token).toEqual('YWJjMTIz');
  });

  it('should add content-type header', () => {
    expect(headers['Content-Type']).toEqual('application/json');
  });

  it('should add basic auth authorization header when no tokenType is specified', () => {
    expect(headers.authorization).toEqual(`Basic ${Buffer.from(token).toString('base64')}`);
  });

  it('should add bearer auth authorization header when tokenType is "Bearer"', () => {
    expect(bearerHeaders.authorization).toEqual(`Bearer ${token}`);
  });

  it('should add user-agent header', () => {
    expect(headers['User-Agent']).toEqual(`Drip NodeJS Wrapper ${VERSION}`);
  });
});
