var express = require('express');
var router = express.Router();

/* POST login validate. */
router.post('/signin', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
