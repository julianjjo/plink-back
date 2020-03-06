import express from 'express';
import {verify} from '../utils/auth';
let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let token = req.headers.authorization;
  token = token.substr(6);
  if(verify(token)){
    res.send('respond with a resource');
  }
  res.status(401).send('Unauthorized token invalid');
});

export default router;
