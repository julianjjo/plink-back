import express from 'express';
import Auth from '../utils/auth';
import userService from '../services/userService';
import Response from '../utils/response';
import "core-js/stable";
import "regenerator-runtime/runtime";
import db from '../models/index';
let router = express.Router();
let auth = new Auth();
let user = new userService(db);

/* GET users listing. */
router.get('/', function(req, res, next) {
  let token = auth.getToken(req);
  let responseUtils = new Response(res);
  if(auth.verify(token)){
    const users = user.getAll();
    users.then(function (jsonUsers) {
      responseUtils.responseJson(jsonUsers);
      return next();
    });
  } else{
    responseUtils.responseErrorTokenInvalid(res);
  }
});

/* POST user with currency saving. */
router.post('/', async function(req, res, next) {
  let userData = req.body;
  let responseUtils = new Response(res);
  try {
    await user.set(userData);
  } catch (error) {
    console.log(error);
    responseUtils.responseErrorSequelizeSave(error);
    return next();
  }
  responseUtils.responseOkMessage("User Created");
});

/* GET user for id. */
router.get('/:id', function(req, res, next) {
  let token = auth.getToken(req);
  let userId = req.params.id;
  let responseUtils = new Response(res);
  if(auth.verify(token)){
    const userResult = user.get(userId);
    userResult.then(function (jsonUser) {
      responseUtils.responseJson(jsonUser);
      return next();
    });
  } else{
    responseUtils.responseErrorTokenInvalid(res);
  }
});

router.put('/:id', function (req, res, next) {
  let data = req.body;
  let token = auth.getToken(req);
  let userId = req.params.id;
  let responseUtils = new Response(res);
  if(auth.verify(token)) {
    user.update(userId, data);
    responseUtils.responseOkMessage("User Updated");
    return next();
  } else{
    responseUtils.responseErrorTokenInvalid(res);
  }
  return next();
});

router.delete('/:id', function (req, res, next) {
  let token = auth.getToken(req);
  let userId = req.params.id;
  let user = new userService();
  let responseUtils = new Response(res);
  if(auth.verify(token)) {
    user.delete(userId);
    responseUtils.responseOkMessage("User Deleted");
    return next();
  }else {
    responseUtils.responseErrorTokenInvalid(res);
  }
  return next();
});

export default router;
