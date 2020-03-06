import express from 'express';
import {sign} from '../utils/auth';
let router = express.Router();

/* POST login validate. */
router.post('/login', function(req, res, next) {
  let user = req.body.user;
  let password = req.body.password;
  console.log(user);
  console.log(password);
  let token = sign({ user: 'julian', password: 'ndjnejnejnje' });

  res.json({
    message: 'Authenticated',
    token: token
  });
  next();
});

export default router;
