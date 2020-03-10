import express from 'express';
import Auth from '../utils/auth';
let router = express.Router();
let auth = new Auth();

/* POST login validate. */
router.post('/login', function(req, res, next) {
  let user = req.body.user;
  let password = req.body.password;
  let token = auth.sign({ user: user, password: password });

  res.json({
    message: 'Authenticated',
    token: token
  });
  next();
});

export default router;
