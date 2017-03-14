'use strict';

var sinon = require('sinon')
  , client = require('../../lib/index')({ token: 'abc123' })
  , request = require('request')
  , helper = require('../../lib/helpers');

describe('Tags', function () {
  var accountId = 123;
  var campaignId = 456;
  var email = "someone@example.com";

  beforeEach(function () {
    sinon.stub(request, 'get')
      .yields(null, { statusCode: 200 }, { accounts : {} }
    );
    sinon.stub(request, 'post')
      .yields(null, { statusCode: 204 }, {}
    );
    sinon.stub(request, 'del')
      .yields(null, { statusCode: 204 }, {}
    );
  });

  afterEach(function () {
    request.get.restore();
    request.post.restore();
    request.del.restore();
  });

  it('should provide the correct base URL', function () {
    expect(helper.tagsUrl(accountId))
      .toBe('https://api.getdrip.com/v2/123/tags/')
  })

  it('should list all tags and call request with get', function (done) {
    expect(typeof client.listAllTags).toEqual('function');

    client.listAllTags(accountId, function(error, response, body) {
      expect(response.statusCode).toBe(200);
      expect(request.get.callCount).toBe(1);
    });
    done();
  });

  it('should tag a subscriber and call request with post', function (done) {
    expect(typeof client.tagSubscriber).toEqual('function');

    client.tagSubscriber(accountId, ["Test 1", "Test 2", "Test 3"], email, function (error, response, body) {
      expect(response.statusCode).toBe(204);
    });

    expect(request.post.callCount).toBe(3);
    done();
  });

  it('should remove a tag from a subscriber and call request with delete', function (done) {
    expect(typeof client.removeSubscriberTag).toEqual('function');

    client.removeSubscriberTag(accountId, email, "Test tag", function (error, response, body) {
      expect(response.statusCode).toBe(204);
      expect(request.del.callCount).toBe(1);
    });
    done();
  });
});
