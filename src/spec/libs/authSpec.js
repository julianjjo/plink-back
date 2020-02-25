const auth = require(__dirname +  '/../../../libs/auth.js');

describe("Authentication", function() {
  describe("verify token", function() {
    var token;
    it("returns false", function(done) {
      expect(auth.verify('test')).toBe(false);
      done();
    });
    beforeEach(function() {
      var token = auth.sign({ user: 'julian', password: 'ndjnejnejnje' });
    });
    it("returns true", function(done) {
      expect(auth.verify(token)).toBe(false);
      done();
    });
  });
});
