import {verify, sign} from '../../server/src/utils/auth';

describe("Authentication", function() {
  describe("verify token", function() {
    var token;
    it("returns false", function(done) {
      expect(verify('test')).toBe(false);
      done();
    });
    beforeEach(function() {
      token = sign({ user: 'julian', password: 'ndjnejnejnje' });
    });
    it("returns true", function(done) {
      expect(verify(token)).toBe(true);
      done();
    });
  });
});
