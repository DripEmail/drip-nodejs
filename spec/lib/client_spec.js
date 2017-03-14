'use strict';

var Client = require('../../lib/index');

describe('Client', function () {
  it('should contain the correct headers', function () {
    var client = new Client({ token: 'abc123' });
    expect(client.token).toEqual('abc123');
    expect(client.headers).toEqual({
      "content-type": "application/vnd.api+json",
      "authorization": 'abc123',
      "User-Agent": "Drip NodeJS Wrapper"
    });
  });
});
