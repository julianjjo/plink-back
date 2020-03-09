import express from 'express';
import {verify} from '../utils/auth';
import userService from '../services/userService';
import ResponseUtils from '../utils/responseUtils';
import "core-js/stable";
import "regenerator-runtime/runtime";
let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let token = req.headers.authorization;
  let responseUtils = new ResponseUtils(res);
  token = token.substr(6);
  if(verify(token)){
    let user = new userService();
    let users = user.getAllUsers();
    console.log(users);
    responseUtils.responseJson(users);
    return next();
  }
  responseUtils.responseErrorTokenInvalid(res);
});

/* POST user saving. */
router.post('/', async function(req, res, next) {
  let token = req.headers.authorization;
  let userData = req.body;  
  let responseUtils = new ResponseUtils(res);
  token = token.substr(6);
  if(verify(token)){
    let user = new userService();
    let success = true;
    try {
      await user.setUser(userData);
    } catch(e) {
      success = false;
      responseUtils.responseErrorSequelizeSave(res, error);
      return next();
    }
    if(success) {
      responseUtils.responseErrorSequelizeSave(res, error);
    }
  }
  responseUtils.responseErrorTokenInvalid(res);
});

export default router;
