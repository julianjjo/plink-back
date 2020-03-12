import express from 'express';
import Auth from '../utils/auth';
import cryptocurrencyService from '../services/cryptocurrencyService';
import Response from '../utils/response';
import "core-js/stable";
import "regenerator-runtime/runtime";
import db from '../models/index';

let router = express.Router();
let auth = new Auth();


/* GET cryptocurrencies listing. */
router.get('/', function(req, res, next) {
    let token = auth.getToken(req);
    let userData = auth.decode(token);
    let cryptocurrency = new cryptocurrencyService(db, userData);
    let responseUtils = new Response(res);
    if(auth.verify(token)){
        const users = cryptocurrency.getAll();
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
    let token = auth.getToken(req);
    let cryptocurrency = new cryptocurrencyService(db, token);
    let cryptocurrencyData = req.body;
    let responseUtils = new Response(res);
    if (auth.verify(token)) {
        try {
            await cryptocurrency.set(cryptocurrencyData);
        } catch (error) {
            responseUtils.responseErrorSequelizeSave(error);
            return next();
        }
    } else {
        responseUtils.responseErrorTokenInvalid(res);
    }
    responseUtils.responseOkMessage("Crytocurrency Created");
});

/* GET cryptocurrency for id. */
router.get('/:id', function(req, res, next) {
    let token = auth.getToken(req);
    let cryptocurrency = new cryptocurrencyService(db, token);
    let cryptocurrencyId = req.params.id;
    let responseUtils = new Response(res);
    if (auth.verify(token)) {
        const cryptocurrencyResult = cryptocurrency.get(cryptocurrencyId);
        cryptocurrencyResult.then(function (jsonCrytocurrency) {
            responseUtils.responseJson(jsonCrytocurrency);
            return next();
        });
    } else {
        responseUtils.responseErrorTokenInvalid(res);
    }
});

/* GET cryptocurrency for id. */
router.get('/top/:limit', function(req, res, next) {
    let token = auth.getToken(req);
    let cryptocurrency = new cryptocurrencyService(db, token);
    let userId = req.params.userId;
    let responseUtils = new Response(res);
    if(auth.verify(token)) {
        const cryptocurrencyResult = cryptocurrency.getTop(userId);
        cryptocurrencyResult.then(function (jsonCrytocurrency) {
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
    let cryptocurrency = new cryptocurrencyService(db, token);
    let cryptocurrencyId = req.params.id;
    let responseUtils = new Response(res);
    if (auth.verify(token)) {
        cryptocurrency.update(cryptocurrencyId, data);
        responseUtils.responseOkMessage("Crytocurrency Updated");
        return next();
    } else {
        responseUtils.responseErrorTokenInvalid(res);
    }
    return next();
});

router.delete('/:id', function (req, res, next) {
    let token = auth.getToken(req);
    let cryptocurrency = new cryptocurrencyService(db, token);
    let cryptocurrencyId = req.params.id;
    let responseUtils = new Response(res);
    if (auth.verify(token)) {
        cryptocurrency.delete(cryptocurrencyId);
        responseUtils.responseOkMessage("Crytocurrency Deleted");
        return next();
    } else {
        responseUtils.responseErrorTokenInvalid(res);
    }
    return next();
});

export default router;
