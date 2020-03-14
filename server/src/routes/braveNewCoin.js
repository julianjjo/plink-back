import express from "express";
import Auth from "../utils/auth";
import unirest from 'unirest';
import BraveNewCoin from "../wapper/braveNewCoin";
import Response from "../utils/response";

let router = express.Router();
let auth = new Auth();

/* GET wrapper BraveNewCoin. */
router.get('/:show/:coin', function (req, res, next) {
    let token = auth.getToken(req);
    let braveNewCoin = new BraveNewCoin(unirest);
    let responseUtils = new Response(res);
    let coin = req.params.coin;
    let show = req.params.show;
    let resultJson = null;
    if(auth.verify(token)){
        braveNewCoin.get({
            "show": show,
            "coin": coin
        }, function (res) {
            if (res.error) throw new Error(res.error);
            resultJson = res.body;
            responseUtils.responseJson(res.body);
            return next();
        });
    } else{
        responseUtils.responseErrorTokenInvalid(res);
        return next();
    }
});

export default router;
