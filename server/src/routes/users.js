import express from 'express';
import Auth from '../utils/auth';
import userService from '../services/userService';
import ResponseUtils from '../utils/responseUtils';
import "core-js/stable";
import "regenerator-runtime/runtime";
let router = express.Router();
let auth = new Auth();
let user = new userService();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let token = auth.getToken(req);
  let responseUtils = new ResponseUtils(res);
  if(auth.verify(token)){
    const users = user.getAllUsers();
    users.then(function (jsonUsers) {
      responseUtils.responseJson(jsonUsers);
      return next();
    });
  } else{
    responseUtils.responseErrorTokenInvalid(res);
  }
});

/* POST user saving. */
router.post('/', async function(req, res, next) {
  let userData = req.body;
  let responseUtils = new ResponseUtils(res);
  try {
    await user.setUser(userData);
  } catch (error) {
    responseUtils.responseErrorSequelizeSave(error);
    return next();
  }
  responseUtils.responseOkMessage("User Created");
});

/* GET user for id. */
router.get('/:id', function(req, res, next) {
  let token = auth.getToken(req);
  let userId = req.params.id;
  let responseUtils = new ResponseUtils(res);
  if(auth.verify(token)){
    const userResult = user.getUser(userId);
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
  let responseUtils = new ResponseUtils(res);
  if(auth.verify(token)) {
    user.updateUser(userId, data);
    responseUtils.responseOkMessage("User Updated");
  } else{
    responseUtils.responseErrorTokenInvalid(res);
  }
})

router.delete('/:id', function (req, res, next) {
  let token = auth.getToken(req);
  let userId = req.params.id;
  let user = new userService();
  let responseUtils = new ResponseUtils(res);
  if(auth.verify(token)) {
    user.deleteUser(userId);
    responseUtils.responseOkMessage("User Deleted");
  }else {
    responseUtils.responseErrorTokenInvalid(res);
  }
})

export default router;
