import express from 'express';
import Auth from '../utils/auth';
import crytocurrencyService from '../services/crytocurrencyService';
import Response from '../utils/response';
import "core-js/stable";
import "regenerator-runtime/runtime";
import db from '../models/index';
let router = express.Router();
let auth = new Auth();
let crytocurrency = new crytocurrencyService(db);

/* GET cryptocurrencies listing. */
router.get('/', function(req, res, next) {
    let token = auth.getToken(req);
    let responseUtils = new Response(res);
    if(auth.verify(token)){
        const users = crytocurrency.getAll();
        users.then(function (jsonCrytocurrencies) {
            responseUtils.responseJson(jsonCrytocurrencies);
            return next();
        });
    } else{
        responseUtils.responseErrorTokenInvalid(res);
    }
});

/* POST cryptocurrency saving. */
router.post('/', async function(req, res, next) {
    let crytocurrencyData = req.body;
    let responseUtils = new Response(res);
    try {
        await crytocurrency.set(crytocurrencyData);
    } catch (error) {
        responseUtils.responseErrorSequelizeSave(error);
        return next();
    }
    responseUtils.responseOkMessage("Crytocurrency Created");
});

/* GET cryptocurrency for id. */
router.get('/:id', function(req, res, next) {
    let token = auth.getToken(req);
    let crytocurrencyId = req.params.id;
    let responseUtils = new Response(res);
    if(auth.verify(token)){
        const crytocurrencyResult = crytocurrency.get(crytocurrencyId);
        crytocurrencyResult.then(function (jsonCrytocurrency) {
            responseUtils.responseJson(jsonCrytocurrency);
            return next();
        });
    } else{
        responseUtils.responseErrorTokenInvalid(res);
    }
});

/* GET cryptocurrency for id. */
router.get('/top/:userId', function(req, res, next) {
    let token = auth.getToken(req);
    let userId = req.params.userId;
    let responseUtils = new Response(res);
    if(auth.verify(token)){
        const crytocurrencyResult = crytocurrency.getTop(userId);
        crytocurrencyResult.then(function (jsonCrytocurrency) {
            responseUtils.responseJson(jsonCrytocurrency);
            return next();
        });
    } else{
        responseUtils.responseErrorTokenInvalid(res);
    }
});

router.put('/:id', function (req, res, next) {
    let data = req.body;
    let token = auth.getToken(req);
    let crytocurrencyId = req.params.id;
    let responseUtils = new Response(res);
    if(auth.verify(token)) {
        crytocurrency.update(crytocurrencyId, data);
        responseUtils.responseOkMessage("Crytocurrency Updated");
        return next();
    } else{
        responseUtils.responseErrorTokenInvalid(res);
    }
    return next();
});

router.delete('/:id', function (req, res, next) {
    let token = auth.getToken(req);
    let crytocurrencyId = req.params.id;
    let crytocurrency = new crytocurrencyService();
    let responseUtils = new Response(res);
    if(auth.verify(token)) {
        crytocurrency.delete(crytocurrencyId);
        responseUtils.responseOkMessage("Crytocurrency Deleted");
        return next();
    }else {
        responseUtils.responseErrorTokenInvalid(res);
    }
    return next();
});

export default router;
