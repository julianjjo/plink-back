import express from 'express';
import ResponseUtils from '../utils/responseUtils';
let router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    let responseUtils = new ResponseUtils(res);
    responseUtils.responseNotImplemented();
});

export default router;
