import express from 'express';
import Response from '../utils/response';
let router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    let responseUtils = new Response(res);
    responseUtils.responseNotImplemented();
    return next();
});

export default router;
