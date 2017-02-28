'use strict';

var Client = require('../../lib/index');

describe('Client', function () {
  it('should return a client instance', function () {
    var client = new Client({token: 'abc123'});
    expect(client.token).toEqual('abc123');
  })
})
