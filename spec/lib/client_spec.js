const Client = require('../../lib/index');
const VERSION = require('../../lib/version');

describe('Client', () => {
  const token = 'abc123';
  it('should have token attribute', () => {
    const client = new Client({ token });
    expect(client.token).toEqual('YWJjMTIz');
  });

  it('should add content-type header', () => {
    const client = new Client({ token });
    expect(client.headers['content-type']).toEqual('application/vnd.api+json');
  });

  it('should add basic auth authorization header when no tokenType is specified', () => {
    const client = new Client({ token });
    expect(client.headers.authorization).toEqual(`Basic ${Buffer.from(token).toString('base64')}`);
  });

  it('should add bearer auth authorization header when tokenType is "Bearer"', () => {
    const client = new Client({ token, tokenType: 'Bearer' });
    expect(client.headers.authorization).toEqual(`Bearer ${token}`);
  });

  it('should add user-agent header', () => {
    const client = new Client({ token });
    expect(client.headers['User-Agent']).toEqual(`Drip NodeJS Wrapper ${VERSION}`);
  });
});
