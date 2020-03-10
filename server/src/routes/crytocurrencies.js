import express from 'express';
import Auth from '../utils/auth';
import crytocurrencyService from '../services/crytocurrencyService';
import ResponseUtils from '../utils/responseUtils';
import "core-js/stable";
import "regenerator-runtime/runtime";
let router = express.Router();
let auth = new Auth();
let crytocurrency = new crytocurrencyService();

/* GET crytocurrencies listing. */
router.get('/', function(req, res, next) {
    let token = auth.getToken(req);
    let responseUtils = new ResponseUtils(res);
    if(auth.verify(token)){
        const users = crytocurrency.getAllCryptocurrencies();
        users.then(function (jsonCrytocurrencies) {
            responseUtils.responseJson(jsonCrytocurrencies);
            return next();
        });
    } else{
        responseUtils.responseErrorTokenInvalid(res);
    }
});

/* POST user saving. */
router.post('/', async function(req, res, next) {
    let crytocurrencyData = req.body;
    let responseUtils = new ResponseUtils(res);
    try {
        await crytocurrency.setCrytocurrency(crytocurrencyData);
    } catch (error) {
        responseUtils.responseErrorSequelizeSave(error);
        return next();
    }
    responseUtils.responseOkMessage("Crytocurrency Created");
});

/* GET user for id. */
router.get('/:id', function(req, res, next) {
    let token = auth.getToken(req);
    let crytocurrencyId = req.params.id;
    let responseUtils = new ResponseUtils(res);
    if(auth.verify(token)){
        const crytocurrencyResult = crytocurrency.getCrytocurrency(crytocurrencyId);
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
    let responseUtils = new ResponseUtils(res);
    if(auth.verify(token)) {
        crytocurrency.updateCrytocurrency(crytocurrencyId, data);
        responseUtils.responseOkMessage("Crytocurrency Updated");
    } else{
        responseUtils.responseErrorTokenInvalid(res);
    }
})

router.delete('/:id', function (req, res, next) {
    let token = auth.getToken(req);
    let crytocurrencyId = req.params.id;
    let crytocurrency = new crytocurrencyService();
    let responseUtils = new ResponseUtils(res);
    if(auth.verify(token)) {
        crytocurrency.deleteCrytocurrency(crytocurrencyId);
        responseUtils.responseOkMessage("Crytocurrency Deleted");
    }else {
        responseUtils.responseErrorTokenInvalid(res);
    }
})

export default router;
