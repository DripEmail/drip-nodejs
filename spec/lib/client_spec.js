'use strict';

var Client = require('../../lib/index');

describe('Client', function () {
  var token = 'abc123';
  it('should have token attribute', function () {
    var client = new Client({ token: token });
    expect(client.token).toEqual(token);
  });

  it('should add content-type header', function () {
    var client = new Client({ token: token });
    expect(client.headers["content-type"]).toEqual("application/vnd.api+json");
  });

  it('should add basic auth authorization header', function () {
    var client = new Client({ token: token });
    expect(client.headers.authorization).toEqual("Basic " + new Buffer(token).toString('base64'));
  });

  it('should add user-agent header', function () {
    var client = new Client({ token: token });
    expect(client.headers["User-Agent"]).toEqual("Drip NodeJS Wrapper");
  });
});
